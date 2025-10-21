package consumers.shared
package model

import java.time.Instant

import consumers.shared.WithCreatedAt

case class ChatMessage(
    roomId: String,
    userId: String,
    content: String,
    createdAt: Instant = Instant.EPOCH
)

object ChatMessage {
  given WithCreatedAt[ChatMessage] = (m, ts) => m.copy(createdAt = ts)
}
