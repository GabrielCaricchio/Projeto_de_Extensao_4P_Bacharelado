FROM maven:3.9.9-eclipse-temurin-21-alpine AS builder

WORKDIR /app

# Cache de dependências do Maven
COPY back-end/pom.xml .
RUN mvn dependency:resolve -B

# Copia o código-fonte e realiza o build do JAR
COPY back-end/src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Criação de usuário não-root por segurança
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Copia o artefato .jar gerado no estágio de build
COPY --from=builder /app/target/*.jar app.jar

# Porta padrão de execução do Spring Boot
EXPOSE 8080

# Configurações de JVM otimizadas para containers
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]
