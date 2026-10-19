# 🛡️ CyberTech — Plataforma Educacional de Cibersegurança

> **Educação Digital, Cidadania e IA Responsável para Crianças e Adolescentes**
> Plataforma interativa com estética cyberpunk imersiva, integrando Front-end Angular moderno, Back-end Java Spring Boot e Chatbot inteligente com LLM e base de contingência educacional.

---

## 📋 Sumário

1. [Visão Geral](#-visão-geral)
2. [Arquitetura do Sistema](#-arquitetura-do-sistema)
3. [Pilares e Temas Educacionais](#-pilares-e-temas-educacionais)
4. [Recursos Visuais e Experiência do Usuário (UX/UI)](#-recursos-visuais-e-experiência-do-usuário-uxui)
5. [Pré-requisitos](#-pré-requisitos)
6. [Execução Rápida com Docker Compose](#-execução-rápida-com-docker-compose)
7. [Execução Individual por Módulo](#-execução-individual-por-módulo)
   - [Chatbot (FastAPI / Python)](#1-chatbot-fastapi--python)
   - [Back-end (Spring Boot / Java)](#2-back-end-spring-boot--java)
   - [Front-end (Angular / TypeScript)](#3-front-end-angular--typescript)
8. [Configuração de Variáveis de Ambiente](#-configuração-de-variáveis-de-ambiente)
9. [Mapeamento de Portas e Endpoints da API](#-mapeamento-de-portas-e-endpoints-da-api)
10. [Testes Automatizados](#-testes-automatizados)
11. [Diretrizes de Segurança e Boas Práticas](#-diretrizes-de-segurança-e-boas-práticas)

---

## 🌐 Visão Geral

O **CyberTech** foi projetado para transformar o aprendizado de segurança da informação em uma jornada cativante e acessível para o público jovem (crianças e adolescentes). Em vez de abordagens punitivas ou excessivamente teóricas, a plataforma adota uma postura empática, acolhedora e preventiva:

- **Zero culpabilização da vítima**: o usuário é orientado a pedir ajuda imediata a pais, responsáveis ou educadores sem medo de punições.
- **Linguagem direta e prática**: metáforas do cotidiano (como chaves de casa e disfarces) para explicar conceitos como senhas fortes, phishing e engenharia social.
- **Interatividade total**: simulador de defesa (DEFCON), efeitos sonoros táticos sintetizados em tempo real, quiz avaliativo com feedback imediato e um assistente inteligente (**CyberBot IA**) treinado no currículo pedagógico.

---

## 🏗️ Arquitetura do Sistema

```
                             +-----------------------------+
                             |   Navegador do Usuário      |
                             |   (CyberTech Web Client)    |
                             +--------------+--------------+
                                            |
                            HTTP (Porta 4200 ou 80)
                                            |
                                            v
                             +-----------------------------+
                             |    Front-end Angular        |
                             |  - Nginx serve arquivos SPA |
                             |  - Encaminha /api ao Spring |
                             +--------------+--------------+
                                            |
                                     HTTP (/api/*)
                                            |
                                            v
                             +-----------------------------+
                             |    Back-end Spring Boot     |
                             |      (Porta 8080)           |
                             |  - API REST /api/chat       |
                             +--------------+--------------+
                                            |
                                  HTTP (Porta 8000)
                                            |
                                            v
                             +-----------------------------+
                             |     Chatbot FastAPI         |
                             |      (Porta 8000)           |
                             |  - Groq LLM (Llama 3.3 70B) |
                             |  - RAG / Base Educativa TXT |
                             |  - Fallback Offline Nativo  |
                             +-----------------------------+
```

1. **Front-end (`/front-end`)**: Single Page Application em Angular 22 standalone, HTML5 semântico, Vanilla CSS com glassmorphism, retícula de mira tática, Web Audio API, gerenciamento de temas e seção integrada `#chatbot`.
2. **Back-end (`/back-end`)**: API REST em Java 21 com Spring Boot. Não serve páginas nem assets do Angular; recebe as chamadas `/api/*` encaminhadas pelo frontend e integra o chatbot.
3. **Chatbot (`/chatbot`)**: Microsserviço Python 3.11 com FastAPI, LangChain Groq (`llama-3.3-70b-versatile`) e motor de contingência determinístico que responde todos os tópicos mesmo sem internet ou chave de API ativa.

---

## 📚 Pilares e Temas Educacionais

A base pedagógica do **CyberTech** contempla os 11 temas obrigatórios do projeto, complementados por tópicos de proteção digital:

| Tema         | Identificador                     | Foco Educacional Principal                                                                         |
| :----------- | :-------------------------------- | :------------------------------------------------------------------------------------------------- |
| **00** | Visão Geral                      | Como funciona a internet, pacotes de dados, roteadores e noções de privacidade.                  |
| **01** | Golpes & Phishing                 | Identificação de links suspeitos, promessas irreais, prêmios falsos e skins grátis.            |
| **02** | Fraudes Pix & Financeiras         | Clonagem de WhatsApp, QR Codes adulterados, falsos familiares e compras seguras.                   |
| **03** | Senhas & MFA                      | Senhas longas e fáceis de lembrar (frases-passe), autenticação em dois fatores e gerenciadores. |
| **04** | Vírus & Malware                  | Cavalos de Troia, downloads clandestinos em jogos, permissões abusivas de aplicativos.            |
| **05** | Redes Sociais & Pegada Digital    | Perfis privados, oversharing, geolocalização e a permanência das postagens na web.              |
| **06** | Engenharia Social & Manipulação | Ataques de urgência, pressão psicológica, chantagem emocional e verificação de fatos.         |
| **07** | Cyberbullying & Empatia Digital   | Consequências do ódio online, como denunciar, bloquear e apoiar colegas afetados.                |
| **08** | IA & Responsabilidade             | Como a IA aprende, vieses algorítmicos, deepfakes e uso ético de ferramentas generativas.        |
| **09** | Fake News & Desinformação       | Critérios de checagem, identificação de fontes confiáveis e pensamento crítico.               |
| **10** | Grooming & Abuso Online           | Alertas sobre estranhos em jogos e redes, proteção contra aliciamento e canal Disque 100.        |

---

## 🎨 Recursos Visuais e Experiência do Usuário (UX/UI)

- **Identidade CyberTech**: Estética cyberpunk sofisticada com tema escuro padrão e alternância para modo de alta visibilidade.
- **Reticular Targeting Cursor**: Cursor customizado tático com anel de mira que reage a cliques e elementos focáveis.
- **DEFCON HUD**: Alternador interativo de nível de ameaça cibernética (DEFCON 5 ao DEFCON 1) no topo da interface.
- **Motor de Áudio Tático (Web Audio API)**: Sons sintetizados proceduralmente para cliques, ativações de terminal, envio de mensagens e acertos no Quiz (sem dependência de arquivos de áudio pesados).
- **Chatbot Integrado com Sugestões Rápidas**: Seção dedicada com telemetria do status da IA, indicador de digitação suave e botões de atalho temáticos.
- **Integração Modal -> CyberBot**: Ao inspecionar qualquer um dos 11 tópicos pedagógicos no modal explicativo, o aluno pode clicar em *"Perguntar ao CyberBot sobre este tópico"* e ser redirecionado imediatamente com a pergunta pré-configurada.
- **Quiz de 10 Questões**: Avaliação com explicações educativas imediatas a cada resposta, reforçando o aprendizado prático.

---

## ⚙️ Pré-requisitos

Para rodar o projeto localmente, certifique-se de ter instalado:

- **Docker** e **Docker Compose** (recomendado para inicialização unificada); **OU**
- **Node.js** v20+ e **npm** v10+ (para o Front-end);
- **JDK 21** (Java Development Kit) e **Maven** (o projeto já inclui o wrapper `mvnw`);
- **Python** 3.10 ou 3.11 (para o Chatbot).

---

## 🚀 Execução Rápida com Docker Compose

O método mais simples e padronizado para executar todo o ecossistema CyberTech simultaneamente:

1. **Acesse a raiz do projeto:**

   ```bash
   cd "C:\Users\danie\Documents\sites\DEU CERTO\CRIANÇA"
   ```
2. **Configure a variável de ambiente:**
   Copie `.env.example` para `.env`:

   ```bash
   cp .env.example .env
   ```

   *(Opcional)* Insira sua chave `GROQ_API_KEY` dentro de `.env`. Se deixada vazia, o Chatbot ativará automaticamente o motor offline educacional de contingência.
3. **Inicie os contêineres:**

   ```bash
   docker compose up --build
   ```
4. **Acesse no navegador:**

   - **Plataforma CyberTech (Front-end):** [http://localhost](http://localhost) ou [http://localhost:4200](http://localhost:4200)
   - **Back-end Spring Boot:** [http://localhost:8080](http://localhost:8080) (redireciona para o Angular em `:4200`; endpoints da API ficam em `/api`)
   - **Chatbot FastAPI (Swagger Docs):** [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 💻 Execução Individual por Módulo

Se preferir rodar cada serviço diretamente no seu sistema operacional para desenvolvimento ou testes pontuais:

### 1. Chatbot (FastAPI / Python)

```bash
cd "C:\Users\danie\Documents\sites\DEU CERTO\CRIANÇA\chatbot"

# Criar e ativar o ambiente virtual (Windows)
python -m venv .venv
.\.venv\Scripts\activate

# Instalar as dependências
pip install -r requirements.txt

# (Opcional) Configurar arquivo .env com a chave da Groq
copy .env.example .env

# Iniciar o servidor FastAPI
uvicorn chatbot:app --host 0.0.0.0 --port 8000 --reload
```

- Endpoint de saúde: `http://localhost:8000/health`
- Documentação interativa: `http://localhost:8000/docs`

---

### 2. Back-end (Spring Boot / Java)

```bash
cd "C:\Users\danie\Documents\sites\DEU CERTO\CRIANÇA\back-end"

# Executar testes unitários
.\mvnw.cmd test

# Iniciar a aplicação Spring Boot (porta 8080)
.\mvnw.cmd spring-boot:run
```

- Endpoint de chat: `http://localhost:8080/api/chat` (POST)
- A raiz e as rotas de páginas do backend redirecionam para a aplicação Angular (`FRONTEND_URL`, padrão `http://localhost:4200`).

---

### 3. Front-end (Angular / TypeScript)

```bash
cd "C:\Users\danie\Documents\sites\DEU CERTO\CRIANÇA\front-end"

# Executar testes unitários (Vitest)
npm test -- --watch=false

# Compilar para produção
npm run build

# Iniciar o servidor de desenvolvimento Angular (porta 4200)
npm start
```

- Acesso de desenvolvimento: `http://localhost:4200/`

---

## 🔑 Configuração de Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto ou na pasta `chatbot/` com base nos modelos fornecidos:

```ini
# Chave da API Groq para o modelo Llama 3.3 70B Versatile
# Obtenha sua chave gratuita em: https://console.groq.com/keys
GROQ_API_KEY=gsk_sua_chave_groq_aqui

# Modelo padrão utilizado
GROQ_MODEL=llama-3.3-70b-versatile

# Porta do serviço FastAPI
CHATBOT_PORT=8000

# URL do Chatbot consumida pelo Back-end Spring Boot
CHATBOT_URL=http://localhost:8000
```

> **Nota pedagógica**: O assistente **CyberBot** conta com um motor de contingência baseado em processamento de linguagem natural por palavras-chave com mais de 100 regras cobrindo todos os 11 temas educacionais. Mesmo sem chave Groq ou conexão com a internet, o aluno continuará recebendo orientações didáticas completas sobre senhas, phishing, Pix, cyberbullying, IA e denúncia no Disque 100.

---

## 🔌 Mapeamento de Portas e Endpoints da API

| Serviço            | Porta Padrão                  | Endpoint      | Método | Descrição                                               |
| :------------------ | :----------------------------- | :------------ | :------ | :-------------------------------------------------------- |
| **Front-end Angular** | `4200` (Dev/Docker) / `80` (Docker) | `/` | GET | Interface CyberTech SPA, servida pelo Angular/Nginx |
| **Front-end Angular** | `4200` (Docker) | `/api/*` | conforme API | Proxy reverso para o Spring Boot |
| **Back-end** | `8080` | `/` e rotas de páginas | GET | Redirecionamento para o Angular; não serve arquivos da interface |
| **Back-end**  | `8080`                       | `/api/chat` | POST    | Proxy seguro e sanitizado para o Chatbot                  |
| **Chatbot**   | `8000`                       | `/api/chat` | POST    | Processamento de mensagens com LLM / contingência        |
| **Chatbot**   | `8000`                       | `/health`   | GET     | Status do serviço de IA e disponibilidade do Groq        |
| **Chatbot**   | `8000`                       | `/docs`     | GET     | Documentação Swagger/OpenAPI interativa                 |

### Exemplo de Payload para `/api/chat`:

```json
{
  "message": "Como sei se uma mensagem no WhatsApp é golpe?"
}
```

### Exemplo de Resposta:

```json
{
  "response": "Desconfie de mensagens urgentes pedindo dinheiro ou links com 'skins grátis'. Nunca clique antes de perguntar para um adulto de confiança!",
  "model": "llama-3.3-70b-versatile"
}
```

---

## 🧪 Testes Automatizados

Todos os módulos contam com baterias de testes verificadas:

```bash
# 1. Testes do Front-end (Angular / Vitest)
cd "C:\Users\danie\Documents\sites\DEU CERTO\CRIANÇA\front-end"
npm test -- --watch=false
# Resultado: 3 passed (100% sucesso)

# 2. Testes do Back-end (Spring Boot / Maven)
cd "C:\Users\danie\Documents\sites\DEU CERTO\CRIANÇA\back-end"
.\mvnw.cmd test
# Resultado: Tests run: 1, Failures: 0, Errors: 0, Skipped: 0 (BUILD SUCCESS)

# 3. Testes do Chatbot (Python Syntax & Smoke Test)
cd "C:\Users\danie\Documents\sites\DEU CERTO\CRIANÇA\chatbot"
python -m py_compile chatbot.py
# Resultado: 0 erros de sintaxe
```

---

## 🔒 Diretrizes de Segurança e Boas Práticas

1. **Proteção contra Vazamento de Credenciais**:
   - Arquivos `.env`, chaves de API e tokens estão rigorosamente incluídos no `.gitignore`.
   - Utilize sempre os modelos `.env.example` para distribuição.
2. **Sanitização de Entradas**:
   - As mensagens enviadas ao chatbot são validadas quanto a tamanho e sanitizadas para evitar injeções de prompt.
3. **Privacidade Infantil**:
   - O chatbot orienta explicitamente as crianças a **nunca compartilharem dados pessoais**, como nome completo, escola, endereço, fotos pessoais ou senhas.
4. **CORS Restrito**:
   - As origens permitidas estão delimitadas entre as portas de desenvolvimento (`4200`, `8080`) e o ambiente de contêineres (`80`).

---

<p align="center">
  <b>CyberTech — Navegando com Segurança no Universo Digital 🚀</b><br>
  <i>Desenvolvido com foco em excelência técnica, imersão visual e impacto educacional real.</i>
</p>
