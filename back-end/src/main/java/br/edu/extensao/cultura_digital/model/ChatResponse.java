package br.edu.extensao.cultura_digital.model;

public record ChatResponse(
        String reply,
        String sender,
        String timestamp
) {}

