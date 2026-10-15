package br.edu.extensao.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/** Encaminha as URLs das páginas para a aplicação Angular. */
@Controller
public class PageController {

    @GetMapping({
            "/",
            "/topicos/golpes-digitais",
            "/topicos/cyberbullying",
            "/topicos/redes-sociais",
            "/topicos/malwares",
            "/topicos/uso-inadequado-ia",
            "/topicos/ia-estudos",
            "/golpes-digitais",
            "/cyberbullying",
            "/redes-sociais",
            "/malwares",
            "/uso-inadequado-ia",
            "/ia-estudos",
            "/chatbot",
            "/not-found"
    })
    public String abrirPagina() {
        return "forward:/index.html";
    }
}