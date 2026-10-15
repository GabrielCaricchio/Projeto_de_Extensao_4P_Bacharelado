package br.edu.extensao.cultura_digital.controller;

import br.edu.extensao.cultura_digital.model.ChatRequest;
import br.edu.extensao.cultura_digital.model.ChatResponse;
import br.edu.extensao.cultura_digital.service.ChatService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller responsável pelo endpoint do Chatbot interativo.
 */
@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping
    public ResponseEntity<ChatResponse> conversar(@RequestBody(required = false) ChatRequest request) {
        ChatResponse response = chatService.responder(request);
        return ResponseEntity.ok(response);
    }
}

