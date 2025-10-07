package consumers.es.sink
package database

import scala.concurrent.Future
// 스레드 풀 기본 지정
import scala.concurrent.ExecutionContext.Implicits.global

import com.sksamuel.elastic4s.{ElasticClient, ElasticProperties}
import com.sksamuel.elastic4s.http.JavaClient
import com.sksamuel.elastic4s.ElasticDsl.updateById
import com.sksamuel.elastic4s.Indexable
import com.sksamuel.elastic4s.handlers.update.UpdateHandlers._

import consumers.shared.config.Env.{ES_HOST, ES_PORT, ES_USERNAME, ES_PASSWORD, ES_INDEX}

class ESWriter[T](using idx: Indexable[T]) {
  private val endpoint = s"http://$ES_USERNAME:$ES_PASSWORD@$ES_HOST:$ES_PORT"
  private val props = ElasticProperties(endpoint)
  private val client = ElasticClient(JavaClient(props))

  def updateChatMessage(eventId: String, content: T): Future[?] = {
    // ES에 업데이트 요청
    client.execute(
      updateById(ES_INDEX, eventId).docAsUpsert(content)
    )
  }
}
