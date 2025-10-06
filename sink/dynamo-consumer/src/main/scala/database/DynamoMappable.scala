package consumers.dynamo.sink
package database

import scala.jdk.CollectionConverters._
import software.amazon.awssdk.services.dynamodb.model.AttributeValue

// T 타입의 객체를 DynamoDB에 저장할 수 있도록 변환
trait DynamoMappable[T] {
  def toAttributes(value: T): Map[String, AttributeValue]
}

// given은 DynamoMappable[T]을 자동으로 제공하는 인스턴스 정의
given [T <: Product]: DynamoMappable[T] with {
  def toAttributes(value: T): Map[String, AttributeValue] = {
    // 주어진 객체의 필드를 순회하며 필드명 map
    value.getClass.getDeclaredFields
      .map { field =>
        // private, protected 필드도 접근할 수 있도록 설정
        field.setAccessible(true)

        // 필드명
        val fieldName = field.getName
        // 필드 값
        val fieldValue = field.get(value)

        fieldName -> (fieldValue match {
          case null => AttributeValue.builder().nul(true).build()

          case _    => AttributeValue.builder().s(fieldValue.toString).build()
        })
      }
      .toMap
  }
}
