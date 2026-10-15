# ==========================================
# Estágio 1: Build da aplicação (Maven)
# ==========================================
# Stage 1 builds the Angular pages and assets.
FROM node:22-alpine AS frontend-builder

WORKDIR /app

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build -- --configuration production

# Stage 2 packages the Java routes together with the Angular assets.
FROM maven:3.9.9-eclipse-temurin-21-alpine AS builder

WORKDIR /app

# Cache de dependências do Maven
COPY back-end/pom.xml .
RUN mvn dependency:resolve -B

# Copia o código-fonte e realiza o build do JAR
COPY back-end/src ./src
COPY --from=frontend-builder /app/dist/frontend/browser/ ./src/main/resources/static/
RUN mvn clean package -DskipTests

# ==========================================
# Estágio 2: Imagem de execução (Runtime leve)
# ==========================================
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

