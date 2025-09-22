import { SchemaDefinition } from 'dynamoose/dist/Schema';

export const dynamoSchemaDefinition: SchemaDefinition = {
  eventId: {
    type: String,
    hashKey: true, // 기본 키 (Partition Key)
  },
  roomId: {
    type: String,
    required: true,
    index: {
      type: 'global',
      name: 'roomId-createdAt-index', // 인덱스 이름
      rangeKey: 'createdAt', // Range Key (정렬 기준)
    },
  },
  userId: {
    type: String,
    required: true,
    index: {
      type: 'global',
      name: 'userId-createdAt-index',
      rangeKey: 'createdAt',
    },
  },
  content: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
};

export type Message = {
  userId: string;
  content: string;
  createdAt: Date;
};
