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

lazy val root = (project in file("."))
  .aggregate(streamsSource, shared)
  .settings(name := "consumers")
