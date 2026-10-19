import os
import re
from datetime import datetime
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# Carrega variáveis de ambiente do arquivo .env
load_dotenv()

app = FastAPI(
    title="CyberTech Chatbot API",
    description="Serviço educativo de IA da CyberTech para crianças e adolescentes sobre segurança digital.",
    version="1.0.0"
)

# Habilita CORS para permitir conexões do Spring Boot e frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str


# Carrega o arquivo TXT de conteúdo educativo da CyberTech
BASE_DIR = Path(__file__).resolve().parent
CONTEUDO_PATH = BASE_DIR / "conteudo_educativo.txt"

CONTEUDO_TXT = ""
if CONTEUDO_PATH.exists():
    try:
        CONTEUDO_TXT = CONTEUDO_PATH.read_text(encoding="utf-8")
    except Exception:
        CONTEUDO_TXT = ""

SYSTEM_INSTRUCTIONS = f"""Você é o CyberBot, o assistente educativo oficial da plataforma CyberTech.
Sua missão é ensinar e orientar crianças, adolescentes, escolas e famílias sobre segurança digital, cidadania na internet e uso ético e responsável da Inteligência Artificial.

DIRETRIZES DE COMUNICAÇÃO:
1. Idioma: Português do Brasil (pt-BR) com linguagem simples, acolhedora, direta e encorajadora.
2. Evite jargões técnicos excessivos. Quando precisar usar um termo técnico (como phishing, malware, MFA), explique seu significado de forma acessível e com exemplos do cotidiano (jogos, redes sociais, mensagens).
3. NUNCA CULPABILIZE A VÍTIMA: Se a criança ou jovem relatar que caiu em um golpe, foi vítima de cyberbullying, assédio, chantagem ou vazamento de dados, seja extremamente respeitoso, tranquilize-a e oriente que a culpa nunca é dela.
4. Incentive sempre a procurar um adulto de confiança (pais, responsáveis, professores ou coordenação escolar).
5. Jamais solicite senhas, códigos de verificação (SMS/WhatsApp), documentos ou dados pessoais.
6. Não forneça instruções para invadir computadores, criar vírus, aplicar golpes ou burlar sistemas de segurança.
7. Baseie suas respostas nos seguintes 11 temas principais e tópicos complementares da CyberTech:
   - Tema 00: Ameaças Digitais (diferença entre ameaça, vulnerabilidade e ataque; hábitos preventivos).
   - Tema 01: Golpes Digitais (falsas promoções, lojas falsas, golpes de Pix, perfis falsos, skins em jogos).
   - Tema 02: Cyberbullying (respeito, bloqueio, denúncia, empatia, apoio às vítimas, não compartilhar agressões).
   - Tema 03: Redes Sociais: Uso Seguro (privacidade de perfis, localização, seguidores desconhecidos, equilíbrio).
   - Tema 04: Uso Adequado e Inadequado de IA (alucinações da IA, ética nos estudos, perigos de deepfakes e voz clonada).
   - Tema 05: Tecnologias para Auxiliar Estudos (organizadores, flashcards, mapas mentais, simuladores, aprender a raciocinar).
   - Tema 06: Malwares (vírus, cavalos de Troia, spyware, ransomware; downloads em fontes confiáveis).
   - Tema 07: Phishing (mensagens e páginas falsas que tentam pescar senhas e códigos; conferir remetentes).
   - Tema 08: Golpes de Engenharia Social (manipulação emocional, urgência, medo, pedidos falsos de socorro).
   - Tema 09: Cibersegurança (senhas fortes e exclusivas, autenticação em duas etapas - MFA, backups, atualizações).
   - Tema 10: Fake News e Desinformação (verificação de fontes, imagens fora de contexto, boatos criados por IA).
   - Complementares: Senhas e MFA; Privacidade e pegada digital; Proteção contra assédio e chantagem online (Disque 100 e SaferNet); Ética e cidadania digital.
8. Fontes oficiais recomendadas: CERT.br (cartilha.cert.br), SaferNet Brasil (safernet.org.br / helpline.br) e UNICEF Brasil (unicef.org/brazil/internet-sem-vacilo).

Resumo do material educativo oficial:
{CONTEUDO_TXT[:6000] if CONTEUDO_TXT else "Material CyberTech: Segurança, Cidadania Online e IA Responsável."}
"""

# Base de conhecimento educativo de contingência (quando chave Groq não configurada ou API offline)
CONHECIMENTO_OFFLINE = [
    {
        "keywords": ["phishing", "pescar", "link falso", "site clonado", "link suspeito", "mensagem falsa"],
        "reply": "🎣 **O que é Phishing?**\n\nPhishing é uma cilada em que criminosos criam mensagens, e-mails ou páginas falsas que imitam serviços conhecidos (como jogos, redes sociais ou bancos) para 'pescar' suas senhas, códigos de SMS ou dinheiro.\n\n🛡️ **Como se proteger:**\n• Nunca clique em links que prometem prêmios surpresa, dinheiro fácil ou skins grátis.\n• Confira sempre o endereço (URL) completo na barra do navegador.\n• Serviços legítimos não pedem sua senha nem código de verificação por link inesperado.\n\nSe tiver dúvidas sobre um link, converse com um adulto de confiança antes de clicar!"
    },
    {
        "keywords": ["golpe", "pix", "dinheiro", "promocao", "loja falsa", "sorteio", "premio"],
        "reply": "💳 **Golpes Digitais & Cuidados com Pix**\n\nGolpistas costumam inventar promoções mirabolantes, lojas falsas na internet com preços ridiculamente baixos ou mensagens urgentes se passando por amigos pedindo dinheiro emprestado via Pix.\n\n⚠️ **Sinais de Alerta:**\n• Ofertas boas demais para ser verdade.\n• Pressão para pagar imediatamente antes que a oportunidade 'acabe'.\n• Pedido de transferências para contas com nomes desconhecidos.\n\n💡 **Dica CyberTech:** Sempre confirme pedidos de dinheiro por uma ligação ou pessoalmente com quem pediu. Não pague taxas para resgatar prêmios sorteados que você nunca concorreu!"
    },
    {
        "keywords": ["cyberbullying", "bullying", "xingamento", "ofensa", "exclusao", "humilhacao", "grupo"],
        "reply": "🤝 **Cyberbullying: Respeito e Cidadania Online**\n\nCyberbullying é o uso de mensagens, comentários, piadas ofensivas, montagens ou exclusão intencional de grupos para humilhar e intimidar alguém na internet.\n\n🛡️ **O que fazer se acontecer:**\n1. **Não revide:** responder com raiva só alimenta o conflito.\n2. **Guarde provas:** tire prints da tela contendo a data, horário e perfil do autor.\n3. **Bloqueie e denuncie:** utilize as ferramentas da própria rede ou jogo.\n4. **Peça ajuda:** converse imediatamente com seus pais, responsáveis ou professores.\n\n❤️ **Lembre-se sempre:** A vítima NUNCA é culpada pela agressão. Conte com o apoio de adultos de confiança e canais como o Helpline da SaferNet (helpline.br)!"
    },
    {
        "keywords": ["senha", "senhas", "mfa", "duas etapas", "autenticacao", "proteger conta"],
        "reply": "🔐 **Crie Senhas Blindadas com a CyberTech!**\n\nSua senha é a chave da sua vida digital. Uma senha fraca como '123456' ou o nome do seu cachorro pode ser descoberta em segundos por programas maliciosos.\n\n✨ **Regras de Ouro:**\n• **Seja longo:** use pelo menos 12 caracteres (ex: junte 3 ou 4 palavras que você gosta, como `TubaraoAzulSaltou99!`).\n• **Seja único:** use uma senha diferente para cada conta importante.\n• **Ative o MFA (Verificação em Duas Etapas):** mesmo se alguém descobrir sua senha, precisará do código enviado ao seu aparelho para entrar.\n• **Segredo total:** nunca compartilhe sua senha nem com seus melhores amigos!"
    },
    {
        "keywords": ["ia", "inteligencia artificial", "chatgpt", "gemini", "estudos", "estudo", "trabalho escolar"],
        "reply": "🤖 **Uso Inteligente e Ético da IA nos Estudos**\n\nFerramentas de Inteligência Artificial generativa são assistentes fantásticos para explicar matérias difíceis, sugerir ideias de redação ou criar exercícios de fixação, mas têm limites sérios!\n\n🧠 **Como usar da forma certa:**\n• **Aprenda o método, não apenas a resposta:** peça para a IA explicar o 'passo a passo' de uma equação em vez de só dar o resultado.\n• **Cuidado com 'alucinações':** a IA inventa dados, datas e citações falsas com muita convicção. Sempre verifique fatos em livros e fontes confiáveis!\n• **Não copie e cole:** entregar um trabalho gerado por IA como se fosse seu é plágio e prejudica seu próprio aprendizado.\n• **Privacidade:** nunca insira dados pessoais, documentos ou fotos privadas nos chats de IA."
    },
    {
        "keywords": ["malware", "virus", "trojan", "ransomware", "spyware", "celular travando", "baixar jogo"],
        "reply": "🦠 **Malwares: Programas Maliciosos e Vírus**\n\nMalware é qualquer programa feito para danificar seu celular, tablet ou computador, roubar senhas ou exibir propagandas abusivas.\n\n🛡️ **Dicas de Proteção:**\n• Baixe aplicativos apenas de lojas oficiais (Google Play, App Store, Steam, etc.).\n• Fuja de 'mods', 'cracks' e cheats gratuitos de jogos baixados em sites estranhos.\n• Mantenha o sistema operacional e antivírus sempre atualizados.\n• Se o dispositivo começar a esquentar, travar ou abrir propagandas sozinho, peça ajuda a um responsável para fazer uma verificação completa de segurança!"
    },
    {
        "keywords": ["rede social", "redes sociais", "instagram", "tiktok", "privacidade", "fotos", "localizacao"],
        "reply": "📱 **Uso Seguro de Redes Sociais**\n\nAs redes sociais são ótimas para conversar e se divertir, mas exigem cautela para proteger sua segurança física e digital.\n\n🔒 **Recomendações Essenciais:**\n• **Perfil privado:** prefira manter seu perfil restrito a amigos que você realmente conhece no mundo real.\n• **Cuidado com a localização:** evite postar fotos em tempo real mostrando seu uniforme da escola, fachada da sua casa ou rotina de horários.\n• **Pense antes de postar:** tudo o que cai na internet pode ser salvo e compartilhado por outros, mesmo se você apagar depois.\n• **Desconhecidos:** não aceite pedidos de amizade de perfis misteriosos e nunca combine encontros escondido dos seus pais!"
    },
    {
        "keywords": ["fake news", "noticia falsa", "desinformacao", "boato", "foto falsa"],
        "reply": "🔍 **Como Detectar Fake News e Conteúdos Falsos de IA**\n\nNotícias falsas e montagens criadas com IA são feitas para despertar sentimentos fortes como medo, raiva ou curiosidade exagerada, fazendo as pessoas compartilharem sem pensar.\n\n🕵️‍♂️ **Passo a passo para checar:**\n1. **Leia a matéria inteira**, não apenas a manchete bombástica.\n2. **Confira a fonte:** o site é conhecido e confiável? Há data da publicação?\n3. **Pesquise em outros veículos:** jornais conhecidos confirmam a notícia?\n4. **Desconfie de áudios e vídeos mirabolantes:** hoje em dia vozes e rostos podem ser clonados com IA.\n5. **Na dúvida, NÃO compartilhe!** Quebrar a corrente da desinformação é um ato de cidadania."
    },
    {
        "keywords": ["engenharia social", "manipulacao", "urgencia", "medo", "pressao"],
        "reply": "🎭 **Engenharia Social: A Arte do Engano**\n\nEm vez de invadir um computador com códigos difíceis, o golpista de engenharia social ataca as emoções das pessoas: usa urgência ('sua conta será bloqueada em 5 minutos!'), medo, curiosidade ou finge ser alguém conhecido.\n\n🛡️ **O antídoto da CyberTech:**\n• **Respire fundo e pause:** toda vez que uma mensagem exigir pressa ou pedir segredo absoluto, ligue o radar de desconfiança.\n• **Desconfie e verifique:** faça contato direto com a pessoa ou empresa pelo canal oficial antes de tomar qualquer atitude."
    }
]


def buscar_resposta_educativa(pergunta: str) -> str:
    """Busca resposta adequada no conteúdo educativo oficial para fallback inteligente."""
    p_lower = pergunta.lower()
    
    for item in CONHECIMENTO_OFFLINE:
        for kw in item["keywords"]:
            if re.search(r'\b' + re.escape(kw) + r'\b', p_lower) or kw in p_lower:
                return item["reply"]

    # Resposta educativa padrão acolhedora
    return (
        "Olá! Sou o **CyberBot**, o assistente de segurança digital da **CyberTech**! 🛡️✨\n\n"
        "Estou aqui para te ajudar a navegar na internet com segurança, responsabilidade e inteligência. "
        "Você pode me perguntar sobre:\n\n"
        "• Como se proteger de **golpes e links falsos (phishing)**\n"
        "• Como criar **senhas seguras e ativar verificação em duas etapas**\n"
        "• O que fazer diante de situações de **cyberbullying**\n"
        "• Como usar **redes sociais com privacidade**\n"
        "• Dicas para usar **Inteligência Artificial nos estudos sem colar**\n"
        "• Como identificar **notícias falsas (fake news) e malwares**\n\n"
        "Qual assunto você gostaria de explorar hoje?"
    )


def responder_com_ia(pergunta: str) -> str:
    """Consulta a IA da Groq com instruções pedagógicas da CyberTech ou aciona a base educativa."""
    api_key = os.getenv("GROQ_API_KEY")

    if not api_key or "troque-pela-sua-chave" in api_key.lower():
        # Modo educativo contextual baseado no material oficial da CyberTech
        return buscar_resposta_educativa(pergunta)

    try:
        from langchain_groq import ChatGroq

        model_name = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")
        modelo = ChatGroq(
            model=model_name,
            api_key=api_key,
            temperature=0.4,
            max_retries=2,
        )

        resposta = modelo.invoke([
            ("system", SYSTEM_INSTRUCTIONS),
            ("human", pergunta),
        ])
        return str(resposta.content).strip()
    except Exception as err:
        # Se houver falha temporária de conexão ou chave, responde com a base educativa oficial
        resposta_base = buscar_resposta_educativa(pergunta)
        return (
            f"{resposta_base}\n\n"
            f"*(Nota: Resposta fornecida pela base pedagógica CyberTech offline. "
            f"Para respostas dinâmicas em tempo real, verifique a conexão com a API Groq).* "
        )


@app.get("/")
@app.get("/health")
def health_check():
    return {
        "status": "online",
        "service": "CyberTech Chatbot API",
        "timestamp": datetime.now().isoformat(),
        "knowledge_loaded": bool(CONTEUDO_TXT),
        "groq_configured": bool(os.getenv("GROQ_API_KEY") and "troque" not in os.getenv("GROQ_API_KEY", "").lower())
    }


@app.post("/api/chat")
def conversar(request: ChatRequest) -> dict[str, str]:
    msg = request.message.strip() if request.message else ""
    if not msg:
        return {
            "reply": "Por favor, digite sua dúvida para que eu possa te ajudar!",
            "sender": "CyberBot",
            "timestamp": datetime.now().isoformat()
        }

    reply = responder_com_ia(msg)

    return {
        "reply": reply,
        "sender": "CyberBot",
        "timestamp": datetime.now().isoformat(),
    }
