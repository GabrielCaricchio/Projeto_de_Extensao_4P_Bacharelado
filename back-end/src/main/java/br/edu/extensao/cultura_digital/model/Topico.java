package br.edu.extensao.cultura_digital.model;

import java.util.List;

/**
 * Representa um tópico de conscientização sobre cultura e segurança digital.
 * Modelado como record Java 21: direto, imutável e sem código boilerplate.
 */
public record Topico(
        String id,
        String slug,
        String titulo,
        String subtitulo,
        String icone,
        String corDestaque,
        String resumo,
        String introducao,
        List<String> pontosChave,
        List<DicaSeguranca> dicas,
        List<QuizPergunta> quiz
) {}

