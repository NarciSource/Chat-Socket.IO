FROM openjdk:22-jdk-slim AS builder

RUN apt-get update && apt-get install -y curl gnupg lsb-release

RUN echo "deb https://repo.scala-sbt.org/scalasbt/debian all main" | tee /etc/apt/sources.list.d/sbt.list \
    && curl -sL "https://keyserver.ubuntu.com/pks/lookup?op=get&search=0x2EE0EA64E40A89B84B2DF73499E82A75642AC823" | tee /etc/apt/trusted.gpg.d/sbt.asc \
    && apt-get update

# sbt 설치
RUN apt-get install -y sbt

WORKDIR /app

COPY build.sbt .
COPY assembly.sbt .
COPY project/ project/
COPY shared/ shared/
COPY source/streams/ source/streams/
COPY sink/dynamo-consumer/ sink/dynamo-consumer/

RUN sbt "project dynamoSink" clean assembly

FROM openjdk:22-jdk-slim AS runner

RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=builder app/target/streams-dynamo-consumer.jar .

EXPOSE 8080

CMD ["java", "-jar", "streams-dynamo-consumer.jar"]
