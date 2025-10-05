import Dependencies._

ThisBuild / scalaVersion := "3.5.1"
ThisBuild / version := "2.0.0-SNAPSHOT"
ThisBuild / organization := "dev.narcisource"

lazy val commonSettings = Seq(
  libraryDependencies ++= Seq(
    "com.typesafe.play" %% "play-json" % "2.10.6",
    "io.github.cdimascio" % "dotenv-java" % "3.2.0"
  ),
  resolvers += Resolver.mavenCentral
)

lazy val shared = (project in file("shared"))
  .settings(commonSettings: _*)

lazy val streamsSource = (project in file("source/streams"))
  .dependsOn(shared)
  .settings(
    libraryDependencies ++= Seq(
      "redis.clients" % "jedis" % "7.0.0"
    )
  )

lazy val dynamoSink = (project in file("sink/dynamo-consumer"))
  .dependsOn(shared, streamsSource)
  .settings(
    libraryDependencies ++= Seq(
      "software.amazon.awssdk" % "dynamodb" % "2.23.2"
    )
  )
  .settings(name := "consumer-streams-dynamo")

lazy val root = (project in file("."))
  .aggregate(dynamoSink, streamsSource, shared)
  .settings(name := "consumers")
