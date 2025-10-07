package consumers.es.sink
package database

import io.circe.syntax._
import io.circe.generic.auto._
import io.circe.Encoder
import com.sksamuel.elastic4s.Indexable

import consumers.shared.model.ChatMessage

given [T: Encoder]: Indexable[T] with
  def json(t: T): String = t.asJson.noSpaces
