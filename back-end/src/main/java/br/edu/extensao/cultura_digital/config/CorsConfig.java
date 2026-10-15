package br.edu.extensao.cultura_digital.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.List;

@Configuration
public class CorsConfig {

    @Value("${cors.allowed-origins:http://localhost:4200,http://127.0.0.1:4200,http://localhost:80,http://localhost}")
    private String allowedOrigins;

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);

        // Permite as origens do Angular (porta padrão 4200 no ng serve e porta 80 em produção/Nginx)
        List<String> origins = Arrays.stream(allowedOrigins.split(","))
                .map(String::trim)
                .toList();
        config.setAllowedOriginPatterns(origins);

        // Permite todos os métodos HTTP padrão utilizados pelo Angular HttpClient
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"));

        // Permite todos os headers nas requisições do Angular (como Authorization, Content-Type, etc.)
        config.setAllowedHeaders(List.of("*"));

        // Expõe headers para que o Angular (HttpClient) possa acessá-los (ex: Tokens em Authorization, paginação)
        config.setExposedHeaders(List.of("Authorization", "Content-Disposition", "Link", "X-Total-Count"));

        // Cache do resultado de requisições preflight (OPTIONS) por 1 hora (evita requisições repetidas do Angular)
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
