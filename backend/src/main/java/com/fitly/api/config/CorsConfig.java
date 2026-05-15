package com.fitly.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();

        // Permite requisições do frontend React (Vite dev server)
        config.setAllowedOrigins(List.of("http://localhost:5173"));

        // Métodos HTTP permitidos
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));

        // Headers permitidos nas requisições
        config.setAllowedHeaders(List.of(
            "Authorization",
            "Content-Type",
            "X-Refresh-Token",
            "Accept"
        ));

        // Permite envio de credenciais (cookies, headers de autenticação)
        config.setAllowCredentials(true);

        // Tempo de cache da resposta de pre-flight em segundos
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}
