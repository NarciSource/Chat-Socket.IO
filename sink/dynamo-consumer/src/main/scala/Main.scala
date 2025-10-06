package consumers.dynamo.sink

import java.time.Instant
import scala.jdk.CollectionConverters._

import consumers.shared.config.Env.{REDIS_STREAMS_PARSER}
import consumers.shared.model.ChatMessage
import consumers.streams.source.parser.{BasicParser, SocketIOParser}
import consumers.streams.source.RedisStreamReader
import consumers.dynamo.sink.database.{DynamoWriter, given}

object Main extends App {
  val parser = REDIS_STREAMS_PARSER match {
    case "basic"     => new BasicParser
    case "socket.io" => new SocketIOParser
    case _           => new BasicParser // 기본 파서 사용
  }

  val reader = new RedisStreamReader[ChatMessage](parser)
  val writer = new DynamoWriter[ChatMessage]

  // 스트림 리스닝 및 DynamoDB에 업데이트
  for (events <- reader.listen()) {
    for ((eventId, data) <- events) {
      if (data.eventName == "receive_message") {
        val timestamp = eventId.split("-")(0)
        val createdAt = Instant.ofEpochMilli(timestamp.toLong)

        data.payload match {
          case Left(errorMessage) =>
            println(s"ChatMessage 파싱 실패: $errorMessage")

          case Right(message) =>
            val enriched = message.copy(createdAt = Some(createdAt))
            writer.updateChatMessage(eventId, enriched)
        }
      }
    }
  }
}
