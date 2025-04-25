# Etapa 1: Build com Maven e JDK 17
FROM maven:3.8.4-openjdk-17-slim AS builder

# Diretório de trabalho
WORKDIR /app

# Copia o POM e baixa as dependências
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copia o código-fonte
COPY src ./src

# Compila o projeto (sem rodar testes)
RUN mvn package -DskipTests

# Etapa 2: Imagem final apenas com o JAR e JDK 17
FROM openjdk:17-jdk-slim

# Diretório de trabalho
WORKDIR /app

# Copia o JAR da etapa anterior
COPY --from=builder /app/target/*.jar ./app.jar

# Exponha a porta que a aplicação irá usar
EXPOSE 8081

# Comando para rodar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]
