import sbt._
import sbt.Keys._
import sbtassembly.AssemblyPlugin
import sbtassembly.AssemblyPlugin.autoImport._
import sbtassembly.MergeStrategy

ThisBuild / assemblyMergeStrategy := {
  case PathList("META-INF", xs @ _*)
      if xs.exists(_.toLowerCase.endsWith(".sf")) =>
    MergeStrategy.discard
  case PathList("META-INF", xs @ _*)
      if xs.exists(_.toLowerCase.endsWith(".dsa")) =>
    MergeStrategy.discard
  case PathList("META-INF", xs @ _*)
      if xs.exists(_.toLowerCase.endsWith(".rsa")) =>
    MergeStrategy.discard
  case PathList("META-INF", "MANIFEST.MF")     => MergeStrategy.discard
  case PathList("META-INF", "versions", _ @_*) => MergeStrategy.discard
  case "module-info.class"                     => MergeStrategy.discard
  case path if path.toLowerCase.endsWith("fastdoubleparser-license") =>
    MergeStrategy.first
  case "reference.conf" | "application.conf" => MergeStrategy.concat
  case PathList("META-INF", xs @ _*)         => MergeStrategy.discard
  case _                                     => MergeStrategy.first
}
