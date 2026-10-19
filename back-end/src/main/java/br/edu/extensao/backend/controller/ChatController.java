package br.edu.extensao.backend.controller;

import br.edu.extensao.backend.model.ChatRequest;
import br.edu.extensao.backend.model.ChatResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientRequestException;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final WebClient chatbotClient;

    public ChatController(@Value("${chatbot.url:http://localhost:8000}") String chatbotUrl) {
        this.chatbotClient = WebClient.builder().baseUrl(chatbotUrl).build();
    }

    @PostMapping
    public ResponseEntity<ChatResponse> conversar(@RequestBody(required = false) ChatRequest request) {
        String message = request != null && request.message() != null
                ? request.message().trim()
                : "";

        try {
            ChatResponse response = chatbotClient.post()
                    .uri("/api/chat")
                    .bodyValue(Map.of("message", message))
                    .retrieve()
                    .bodyToMono(ChatResponse.class)
                    .block(Duration.ofSeconds(60));

            return ResponseEntity.ok(response);
        } catch (WebClientResponseException | WebClientRequestException error) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_GATEWAY,
                    "O serviço de inteligência artificial está indisponível.",
                    error
            );
        }
    }
}

