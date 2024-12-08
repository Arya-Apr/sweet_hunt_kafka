/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/J2EE/EJB30/StatelessEjbClass.java to edit this template
 */
package EJBs;

import java.util.concurrent.CompletableFuture;
import javax.ejb.Stateless;

/**
 *
 * @author Arya
 */
@Stateless
public class RequestHolder {

    private CompletableFuture<String> customerRequestKey = new CompletableFuture<>();
    private CompletableFuture<String> customerRequestValue = new CompletableFuture<>();
    
    
    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")

    public CompletableFuture<String> getCustomerRequestKey() {
        return customerRequestKey;
    }

    public CompletableFuture<String> getCustomerRequestValue() {
        return customerRequestValue;
    }

//    public void reset(String key, String value, RequestHolder holder) {
//        holder.getCustomerRequestKey().complete(key);
//        holder.getCustomerRequestValue().complete(value);
//    }
}
