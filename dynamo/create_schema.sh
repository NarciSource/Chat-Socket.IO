#!/bin/bash
set -e

echo "Initializing DynamoDB tables..."

aws dynamodb create-table \
  --cli-input-json file:///dynamo/schema/chat-messages-schema.json \
  --endpoint-url http://dynamodb-container:8000 \
  --region ap-northeast-2

echo "DynamoDB initialization completed."
