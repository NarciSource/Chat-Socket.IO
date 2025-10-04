import Dependencies._

ThisBuild / scalaVersion     := "2.13.16"
ThisBuild / version          := "2.0.0-SNAPSHOT"
ThisBuild / organization     := "dev.narcisource"

lazy val root = (project in file("."))
  .settings(
    name := "consumers",
    libraryDependencies += munit % Test
  )

// See https://www.scala-sbt.org/1.x/docs/Using-Sonatype.html for instructions on how to publish to Sonatype.
