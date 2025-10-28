package com.app.login.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.login.dto.LoginResponse;
import com.app.login.dto.OAuth2LoginRequest;
import com.app.login.service.OAuth2Service;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * OAuth2/SSO Authentication Controller
 */
@RestController
@RequestMapping("/oauth2")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "OAuth2 Authentication", description = "SSO/OAuth2 login endpoints")
@CrossOrigin(
    origins = {"http://localhost:3000", "http://localhost:5173"},
    allowedHeaders = "*",
    methods = {org.springframework.web.bind.annotation.RequestMethod.GET, 
               org.springframework.web.bind.annotation.RequestMethod.POST, 
               org.springframework.web.bind.annotation.RequestMethod.OPTIONS},
    allowCredentials = "true"
)
public class OAuth2Controller {

    private final OAuth2Service oauth2Service;

    @PostMapping("/login")
    @Operation(summary = "OAuth2/SSO Login", description = "Authenticate user with OAuth2 provider (Google, Microsoft, etc.)")
    public ResponseEntity<LoginResponse> oauth2Login(@Valid @RequestBody OAuth2LoginRequest request) {
        log.info("OAuth2 login request for provider: {}, email: {}", request.getProvider(), request.getEmail());
        
        LoginResponse response = oauth2Service.processOAuth2Login(request);
        
        log.info("OAuth2 login successful for user: {}", response.getEmail());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/google/callback")
    @Operation(summary = "Google OAuth2 Callback", description = "Callback endpoint for Google OAuth2")
    public ResponseEntity<String> googleCallback(@RequestParam String code) {
        log.info("Google OAuth2 callback received with code: {}", code);
        // This endpoint can be used for server-side OAuth2 flow if needed
        return ResponseEntity.ok("OAuth2 callback received");
    }

    @GetMapping("/health")
    @Operation(summary = "OAuth2 Health Check")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("OAuth2 service is running");
    }
}
