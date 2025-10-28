package com.app.customer.event;

import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import com.app.common.event.AccountCreatedEvent;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Event listener for consuming FD account creation events
 * This demonstrates event consumption pattern for customer service
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class AccountCreatedEventListener {

    /**
     * Listen for account creation events and process them asynchronously
     * This can be used to:
     * - Update customer account summary
     * - Trigger notifications
     * - Update customer reports
     * - Generate statements
     */
    @Async
    @EventListener
    public void handleAccountCreatedEvent(AccountCreatedEvent event) {
        try {
            log.info("🎯 EVENT CONSUMED: Account created for customer {} - Account: {}", 
                    event.getCustomerId(), event.getAccountNumber());
            
            // Process the event
            processAccountCreation(event);
            
            log.info("✅ Successfully processed account creation event for customer: {}", 
                    event.getCustomerId());
            
        } catch (Exception e) {
            log.error("❌ Failed to process account creation event: {}", e.getMessage(), e);
        }
    }
    
    /**
     * Process account creation - Can be used for:
     * - Updating customer details with new account info
     * - Generating reports
     * - Creating statements
     * - Sending notices
     */
    private void processAccountCreation(AccountCreatedEvent event) {
        log.info("📊 Processing account creation for customer: {}", event.getCustomerId());
        log.info("   Account Number: {}", event.getAccountNumber());
        log.info("   Principal Amount: ₹{}", event.getPrincipalAmount());
        log.info("   Maturity Amount: ₹{}", event.getMaturityAmount());
        log.info("   Maturity Date: {}", event.getMaturityDate());
        log.info("   Product: {}", event.getProductCode());
        log.info("   Term: {} months", event.getTermMonths());
        
        // TODO: Implement business logic here:
        // 1. Update customer account count
        // 2. Generate welcome statement
        // 3. Update customer reports
        // 4. Send notices to customer
        // 5. Update customer name/address for statements
        
        log.info("✅ Account creation processed - Ready for Reports, Statements, and Notices");
    }
}
