package models

object Env {
  val dotenv = io.github.cdimascio.dotenv.Dotenv.load()

  val REDIS_HOST: String = dotenv.get("REDIS_HOST")
  val REDIS_PORT: Int = dotenv.get("REDIS_PORT").toInt
  val REDIS_STREAMS_KEY: String = dotenv.get("REDIS_STREAMS_KEY")
  val REDIS_STREAMS_PARSER: String = dotenv.get("REDIS_STREAMS_PARSER")

  val DYNAMO_HOST: String = dotenv.get("DYNAMO_HOST")
  val DYNAMO_PORT: Int = dotenv.get("DYNAMO_PORT").toInt
  val DYNAMO_TABLE: String = dotenv.get("DYNAMO_TABLE")
}
