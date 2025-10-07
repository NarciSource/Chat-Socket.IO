package consumers.es.sink
package database

import java.util.Base64
import scala.concurrent.Future
// 스레드 풀 기본 지정
import scala.concurrent.ExecutionContext.Implicits.global

import org.apache.http.message.BasicHeader
import com.sksamuel.elastic4s.{ElasticClient, ElasticProperties}
import com.sksamuel.elastic4s.http.JavaClient
import com.sksamuel.elastic4s.ElasticDsl._
import com.sksamuel.elastic4s.Indexable
import com.sksamuel.elastic4s.handlers.update.UpdateHandlers._

import consumers.shared.config.Env.{ES_HOST, ES_PORT, ES_USERNAME, ES_PASSWORD, ES_INDEX}

class ESWriter[T](using idx: Indexable[T]) {
  val authHeader = {
    val token = Base64.getEncoder.encodeToString(s"$ES_USERNAME:$ES_PASSWORD".getBytes)
    new BasicHeader("Authorization", s"Basic $token")
  }

  val props = ElasticProperties(s"http://$ES_HOST:$ES_PORT")
  val client = ElasticClient(JavaClient(props))

  def updateChatMessage(eventId: String, content: T): Future[?] = {
    // ES에 업데이트 요청
    val resF = client.execute {
      indexInto(ES_INDEX)
        .id(eventId)
        .doc(content)
    }

    resF.onComplete {
      case scala.util.Success(resp) =>
        println(s"[SUCCESS] Indexed: ${resp.result}")
      case scala.util.Failure(err) =>
        println(s"[ERROR] Index failed: ${err.getMessage}")
    }

    resF.map(_ => ())
  }
}
