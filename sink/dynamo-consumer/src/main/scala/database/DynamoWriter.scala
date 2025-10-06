package consumers.dynamo.sink
package database

import java.net.URI
import java.time.Instant
import scala.jdk.CollectionConverters._

import software.amazon.awssdk.auth.credentials.{AwsBasicCredentials, StaticCredentialsProvider}
import software.amazon.awssdk.regions.Region
import software.amazon.awssdk.services.dynamodb.model._
import software.amazon.awssdk.services.dynamodb.DynamoDbClient

import consumers.shared.config.Env.{DYNAMO_HOST, DYNAMO_PORT, DYNAMO_TABLE}
import consumers.dynamo.sink.database.given

class DynamoWriter[T <: Product: DynamoMappable]() {
  private val endpoint = s"http://$DYNAMO_HOST:$DYNAMO_PORT"

  // DynamoDB 클라이언트 설정
  private val client: DynamoDbClient = DynamoDbClient
    .builder()
    .endpointOverride(URI.create(endpoint))
    .region(Region.US_WEST_2)
    .credentialsProvider(
      StaticCredentialsProvider.create(
        AwsBasicCredentials.create(
          "fakeKey", // 로컬에서 사용할 가짜 자격 증명
          "fakeSecretKey"
        )
      )
    )
    .build()

  // 데이터 업데이트 함수
  def updateChatMessage(eventId: String, chat: T): Unit = {
    try {
      // DynamoMappable을 이용해 ChatMessage를 Map으로 변환
      val content = summon[DynamoMappable[T]].toAttributes(chat)

      // DynamoDB 업데이트 작업에서 사용할 SQL-like 업데이트 표현식
      val updateExpr = content.keys.zipWithIndex
        .map { case (k, i) => s"#k$i = :v$i" }
        .mkString(", ")
      val exprAttrNames = content.keys.zipWithIndex
        .map { case (k, i) => s"#k$i" -> k }
        .toMap
        .asJava
      val exprAttrValues = content.values.zipWithIndex
        .map { case (v, i) => s":v$i" -> v }
        .toMap
        .asJava

      // DynamoDB의 UpdateItemRequest 객체 생성
      val updateRequest = UpdateItemRequest
        .builder()
        .tableName(DYNAMO_TABLE)
        .key(Map("eventId" -> AttributeValue.builder().s(eventId).build()).asJava)
        .updateExpression(s"SET $updateExpr") // 업데이트 표현식
        .expressionAttributeNames(exprAttrNames) // 속성 이름 매핑
        .expressionAttributeValues(exprAttrValues) // 속성 값 매핑
        .build()

      // DynamoDB에 업데이트 요청
      client.updateItem(updateRequest)
    } catch {
      case e: Exception =>
        println(s"Error updating message: ${e.getMessage}")
    }
  }
}
