package consumers.es.sink

import java.time.Instant

import io.circe.generic.auto._
import io.circe.syntax._

import consumers.shared.config.Env.REDIS_STREAMS_PARSER
import consumers.shared.model.ChatMessage
import consumers.streams.source.parser.{BasicParser, SocketIOParser}
import consumers.streams.source.RedisStreamReader
import consumers.es.sink.database.{ESWriter, given}

object Main extends App {
  val parser = REDIS_STREAMS_PARSER match {
    case "basic"     => new BasicParser
    case "socket.io" => new SocketIOParser
    case _           => new BasicParser
  }

  val reader = new RedisStreamReader[ChatMessage](parser)
  val writer = new ESWriter[ChatMessage]

  // 스트림 리스닝 및 Elasticsearch에 업데이트
  for ((eventId, message) <- reader.listen().flatten) {
    writer.updateChatMessage(eventId, message)
  }
}
