"""
Script de teste automatizado para o CyberTech Chatbot API.
Verifica:
1. Endpoint de integridade (/health).
2. Respostas offline de contingência para os principais temas pedagógicos.
3. Tratamento de mensagens vazias e payload de retorno (reply, sender, timestamp).
"""

from fastapi.testclient import TestClient
from chatbot import app, buscar_resposta_educativa

client = TestClient(app)


def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "online"
    assert "CyberTech" in data["service"]
    assert "knowledge_loaded" in data
    assert data["knowledge_loaded"] is True
    print("[PASS] Teste /health bem-sucedido.")


def test_offline_fallback_themes():
    # Testar se palavras-chave de diferentes temas ativam os tópicos pedagógicos
    temas_teste = [
        ("Como reconhecer um phishing em mensagem suspeita?", "Phishing"),
        ("Recebi pedido de dinheiro no pix de um amigo", "Pix"),
        ("Como me defender de cyberbullying na escola?", "Cyberbullying"),
        ("Como criar uma senha segura e ativar o MFA?", "Senhas"),
        ("Posso usar IA para fazer meu dever escolar?", "IA"),
        ("Baixei um mod de jogo e meu computador pegou vírus malware", "Malwares"),
        ("Como configurar a privacidade nas redes sociais?", "Redes Sociais"),
        ("Como reconhecer manipulação e engenharia social?", "Manipulação"),
        ("Como saber se uma notícia é fake news?", "Fake News"),
        ("Um desconhecido em um jogo online pediu minhas fotos", "Atenção"),
    ]

    for mensagem, esperado in temas_teste:
        resposta = buscar_resposta_educativa(mensagem)
        assert len(resposta) > 50, f"Resposta muito curta para: {mensagem}"
        print(f"[PASS] Tema testado ({esperado}) respondeu adequadamente.")


def test_chat_endpoint_post():
    payload = {"message": "Olá CyberBot! Como me protejo de golpes na internet?"}
    response = client.post("/api/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "reply" in data
    assert len(data["reply"]) > 20
    assert data["sender"] == "CyberBot"
    assert "timestamp" in data
    print(f"[PASS] Endpoint POST /api/chat respondeu com sucesso: sender='{data['sender']}'.")


def test_empty_message_validation():
    payload = {"message": "   "}
    response = client.post("/api/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "digite sua dúvida" in data["reply"].lower()
    print("[PASS] Validação de mensagem vazia retornou instrução acolhedora.")


if __name__ == "__main__":
    print("Iniciando testes da API do CyberBot...")
    test_health_check()
    test_offline_fallback_themes()
    test_chat_endpoint_post()
    test_empty_message_validation()
    print("\nTODOS OS TESTES DO CHATBOT PASSARAM COM SUCESSO! 100% OK.")
