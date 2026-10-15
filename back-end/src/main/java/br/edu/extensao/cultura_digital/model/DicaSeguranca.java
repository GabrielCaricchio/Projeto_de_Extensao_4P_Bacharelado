package br.edu.extensao.cultura_digital.model;

/**
 * Representa uma dica ou alerta de segurança digital.
 */
public record DicaSeguranca(
        String titulo,
        String descricao,
        String icone
) {}

