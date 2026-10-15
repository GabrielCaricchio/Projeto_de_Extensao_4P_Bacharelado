package br.edu.extensao.cultura_digital.model;

import java.util.List;

/**
 * Pergunta interativa de quiz para fixação de conceitos sem persistência em banco.
 */
public record QuizPergunta(
        String pergunta,
        List<String> opcoes,
        int indiceCorreto,
        String explicacao
) {}

