package com.app.customer.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.customer.dto.CreateCustomerRequest;
import com.app.customer.dto.Customer360Response;
import com.app.customer.dto.CustomerClassificationResponse;
import com.app.customer.dto.CustomerResponse;
import com.app.customer.dto.UpdateCustomerRequest;
import com.app.customer.service.CustomerService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * REST controller for customer operations
 */
@RestController
@RequestMapping  // Empty mapping since context-path is already /api/customer
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Customer Management", description = "APIs for managing customer information")
@SecurityRequirement(name = "Bearer Authentication")
public class CustomerController {

    private final CustomerService customerService;

    /**
     * Lab L4 Requirement: Get all customers (ADMIN or CUSTOMER_MANAGER only)
     */
    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CUSTOMER_MANAGER')")
    @Operation(summary = "Get all customers", description = "Retrieve all customers (Admin/Customer Manager only)")
    public ResponseEntity<List<CustomerResponse>> getAllCustomers() {
        log.info("Received request to get all customers");
        List<CustomerResponse> customers = customerService.getAllCustomers();
        return ResponseEntity.ok(customers);
    }

    /**
     * Lab L4 Requirement: Get own profile (authenticated user's customer profile)
     */
    @GetMapping("/profile")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get own customer profile", description = "Retrieve the authenticated user's customer profile")
    public ResponseEntity<CustomerResponse> getOwnProfile(Authentication authentication) {
        String username = authentication.getName();
        log.info("User '{}' requesting their own customer profile", username);
        CustomerResponse response = customerService.getCustomerProfileByUsername(username);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    @Operation(summary = "Create new customer", description = "Create a new customer profile. Can be accessed publicly for self-registration or by authenticated users. Admins can create for any user.")
    public ResponseEntity<CustomerResponse> createCustomer(
            @Valid @RequestBody CreateCustomerRequest request,
            Authentication authentication) {
        
        // Handle public registration (no authentication) vs authenticated creation
        String authenticatedUsername = null;
        boolean isAdmin = false;
        
        if (authentication != null && authentication.isAuthenticated()) {
            authenticatedUsername = authentication.getName();
            isAdmin = authentication.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .anyMatch(role -> role.equals("ROLE_ADMIN"));
            
            log.info("Authenticated user '{}' (Admin: {}) creating customer profile", 
                    authenticatedUsername, isAdmin);
        } else {
            log.info("Public user creating customer profile (self-registration)");
        }
        
        CustomerResponse response = customerService.createCustomer(request, authenticatedUsername, isAdmin);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_CUSTOMER_MANAGER')")
    @Operation(summary = "Get customer by ID", description = "Retrieve customer details by customer ID (Admin/Customer Manager only)")
    public ResponseEntity<CustomerResponse> getCustomerById(@PathVariable Long id) {
        log.info("Received request to get customer by ID: {}", id);
        CustomerResponse response = customerService.getCustomerById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_CUSTOMER_MANAGER')")
    @Operation(summary = "Get customer by user ID", description = "Retrieve customer details by user ID from login-service (Admin/Customer Manager only)")
    public ResponseEntity<CustomerResponse> getCustomerByUserId(@PathVariable Long userId) {
        log.info("Received request to get customer by user ID: {}", userId);
        CustomerResponse response = customerService.getCustomerByUserId(userId);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_CUSTOMER_MANAGER')")
    @Operation(summary = "Update customer", description = "Update customer information (Admin/Customer Manager only, or own profile)")
    public ResponseEntity<CustomerResponse> updateCustomer(
            @PathVariable Long id,
            @Valid @RequestBody UpdateCustomerRequest request,
            Authentication authentication) {
        
        String authenticatedUsername = authentication.getName();
        boolean isAdmin = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch(role -> role.equals("ROLE_ADMIN"));
        
        log.info("User '{}' (Admin: {}) updating customer ID: {}", authenticatedUsername, isAdmin, id);
        CustomerResponse response = customerService.updateCustomer(id, request, authenticatedUsername, isAdmin);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}/classification")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_CUSTOMER_MANAGER', 'ROLE_FD_MANAGER')")
    @Operation(summary = "Get customer classification", description = "Get customer classification for FD rate determination")
    public ResponseEntity<CustomerClassificationResponse> getCustomerClassification(@PathVariable Long id) {
        log.info("Received request to get classification for customer ID: {}", id);
        CustomerClassificationResponse response = customerService.getCustomerClassification(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}/360-view")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_CUSTOMER_MANAGER')")
    @Operation(summary = "Get 360-degree customer view", description = "Get comprehensive customer overview including FD accounts (Admin/Customer Manager only)")
    public ResponseEntity<Customer360Response> getCustomer360View(@PathVariable Long id) {
        log.info("Received request to get 360-degree view for customer ID: {}", id);
        Customer360Response response = customerService.getCustomer360View(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/health")
    @Operation(summary = "Health check", description = "Check if the customer service is running", security = {})
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Customer Service is UP");
    }
}
