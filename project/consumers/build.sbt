import Dependencies._

ThisBuild / scalaVersion := "3.5.1"
ThisBuild / version := "2.0.0-SNAPSHOT"
ThisBuild / organization := "dev.narcisource"

lazy val commonSettings = Seq(
  libraryDependencies ++= Seq(
    "com.typesafe.play" %% "play-json" % "2.10.6",
    "io.circe" %% "circe-core" % "0.14.7",
    "io.circe" %% "circe-generic" % "0.14.7",
    "io.circe" %% "circe-parser" % "0.14.7",
    "io.github.cdimascio" % "dotenv-java" % "3.2.0",
    "org.typelevel" %% "cats-effect" % "3.6.3"
  ),
  resolvers += Resolver.mavenCentral
)

lazy val shared = (project in file("shared"))
  .settings(commonSettings: _*)
  .settings(
    libraryDependencies ++= Seq(
      "org.http4s" %% "http4s-ember-server" % "0.23.30",
      "org.http4s" %% "http4s-dsl" % "0.23.32"
    )
  )

// streams
lazy val streamsSource = (project in file("source/streams"))
  .dependsOn(shared)
  .settings(
    libraryDependencies ++= Seq(
      "redis.clients" % "jedis" % "7.0.0"
    )
  )

// stream - dynamo 컨슈머
lazy val dynamoSink = (project in file("sink/dynamo-consumer"))
  .dependsOn(shared, streamsSource)
  .settings(
    libraryDependencies ++= Seq(
      "software.amazon.awssdk" % "dynamodb" % "2.37.3",
      "software.amazon.awssdk" % "url-connection-client" % "2.37.2"
    )
  )
  .settings(
    name := "streams-dynamo-consumer",
    assembly / mainClass := Some("consumers.dynamo.sink.Main"),
    assembly / assemblyJarName := "streams-dynamo-consumer.jar",
    assembly / assemblyOutputPath := file(
      "./target/" + (assembly / assemblyJarName).value
    )
  )

// stream - elasticsearch 컨슈머
lazy val esSink = (project in file("sink/elasticsearch-consumer"))
  .dependsOn(shared, streamsSource)
  .settings(commonSettings: _*)
  .settings(
    libraryDependencies ++= Seq(
      "nl.gn0s1s" %% "elastic4s-core" % "9.1.1",
      "nl.gn0s1s" %% "elastic4s-client-esjava" % "9.1.1"
    )
  )
  .settings(
    name := "streams-elasticsearch-consumer",
    assembly / mainClass := Some("consumers.es.sink.Main"),
    assembly / assemblyJarName := "streams-elasticsearch-consumer.jar",
    assembly / assemblyOutputPath := file(
      "./target/" + (assembly / assemblyJarName).value
    )
  )

lazy val root = (project in file("."))
  .aggregate(dynamoSink, esSink, streamsSource, shared)
  .settings(name := "consumers")
