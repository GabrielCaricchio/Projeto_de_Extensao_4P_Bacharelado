package br.edu.extensao.backend.model;

public record ChatResponse(
        String reply,
        String sender,
        String timestamp
) {}

