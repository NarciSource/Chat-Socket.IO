import Dependencies._

ThisBuild / scalaVersion := "3.5.1"
ThisBuild / version := "2.0.0-SNAPSHOT"
ThisBuild / organization := "dev.narcisource"

lazy val commonSettings = Seq(
  libraryDependencies ++= Seq(
    "io.github.cdimascio" % "dotenv-java" % "3.2.0"
  ),
  resolvers += Resolver.mavenCentral
)

lazy val root = (project in file("."))
  .settings(commonSettings: _*)
  .settings(name := "consumers")
