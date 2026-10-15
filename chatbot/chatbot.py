import os
from datetime import datetime

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from langchain_groq import ChatGroq

app = FastAPI()


class ChatRequest(BaseModel):
    message: str

# Estas instruções definem o idioma, o tom e os assuntos que o bot evita.
INSTRUCOES = """Você é o CyberBot, um assistente educativo que conversa em português do Brasil.
Responda à pergunta do usuário de forma clara, útil, educada e adequada para todas as idades.
Seu foco é segurança digital, tecnologia, internet e uso responsável da inteligência artificial.
Se a pergunta pedir conteúdo sexual explícito, instruções para violência, atividades perigosas ou ilegais, recuse brevemente e ofereça uma alternativa segura.
Para perguntas fora do seu foco, explique com educação que seu papel é ajudar com tecnologia e segurança digital.
Não use uma resposta de recusa padrão para perguntas permitidas."""


def responder(pergunta: str) -> str:
    # Lê a chave do ambiente para não gravá-la no código.
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise RuntimeError("Configure GROQ_API_KEY no arquivo .env.")

    # Cria o modelo e envia as instruções junto com a pergunta.
    modelo = ChatGroq(
        model=os.getenv("GROQ_MODEL", "openai/gpt-oss-120b"),
        api_key=api_key,
    )
    resposta = modelo.invoke(
        [
            ("system", INSTRUCOES),
            ("human", pergunta),
        ]
    )
    return str(resposta.content).strip()


@app.post("/api/chat")
def conversar(request: ChatRequest) -> dict[str, str]:
    try:
        reply = responder(request.message)
    except RuntimeError as error:
        raise HTTPException(status_code=503, detail=str(error)) from error
    except Exception as error:
        raise HTTPException(status_code=502, detail="Não foi possível consultar a IA agora.") from error

    return {
        "reply": reply,
        "sender": "CyberBot",
        "timestamp": datetime.now().isoformat(),
    }
