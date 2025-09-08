import dynamoose from "dynamoose";
import { Model } from "dynamoose/dist/Model";
import { DynamoDB, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";

interface ChatMessage {
  roomId: string;
  senderId: string;
  content: string;
  uid?: string;
  createdAt?: Date;
}

export default class DynamoWriter {
  private ddb: DynamoDB;
  private model: Model<any>;

  constructor(
    private dynamoHost: string = process.env.DYNAMO_HOST || "localhost",
    private dynamoPort: string = process.env.DYNAMO_PORT || "8000",
    private dynamoTable: string = process.env.DYNAMO_TABLE || "ChatMessages"
  ) {
    // DynamoDB 클라이언트 설정
    const config: DynamoDBClientConfig = {
      credentials: {
        accessKeyId: "fakeKey", // 로컬에서 사용할 가짜 자격 증명
        secretAccessKey: "fakeSecretKey",
      },
      endpoint: `http://${this.dynamoHost}:${this.dynamoPort}`,
      region: "local", // 로컬 설정
    };

    // DynamoDB 클라이언트 초기화
    this.ddb = new dynamoose.aws.ddb.DynamoDB(config);

    // Dynamoose에 DynamoDB 클라이언트 설정
    dynamoose.aws.ddb.set(this.ddb);

    // 스키마 정의
    const schema = this.initSchema();

    // 모델 초기화
    this.model = dynamoose.model(this.dynamoTable, schema);
  }

  private initSchema() {
    const schema = new dynamoose.Schema({
      eventId: {
        type: String,
        hashKey: true, // 기본 키 (Partition Key)
      },
      roomId: {
        type: String,
        required: true,
        index: {
          type: "global",
          name: "roomId-createdAt-index", // 인덱스 이름
          rangeKey: "createdAt", // Range Key (정렬 기준)
        },
      },
      senderId: {
        type: String,
        required: true,
        index: {
          type: "global",
          name: "senderId-createdAt-index",
          rangeKey: "createdAt",
        },
      },
      content: String,
      uid: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    });
    return schema;
  }

  // 데이터 업데이트
  async updateChatMessage(eventId: string, content: Partial<ChatMessage>) {
    try {
      await this.model.update(
        { eventId }, // Partition Key
        { ...content } // 업데이트할 필드
      );
      console.log(`Chat message with eventId ${eventId} updated successfully.`);
    } catch (error) {
      console.error("Error updating message:", error);
    }
  }
}
