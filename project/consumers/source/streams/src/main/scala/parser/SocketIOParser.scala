package consumers.streams.source
package parser

import scala.util.{Try, Success, Failure}

import play.api.libs.json._

import consumers.shared.model.ChatMessage

class SocketIOParser extends IStreamParser[ChatMessage] {
  // 자동으로 ChatMessage 케이스 클래스에 대한 JSON 파서(Reads)를 생성
  implicit val chatMessageReads: Reads[ChatMessage] = Json.reads[ChatMessage]

  def parse(raw: Map[String, String]): Option[ParsedEvent[ChatMessage]] = {
    raw.get("data") match {
      case None => None
      case Some(dataStr) =>
        Try(Json.parse(dataStr)) match {
          case Success(json) =>
            // json 키 탐색
            val packetDataOpt = (json \ "packet" \ "data").asOpt[JsArray]

            // 컨테이너 함수 적용
            packetDataOpt.flatMap { arr =>
              // 함수 조립
              for {
                eventName <- arr.value.headOption.flatMap(_.asOpt[String])
                payloadJson <- arr.value.lift(1)
                payload <- Try(payloadJson.as[ChatMessage]).toOption
              } yield ParsedEvent(
                eventName = eventName,
                payload = Right(payload),
                `type` = raw.get("type"),
                nsp = raw.get("nsp"),
                uid = raw.get("uid")
              )
            }

          case Failure(err) =>
            println(s"[RedisStreamParser] Failed to parse record.data: $err")
            None
        }
    }
  }
}
