package com.app.common.event;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Event data for FD account creation
 * Shared across services for event-driven communication
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AccountCreatedEvent {
    
    private Long accountId;
    private String accountNumber;
    private Long customerId;
    private String customerName;
    private BigDecimal principalAmount;
    private BigDecimal maturityAmount;
    private LocalDate maturityDate;
    private String productCode;
    private Integer termMonths;
    private LocalDateTime eventTimestamp;
}
