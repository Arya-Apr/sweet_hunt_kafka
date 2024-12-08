/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package EJB;

import java.util.concurrent.CompletableFuture;
import javax.ejb.Stateless;

/**
 *
 * @author Arya
 */
@Stateless
public class PaymentResponseHolder {
    private CompletableFuture<String> futureValue = new CompletableFuture<>();
    private CompletableFuture<String> futureKey = new CompletableFuture<>();
    public CompletableFuture<String> getFutureValue(){
        return futureValue;
    }
    public CompletableFuture<String> getFutureKey(){
        return futureKey;
    }
    public void reset(){
        futureKey = new CompletableFuture<>();
        futureValue = new CompletableFuture<>();
    }
}
