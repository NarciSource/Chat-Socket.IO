package consumers.streams.source
package service

import scala.collection.mutable
import scala.util.Try

import consumers.streams.source.parser.{IStreamParser, ParsedEvent}

class StreamService[T](parser: IStreamParser[T]) {
  // 타입 정의
  type XReadStreamEntry = (String, Seq[String]) // [id, fields]
  type XReadStream = (String, Seq[XReadStreamEntry]) // [streamName, entries]
  type XReadResult = Seq[XReadStream]

  /** xread 반환값 전체 파싱 */
  def parseResult(result: Option[XReadResult]): Map[String, ParsedEvent[T]] = {
    val map = mutable.Map.empty[String, ParsedEvent[T]]

    result match {
      case None => map.toMap
      case Some(streams) =>
        for (stream <- streams) {
          val entries = parseStream(stream)

          for ((id, event) <- entries) {
            map(id) = event
          }
        }
        map.toMap
    }
  }

  /** 개별 스트림 파싱 */
  private def parseStream(stream: XReadStream): Map[String, ParsedEvent[T]] = {
    val map = mutable.Map.empty[String, ParsedEvent[T]]
    val (_, entries) = stream

    for (entry <- entries) {
      parseEntry(entry) match {
        case Some((id, event)) => map(id) = event
        case None              => ()
      }
    }
    map.toMap
  }

  /** 단일 엔트리 파싱 */
  private def parseEntry(entry: XReadStreamEntry): Option[(String, ParsedEvent[T])] = {
    val (id, fields) = entry

    val record = parseFields(fields)

    parser.parse(record).map(event => (id, event))
  }

  /** 필드 배열을 key-value 객체로 변환 */
  private def parseFields(fields: Seq[String]): Map[String, String] = {
    fields
      .grouped(2)
      .collect { case Seq(k, v) => k -> v }
      .toMap
  }
}
