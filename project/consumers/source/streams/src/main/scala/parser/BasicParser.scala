package consumers.streams.source
package parser

import scala.util.{Try, Success, Failure}

import play.api.libs.json._

import consumers.shared.model.ChatMessage

class BasicParser extends IStreamParser[ChatMessage] {

  implicit val chatMessageReads: Reads[ChatMessage] = Json.reads[ChatMessage]

  def parse(raw: Map[String, String]): Option[ParsedEvent[ChatMessage]] = {
    raw.get("message") match {
      case None => None
      case Some(message) =>
        Try(Json.parse(message).as[ChatMessage]) match {
          case Success(payload) =>
            Some(
              ParsedEvent(
                eventName = "receive_message",
                payload = Right(payload),
                `type` = raw.get("type"),
                nsp = raw.get("nsp"),
                uid = raw.get("uid")
              )
            )
          case Failure(err) =>
            println(s"[RedisStreamParser] Failed to parse record.message: $err")
            None
        }
    }
  }
}
