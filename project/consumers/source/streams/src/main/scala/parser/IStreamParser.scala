package consumers.streams.source
package parser

case class ParsedEvent[T](
    eventName: String,
    payload: Either[String, T],
    `type`: Option[String] = None,
    nsp: Option[String] = None,
    uid: Option[String] = None
)

trait IStreamParser[T] {
  def parse(raw: Map[String, String]): Option[ParsedEvent[T]]
}
