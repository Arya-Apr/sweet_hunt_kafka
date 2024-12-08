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
public class Holder {

    private CompletableFuture<String> preparationResponseValue = new CompletableFuture<>();
    private CompletableFuture<String> preparationResponseKey = new CompletableFuture<>();

    public CompletableFuture<String> getPreparationResponseValue() {
        return preparationResponseValue;
    }

    public CompletableFuture<String> getPreparationResponseKey() {
        return preparationResponseKey;
    }

    public void reset() {
        preparationResponseValue = new CompletableFuture<>();
        preparationResponseKey = new CompletableFuture<>();
    }

}
