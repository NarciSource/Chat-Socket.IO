package consumers.shared
package config

object Env {
  val dotenv = io.github.cdimascio.dotenv.Dotenv
    .configure()
    .ignoreIfMalformed()
    .ignoreIfMissing()
    .load()

  val REDIS_HOST: String = dotenv.get("REDIS_HOST")
  val REDIS_PORT: Int = dotenv.get("REDIS_PORT").toInt
  val REDIS_STREAMS_KEY: String = dotenv.get("REDIS_STREAMS_KEY")
  val REDIS_STREAMS_PARSER: String = dotenv.get("REDIS_STREAMS_PARSER")

  val DYNAMO_HOST: String = dotenv.get("DYNAMO_HOST")
  val DYNAMO_PORT: Int = dotenv.get("DYNAMO_PORT").toInt
  val DYNAMO_TABLE: String = dotenv.get("DYNAMO_TABLE")

  val ES_HOST: String = dotenv.get("ES_HOST")
  val ES_PORT: Int = dotenv.get("ES_PORT").toInt
  val ES_USERNAME: String = dotenv.get("ES_USERNAME")
  val ES_PASSWORD: String = dotenv.get("ES_PASSWORD")
  val ES_INDEX: String = dotenv.get("ES_INDEX")
}
