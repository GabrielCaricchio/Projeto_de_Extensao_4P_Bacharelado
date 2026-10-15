# Cultura Digital

Plataforma educativa sobre segurança e cidadania digital. Reúne conteúdos sobre golpes, cyberbullying, redes sociais, malwares e uso responsável de inteligência artificial, além de um chatbot para responder dúvidas.

## Funcionalidades

- Conteúdos educativos organizados por tópico, com dicas e quizzes.
- Chatbot integrado à API Groq para responder perguntas em português.
- Alternância entre tema claro e escuro, com preferência salva no navegador.
- Interface responsiva em Angular.

## Tecnologias

- Frontend: Angular 22 e Tailwind CSS 4.
- Backend: Java 21 e Spring Boot.
- Serviço de IA: Python 3.12, FastAPI e LangChain Groq.
- Execução local: Docker Compose.

## Pré-requisitos

- Docker com o plugin Docker Compose.
- Uma chave de API válida da Groq.

## Configuração e execução

1. Crie o arquivo local de configuração do chatbot:

   ```bash
   cp chatbot/.env.example chatbot/.env
   ```
2. Edite `chatbot/.env` e substitua o valor de `GROQ_API_KEY` por uma chave válida. Não publique nem envie esse arquivo ao Git.
3. Na raiz do projeto, construa e inicie os serviços:

   ```bash
   docker compose up --build -d
   ```
4. Acesse o site em [http://localhost](http://localhost) ou [http://localhost:4200](http://localhost:4200).

Para acompanhar os serviços:

```bash
docker compose logs -f frontend backend chatbot-api
```

Para pará-los:

```bash
docker compose down
```

Após trocar a chave Groq, recrie o serviço de IA para carregar a configuração:

```bash
docker compose up -d --force-recreate chatbot-api
```

## Serviços e portas

| Serviço    | Acesso                                            | Responsabilidade                                         |
| ----------- | ------------------------------------------------- | -------------------------------------------------------- |
| Frontend    | `http://localhost` ou `http://localhost:4200` | Interface Angular servida pelo Nginx.                    |
| Backend     | `http://localhost:8080`                         | API REST de tópicos, status e encaminhamento do chat.   |
| Chatbot API | Interno na porta `8000`                         | Consulta a IA Groq; não é exposta diretamente no host. |

## API

Verificar se o backend está ativo:

```bash
curl http://localhost:8080/api/status
```

Listar os tópicos:

```bash
curl http://localhost:8080/api/topicos
```

Enviar uma pergunta ao chatbot:

```bash
curl -X POST http://localhost:8080/api/chat \
  -H 'Content-Type: application/json' \
  -d '{"message":"Como reconhecer um link suspeito?"}'
```

## Testes e build

Frontend:

```bash
cd frontend
npm install
npm run build
npm test
```

Backend (`back-end/`):

```bash
cd back-end
./mvnw test
```

Validar o arquivo do Docker Compose a partir da raiz:

```bash
docker compose config --quiet
```

## Solução de problemas

- **O chatbot retorna `502 Bad Gateway`:** confirme que `GROQ_API_KEY` em `chatbot/.env` é válida e ativa. Uma chave inválida é rejeitada pela Groq e não pode ser corrigida pelo código.
- **O chatbot não reconhece uma chave alterada:** recrie o serviço com `docker compose up -d --force-recreate chatbot-api`.
- **Uma porta já está em uso:** encerre o processo que a ocupa ou altere as portas publicadas no `docker-compose.yml`.
- **Consultar logs:** use `docker compose logs -f backend chatbot-api` para investigar a comunicação entre o backend e a IA.

## Estrutura principal

```text
frontend/       Aplicação Angular
back-end/       API Spring Boot
chatbot/        Serviço Python/FastAPI para a IA
docker-compose.yml
```
