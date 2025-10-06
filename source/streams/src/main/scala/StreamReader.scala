package consumers.streams.source

import java.time.Instant
import scala.jdk.CollectionConverters._
import scala.annotation.tailrec

import redis.clients.jedis.Jedis
import redis.clients.jedis.params.XReadParams
import redis.clients.jedis.StreamEntryID

import consumers.shared.config.Env._
import consumers.shared.WithCreatedAt
import consumers.streams.source.parser.{IStreamParser, ParsedEvent}
import consumers.streams.source.service.StreamService

class RedisStreamReader[T](parser: IStreamParser[T])(implicit ev: WithCreatedAt[T]) {
  // Redis 연결
  private val jedis = new Jedis(REDIS_HOST, REDIS_PORT)
  // XRead 옵션
  private val xReadParams = new XReadParams().block(5000)
  // key: 읽을 스트림 이름
  // value: UNRECEIVED_ENTRY: 마지막 메시지부터 읽기($)
  private val streamsMap: java.util.Map[String, StreamEntryID] =
    Map(REDIS_STREAMS_KEY -> StreamEntryID.LAST_ENTRY).asJava

  println(s"Listening stream $REDIS_STREAMS_KEY...")

  // 서비스 등록
  private val service = new StreamService[T](parser)

  /** 스트림 읽기 반복 */
  def listen(): Iterator[Option[(String, T)]] = new Iterator[Option[(String, T)]] {
    override def hasNext: Boolean = true

    override def next(): Option[(String, T)] = {
      val rawStreams = jedis.xread(xReadParams, streamsMap)

      Option(rawStreams).flatMap { streams =>
        (for {
          streamEntry <- streams.asScala
          entry <- streamEntry.getValue.asScala
          (eventId, data) <- parseEntry(entry).toList
          if data.eventName == "receive_message"
          timestamp = eventId.split("-")(0)
          createdAt = Instant.ofEpochMilli(timestamp.toLong)
          message <- data.payload.toOption
        } yield eventId -> ev.withCreatedAt(message, createdAt)).headOption
      }
    }
  }

  /** 단일 StreamEntry 파싱 */
  private def parseEntry(entry: redis.clients.jedis.resps.StreamEntry): Option[(String, ParsedEvent[T])] = {
    val id = entry.getID.toString
    val fields = entry.getFields.asScala.toMap

    parser.parse(fields).map(event => id -> event)
  }
}
