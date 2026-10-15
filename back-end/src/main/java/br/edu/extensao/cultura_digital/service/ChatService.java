package br.edu.extensao.cultura_digital.service;

import br.edu.extensao.cultura_digital.model.ChatRequest;
import br.edu.extensao.cultura_digital.model.ChatResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientRequestException;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Map;

/**
 * Serviço de apoio ao Chatbot educativo.
 * Fornece respostas imediatas, seguras e adequadas para crianças e jovens sobre segurança na internet.
 */
@Service
public class ChatService {

    private final WebClient chatbotClient;

    public ChatService(@Value("${chatbot.url:http://localhost:8000}") String chatbotUrl) {
        this.chatbotClient = WebClient.builder().baseUrl(chatbotUrl).build();
    }

    public ChatResponse responder(ChatRequest request) {
        String message = request != null && request.message() != null
                ? request.message().trim()
                : "";

        try {
            return chatbotClient.post()
                .uri("/api/chat")
                .bodyValue(Map.of("message", message))
                .retrieve()
                .bodyToMono(ChatResponse.class)
                .block(Duration.ofSeconds(60));
        } catch (WebClientResponseException | WebClientRequestException error) {
            throw new ResponseStatusException(
                HttpStatus.BAD_GATEWAY,
                "O serviço de inteligência artificial está indisponível.",
                error
            );
        }
    }
}

