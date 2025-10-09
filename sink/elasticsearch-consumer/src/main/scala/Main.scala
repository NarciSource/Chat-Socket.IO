package consumers.es.sink

import java.time.Instant
import scala.jdk.CollectionConverters._
import scala.concurrent.duration._

import io.circe.generic.auto._
import io.circe.syntax._
import cats.effect.{IO, IOApp, Ref, ExitCode}
import cats.effect.unsafe.IORuntime
import cats.effect.unsafe.implicits.global

import consumers.shared.config.Env.REDIS_STREAMS_PARSER
import consumers.shared.model.ChatMessage
import consumers.shared.healthServer.HealthServer
import consumers.streams.source.parser.{BasicParser, SocketIOParser}
import consumers.streams.source.RedisStreamReader
import consumers.es.sink.database.{ESWriter, given}

object Main extends IOApp.Simple {

  def run: IO[Unit] =
    for {
      // 헬스 서버 실행 (백그라운드로)
      _ <- HealthServer.serverResource.use(_ => IO.never).start

      // 헬스 상태 true로 설정
      _ <- IO.sleep(1.second) *> IO(HealthServer.setHealthy(true))
      _ <- IO.println("HealthServer set to healthy")

      // 스트림 루프 실행
      _ <- IO.blocking(streamLoop())
    } yield ()

  def streamLoop(): Unit = {
    val parser = REDIS_STREAMS_PARSER match {
      case "basic"     => new BasicParser
      case "socket.io" => new SocketIOParser
      case _           => new BasicParser
    }

    val reader = new RedisStreamReader[ChatMessage](parser)
    val writer = new ESWriter[ChatMessage]

    HealthServer.setHealthy(true)

    // 스트림 리스닝 및 Elasticsearch에 업데이트
    for ((eventId, message) <- reader.listen().flatten) {
      writer.updateChatMessage(eventId, message)
    }
  }
}
