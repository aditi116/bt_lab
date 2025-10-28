package com.app.login.service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.common.util.JwtUtil;
import com.app.login.dto.LoginResponse;
import com.app.login.dto.OAuth2LoginRequest;
import com.app.login.entity.Role;
import com.app.login.entity.User;
import com.app.login.repository.RoleRepository;
import com.app.login.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Service for handling OAuth2/SSO authentication
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class OAuth2Service {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final JwtUtil jwtUtil;

    @Value("${jwt.expiration:3600000}")
    private Long jwtExpiration;

    /**
     * Process OAuth2 login and return JWT token
     * Creates user if not exists, otherwise logs in existing user
     */
    @Transactional
    public LoginResponse processOAuth2Login(OAuth2LoginRequest request) {
        log.info("Processing OAuth2 login for email: {} from provider: {}", request.getEmail(), request.getProvider());

        // Find or create user
        User user = userRepository.findByEmail(request.getEmail())
            .orElseGet(() -> createOAuth2User(request));

        // Update last login time
        user.setLastLoginTime(LocalDateTime.now());
        userRepository.save(user);

        // Generate JWT token
        List<String> roles = user.getRoles().stream()
            .map(role -> role.getName().name())
            .collect(Collectors.toList());

        String token = jwtUtil.generateToken(user.getEmail(), roles);

        // Build response
        return LoginResponse.builder()
            .token(token)
            .tokenType("Bearer")
            .userId(user.getId())
            .username(user.getUsername())
            .email(user.getEmail())
            .roles(new HashSet<>(roles))
            .loginTime(LocalDateTime.now())
            .expiresIn(jwtExpiration)
            .build();
    }

    /**
     * Create new user from OAuth2 profile
     */
    private User createOAuth2User(OAuth2LoginRequest request) {
        log.info("Creating new user from OAuth2 profile: {}", request.getEmail());

        User user = new User();
        user.setEmail(request.getEmail());
        user.setUsername(request.getEmail().split("@")[0]); // Use email prefix as username
        user.setOauth2Provider(request.getProvider());
        user.setOauth2ProviderId(request.getEmail()); // Use email as OAuth2 ID
        user.setEnabled(true);
        user.setEmailVerified(true); // OAuth2 emails are pre-verified
        user.setAccountNonLocked(true);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        // Assign default ROLE_USER
        Role userRole = roleRepository.findByName(Role.RoleName.ROLE_USER)
            .orElseThrow(() -> new RuntimeException("Default ROLE_USER not found"));
        
        Set<Role> roles = new HashSet<>();
        roles.add(userRole);
        user.setRoles(roles);

        return userRepository.save(user);
    }

    /**
     * Verify OAuth2 token with provider (optional, for enhanced security)
     * This would call Google/Microsoft APIs to validate the token
     */
    public boolean verifyOAuth2Token(String provider, String token) {
        // TODO: Implement actual token verification with OAuth2 provider
        // For Google: https://www.googleapis.com/oauth2/v3/tokeninfo?id_token={token}
        // For now, we trust the frontend verification
        log.info("OAuth2 token verification for provider: {} (currently trusting client)", provider);
        return true;
    }
}
