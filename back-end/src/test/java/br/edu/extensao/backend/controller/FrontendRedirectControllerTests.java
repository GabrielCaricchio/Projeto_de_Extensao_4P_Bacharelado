package br.edu.extensao.backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = PageController.class)
@TestPropertySource(properties = "frontend.url=http://localhost:4200")
class FrontendRedirectControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void rootRedirectsToAngularFrontend() throws Exception {
        mockMvc.perform(get("/"))
                .andExpect(status().is3xxRedirection())
                .andExpect(header().string("Location", "http://localhost:4200/"));
    }

    @Test
    void applicationRouteRedirectsToAngularAndPreservesQuery() throws Exception {
        mockMvc.perform(get("/topicos/golpes").queryParam("tema", "phishing"))
                .andExpect(status().is3xxRedirection())
                .andExpect(header().string(
                        "Location",
                        "http://localhost:4200/topicos/golpes?tema=phishing"
                ));
    }
}
