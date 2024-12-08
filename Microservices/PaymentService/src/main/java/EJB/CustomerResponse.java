/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package EJB;

import fish.payara.cloud.connectors.kafka.api.KafkaListener;
import fish.payara.cloud.connectors.kafka.api.OnRecord;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.ActivationConfigProperty;
import javax.ejb.EJB;
import javax.ejb.MessageDriven;
import org.apache.kafka.clients.consumer.ConsumerRecord;

/**
 *
 * @author Arya
 */
@MessageDriven(activationConfig = {
    @ActivationConfigProperty(propertyName = "clientId", propertyValue = "customerResponseListener"),
    @ActivationConfigProperty(propertyName = "groupIdConfig", propertyValue = "customerResponseGroup"),
    @ActivationConfigProperty(propertyName = "topics", propertyValue = "user-response"),
    @ActivationConfigProperty(propertyName = "bootstrapServersConfig", propertyValue = "localhost:9092"),
    @ActivationConfigProperty(propertyName = "autoCommitInterval", propertyValue = "100"),
    @ActivationConfigProperty(propertyName = "retryBackoff", propertyValue = "1000"),
    @ActivationConfigProperty(propertyName = "keyDeserializer", propertyValue = "org.apache.kafka.common.serialization.StringDeserializer"),
    @ActivationConfigProperty(propertyName = "valueDeserializer", propertyValue = "org.apache.kafka.common.serialization.StringDeserializer"),
    @ActivationConfigProperty(propertyName = "pollInterval", propertyValue = "1000"),})
public class CustomerResponse implements KafkaListener {

    @EJB
    CustomerResponseHolder holder;
    private static final Logger LOGGER = Logger.getLogger(CustomerResponse.class.getName());

    @OnRecord(topics = {"user-response"})
    public void userResponse(ConsumerRecord record) {
        if (holder.getCustomerResponseFutureKey().getNow(null) != null) {
            holder.reset();
        }
        String userResponseValue = (String) record.value();
        String userResponseKey = (String) record.key();
        LOGGER.log(Level.INFO, "USER RESPONSE Listener....");
        LOGGER.log(Level.INFO, userResponseValue);
        LOGGER.log(Level.INFO, userResponseKey);
        holder.getCustomerResponseFutureKey().complete(userResponseKey);
        holder.getCustomerResponseFutureValue().complete(userResponseValue);
    }
}
