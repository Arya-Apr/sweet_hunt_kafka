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
public class ResponseHolder {

    public CompletableFuture<String> paymentRequestFutureValue = new CompletableFuture<>();
    public CompletableFuture<String> paymentRequestFutureKey = new CompletableFuture<>();


    public CompletableFuture<String> getPaymentRequestFutureValue() {
        return paymentRequestFutureValue;
    }

    public CompletableFuture<String> getPaymentRequestFutureKey() {
        return paymentRequestFutureKey;
    }

//    public void resetPayment(CompletableFuture<String> ck, CompletableFuture<String> cv) {
//        ck.complete();
//    }
//     public void resetCustomer() {
//        customerResponseFutureValue = new CompletableFuture<>();
//        customerResponseFutureKey = new CompletableFuture<>();
//    }
}
