package br.edu.extensao.backend.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.view.RedirectView;
import org.springframework.web.util.UriComponentsBuilder;

@Controller
public class PageController {

    private final String frontendUrl;

    public PageController(@Value("${frontend.url:http://localhost:4200}") String frontendUrl) {
        this.frontendUrl = frontendUrl;
    }

    @GetMapping({
            "/",
            "/topicos",
            "/topicos/**",
            "/ameacas-digitais",
            "/golpes-digitais",
            "/cyberbullying",
            "/redes-sociais",
            "/uso-inadequado-ia",
            "/ia-estudos",
            "/tecnologias-estudos",
            "/malwares",
            "/phishing",
            "/engenharia-social",
            "/ciberseguranca",
            "/fake-news",
            "/senhas-mfa",
            "/privacidade",
            "/protecao-assedio",
            "/etica-cidadania",
            "/chatbot",
            "/quiz",
            "/faq",
            "/canais-ajuda",
            "/not-found"
    })
    public RedirectView redirecionarParaFrontend(HttpServletRequest request) {
        String destination = UriComponentsBuilder.fromUriString(frontendUrl)
                .path(request.getRequestURI())
                .query(request.getQueryString())
                .build(true)
                .toUriString();
        return new RedirectView(destination);
    }
}
