import dynamoose from "dynamoose";
import { DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";

const DYNAMO_HOST = process.env.DYNAMO_HOST || "localhost";
const DYNAMO_PORT = process.env.DYNAMO_PORT || 8000;
const DYNAMO_TABLE = process.env.DYNAMO_TABLE || "ChatMessages";

// DynamoDB 클라이언트 설정
const config: DynamoDBClientConfig = {
  credentials: {
    // 로컬에서 사용할 가짜 자격 증명
    accessKeyId: "fakeKey",
    secretAccessKey: "fakeSecretKey",
  },
  endpoint: `http://${DYNAMO_HOST}:${DYNAMO_PORT}`,
  region: "local",
};

// DynamoDB 클라이언트 초기화
const ddb = new dynamoose.aws.ddb.DynamoDB(config);
// Dynamoose에 DynamoDB 클라이언트 설정
dynamoose.aws.ddb.set(ddb);

// Dynamoose 스키마 정의
const schema = new dynamoose.Schema({
  eventId: {
    type: String,
    hashKey: true, // 기본 키 (Partition Key)
  },
  roomId: {
    type: String,
    required: true,
    index: {
      type: "global", // 글로벌 인덱스 설정
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

// 모델 초기화
export const chatModel = dynamoose.model(DYNAMO_TABLE, schema);

// 데이터 업데이트
export async function updateChatMessage(eventId: string, content: Object) {
  try {
    await chatModel.update(
      { eventId }, // Partition Key
      { ...content }
    );
  } catch (error) {
    console.error("Error updating message:", error);
  }
}
