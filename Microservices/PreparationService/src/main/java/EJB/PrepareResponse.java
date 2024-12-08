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
    @ActivationConfigProperty(propertyName = "clientId", propertyValue = "prepareResponseListener"),
    @ActivationConfigProperty(propertyName = "groupIdConfig", propertyValue = "prepareResponseGroup"),
    @ActivationConfigProperty(propertyName = "topics", propertyValue = "prepare-response"),
    @ActivationConfigProperty(propertyName = "bootstrapServersConfig", propertyValue = "localhost:9092"),
    @ActivationConfigProperty(propertyName = "autoCommitInterval", propertyValue = "100"),
    @ActivationConfigProperty(propertyName = "retryBackoff", propertyValue = "1000"),
    @ActivationConfigProperty(propertyName = "keyDeserializer", propertyValue = "org.apache.kafka.common.serialization.StringDeserializer"),
    @ActivationConfigProperty(propertyName = "valueDeserializer", propertyValue = "org.apache.kafka.common.serialization.StringDeserializer"),
    @ActivationConfigProperty(propertyName = "pollInterval", propertyValue = "1000"),})
public class PrepareResponse implements KafkaListener {

    @EJB
    Holder holder;
    private static final Logger LOGGER = Logger.getLogger(PrepareResponse.class.getName());

    @OnRecord(topics = {"prepare-response"})
    public void consumer(ConsumerRecord record) {
        String key = (String) record.key();
        String value = (String) record.value();
        LOGGER.log(Level.INFO, key);
        LOGGER.log(Level.INFO, value);
        holder.getPreparationResponseKey().complete(key);
        holder.getPreparationResponseValue().complete(value);
    }
}
