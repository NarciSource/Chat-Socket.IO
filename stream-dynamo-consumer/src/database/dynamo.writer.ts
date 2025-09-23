import dynamoose from "dynamoose";
import { Model } from "dynamoose/dist/Model";
import { SchemaDefinition } from "dynamoose/dist/Schema";
import { DynamoDB, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";

export default class DynamoWriter<T> {
  private ddb: DynamoDB;
  private model: Model<any>;

  constructor(readonly schemaDefinition: SchemaDefinition) {
    const host = process.env.DYNAMO_HOST || "localhost";
    const port = process.env.DYNAMO_PORT || "8000";
    const table = process.env.DYNAMO_TABLE || "ChatMessages";

    // DynamoDB 클라이언트 설정
    const config: DynamoDBClientConfig = {
      credentials: {
        accessKeyId: "fakeKey", // 로컬에서 사용할 가짜 자격 증명
        secretAccessKey: "fakeSecretKey",
      },
      endpoint: `http://${host}:${port}`,
      region: "local", // 로컬 설정
    };

    // DynamoDB 클라이언트 초기화
    this.ddb = new dynamoose.aws.ddb.DynamoDB(config);

    // Dynamoose에 DynamoDB 클라이언트 설정
    dynamoose.aws.ddb.set(this.ddb);

    // 스키마 정의
    const schema = new dynamoose.Schema(schemaDefinition);

    // 모델 초기화
    this.model = dynamoose.model(table, schema);
  }

  // 데이터 업데이트
  async updateChatMessage(eventId: string, content: T & { createdAt?: Date }) {
    try {
      await this.model.update(
        { eventId }, // Partition Key
        { ...content } // 업데이트할 필드
      );
    } catch (error) {
      console.error("Error updating message:", error);
    }
  }
}
