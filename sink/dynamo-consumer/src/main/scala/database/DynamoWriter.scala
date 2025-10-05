package consumers.dynamo.sink
package database

import java.net.URI
import java.time.Instant
import scala.jdk.CollectionConverters._

import software.amazon.awssdk.auth.credentials.{AwsBasicCredentials, StaticCredentialsProvider}
import software.amazon.awssdk.regions.Region
import software.amazon.awssdk.services.dynamodb.DynamoDbClient
import software.amazon.awssdk.services.dynamodb.model._

import consumers.shared.config.Env._

class DynamoWriter[T]() {
  private val endpoint = s"http://$DYNAMO_HOST:$DYNAMO_PORT"

  private val ddb: DynamoDbClient = DynamoDbClient
    .builder()
    .endpointOverride(URI.create(endpoint))
    .region(Region.US_WEST_2)
    .credentialsProvider(
      StaticCredentialsProvider.create(
        AwsBasicCredentials.create("fakeKey", "fakeSecretKey")
      )
    )
    .build()

  // 데이터 업데이트 함수
  def updateChatMessage(eventId: String, content: Map[String, Any]): Unit = {
    try {
      val updateExpr = content.keys.zipWithIndex.map { case (k, i) => s"#k$i = :v$i" }.mkString(", ")
      val exprAttrNames = content.keys.zipWithIndex.map { case (k, i) => s"#k$i" -> k }.toMap.asJava
      val exprAttrValues = content.values.zipWithIndex
        .map { case (v, i) =>
          s":v$i" -> AttributeValue.builder().s(v.toString).build()
        }
        .toMap
        .asJava

      val updateRequest = UpdateItemRequest
        .builder()
        .tableName(DYNAMO_TABLE)
        .key(Map("eventId" -> AttributeValue.builder().s(eventId).build()).asJava)
        .updateExpression(s"SET $updateExpr")
        .expressionAttributeNames(exprAttrNames)
        .expressionAttributeValues(exprAttrValues)
        .build()

      // DynamoDB에 업데이트 요청
      ddb.updateItem(updateRequest)

      println(s"Message with eventId $eventId updated successfully.")
    } catch {
      case e: Exception =>
        println(s"Error updating message: ${e.getMessage}")
    }
  }
}
