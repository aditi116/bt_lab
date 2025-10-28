package com.credexa.email.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.azure.communication.email.EmailClient;
import com.azure.communication.email.EmailClientBuilder;

@Configuration
@ConditionalOnProperty(name = "azure.communication.enabled", havingValue = "true", matchIfMissing = false)
public class AzureCommunicationConfig {

    @Value("${azure.communication.connection-string:}")
    private String connectionString;

    @Bean
    public EmailClient emailClient() {
        if (connectionString == null || connectionString.isEmpty()) {
            throw new IllegalStateException("Azure Communication connection string is not configured");
        }
        return new EmailClientBuilder()
                .connectionString(connectionString)
                .buildClient();
    }
}
