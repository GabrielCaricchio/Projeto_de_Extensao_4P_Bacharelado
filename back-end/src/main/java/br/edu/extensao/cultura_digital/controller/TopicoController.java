package br.edu.extensao.cultura_digital.controller;

import br.edu.extensao.cultura_digital.model.Topico;
import br.edu.extensao.cultura_digital.service.TopicoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Controller REST simples e didático para disponibilizar os tópicos educativos.
 */
@RestController
@RequestMapping("/api/topicos")
public class TopicoController {

    private final TopicoService topicoService;

    public TopicoController(TopicoService topicoService) {
        this.topicoService = topicoService;
    }

    @GetMapping
    public ResponseEntity<List<Topico>> listarTodos() {
        return ResponseEntity.ok(topicoService.listarTodos());
    }

    @GetMapping("/{slug}")
    public ResponseEntity<Topico> buscarPorSlug(@PathVariable String slug) {
        return topicoService.buscarPorSlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

