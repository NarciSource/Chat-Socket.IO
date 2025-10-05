package consumers.shared
package model

case class ChatMessage(
    roomId: String,
    userId: String,
    content: String
)
