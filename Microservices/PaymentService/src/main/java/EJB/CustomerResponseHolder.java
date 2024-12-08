/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/J2EE/EJB30/StatelessEjbClass.java to edit this template
 */
package EJB;

import java.util.concurrent.CompletableFuture;
import javax.ejb.Stateless;

/**
 *
 * @author Arya
 */
@Stateless
public class CustomerResponseHolder {

    public CompletableFuture<String> customerResponseFutureValue = new CompletableFuture<>();
    public CompletableFuture<String> customerResponseFutureKey = new CompletableFuture<>();

    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")
    public CompletableFuture<String> getCustomerResponseFutureValue() {
        return customerResponseFutureValue;
    }

    public CompletableFuture<String> getCustomerResponseFutureKey() {
        return customerResponseFutureKey;
    }
    
    public void reset(){
        customerResponseFutureKey = new CompletableFuture<>();
        customerResponseFutureValue = new CompletableFuture<>();
    }
    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")
}
