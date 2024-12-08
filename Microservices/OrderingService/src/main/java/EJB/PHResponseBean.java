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
    @ActivationConfigProperty(propertyName = "clientId", propertyValue = "paymentResponseListener"),
    @ActivationConfigProperty(propertyName = "groupIdConfig", propertyValue = "paymentResponseGroup"),
    @ActivationConfigProperty(propertyName = "topics", propertyValue = "payment-response"),
    @ActivationConfigProperty(propertyName = "bootstrapServersConfig", propertyValue = "localhost:9092"),
    @ActivationConfigProperty(propertyName = "autoCommitInterval", propertyValue = "100"),
    @ActivationConfigProperty(propertyName = "retryBackoff", propertyValue = "1000"),
    @ActivationConfigProperty(propertyName = "keyDeserializer", propertyValue = "org.apache.kafka.common.serialization.StringDeserializer"),
    @ActivationConfigProperty(propertyName = "valueDeserializer", propertyValue = "org.apache.kafka.common.serialization.StringDeserializer"),
    @ActivationConfigProperty(propertyName = "pollInterval", propertyValue = "1000"),})
public class PHResponseBean implements KafkaListener {

    @EJB
    PaymentResponseHolder paymentResponseHolder;
    private static final Logger LOGGER = Logger.getLogger(PHResponseBean.class.getName());

    @OnRecord(topics = {"payment-response"})
    public void consumers(ConsumerRecord record) {
//        paymentResponseHolder.reset();
//        if (paymentResponseHolder.getFutureKey().getNow(null) != null) {
//            paymentResponseHolder.reset();
//        }
        String value = (String) record.value();
        String key = (String) record.key();
        LOGGER.log(Level.INFO, "Response Logs in Order Service.....");
        LOGGER.log(Level.INFO, value);
        LOGGER.log(Level.INFO, key);
        paymentResponseHolder.getFutureKey().complete(key);
        paymentResponseHolder.getFutureValue().complete(value);
    }
}
