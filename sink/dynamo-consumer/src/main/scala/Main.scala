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
  for ((eventId, message) <- reader.listen().flatten) {
    writer.updateChatMessage(eventId, message)
  }
}
