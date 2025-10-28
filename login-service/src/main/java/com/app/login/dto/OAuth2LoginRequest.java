package com.app.login.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for OAuth2 login request from frontend
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OAuth2LoginRequest {
    private String provider; // "google", "microsoft", "github", etc.
    private String idToken;  // ID token from OAuth2 provider
    private String accessToken; // Access token from OAuth2 provider
    private String email;
    private String name;
    private String picture;
}
