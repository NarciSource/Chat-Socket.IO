package consumers.shared
package healthServer
import cats.syntax.all._

import cats.effect.{IO, IOApp, Resource}
import org.http4s._
import org.http4s.dsl.io._
import org.http4s.ember.server.EmberServerBuilder
import com.comcast.ip4s._

object HealthServer {
  // 여러 스레드가 동시에 접근할 때 변수의 최신값을 항상 읽도록 보장
  @volatile private var isHealthy: Boolean = false

  def setHealthy(value: Boolean): Unit = {
    isHealthy = value
  }

  private val routes = HttpRoutes.of[IO] { case GET -> Root / "health" =>
    if (isHealthy) Ok("OK")
    else InternalServerError("UNHEALTHY")
  }

  private val httpApp = routes.orNotFound

  /** 서버 리소스를 Resource로 노출 */
  def serverResource: Resource[IO, Unit] =
    for {
      _ <- Resource.eval(IO.println("Starting HealthServer on 0.0.0.0:8080"))
      _ <- EmberServerBuilder
        .default[IO]
        .withHost(Host.fromString("0.0.0.0").get)
        .withPort(Port.fromInt(8080).get)
        .withHttpApp(httpApp)
        .build
        .void
    } yield ()
}
