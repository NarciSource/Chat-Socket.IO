package consumers.shared

import java.time.Instant

trait WithCreatedAt[T] {
  def withCreatedAt(t: T, createdAt: Instant): T
}
