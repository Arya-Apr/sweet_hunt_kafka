/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/J2EE/EJB30/StatelessEjbClass.java to edit this template
 */
package EJBs;

import Utils.KafkaUtils;
import fish.payara.cloud.connectors.kafka.api.KafkaConnection;
import fish.payara.cloud.connectors.kafka.api.KafkaConnectionFactory;
import fish.payara.cloud.connectors.kafka.api.KafkaListener;
import fish.payara.cloud.connectors.kafka.api.OnRecord;
import java.util.concurrent.ExecutionException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.Resource;
import javax.ejb.ActivationConfigProperty;
import javax.ejb.EJB;
import javax.ejb.MessageDriven;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.producer.ProducerRecord;

/**
 *
 * @author Arya
 */
@MessageDriven(activationConfig = {
    @ActivationConfigProperty(propertyName = "clientId", propertyValue = "customerRequestListener"),
    @ActivationConfigProperty(propertyName = "groupIdConfig", propertyValue = "customerRequestGroup"),
    @ActivationConfigProperty(propertyName = "topics", propertyValue = "user-request"),
    @ActivationConfigProperty(propertyName = "bootstrapServersConfig", propertyValue = "localhost:9092"),
    @ActivationConfigProperty(propertyName = "bootstrapServersConfig", propertyValue = "localhost:9092"),
    @ActivationConfigProperty(propertyName = "autoCommitInterval", propertyValue = "100"),
    @ActivationConfigProperty(propertyName = "retryBackoff", propertyValue = "1000"),
    @ActivationConfigProperty(propertyName = "keyDeserializer", propertyValue = "org.apache.kafka.common.serialization.StringDeserializer"),
    @ActivationConfigProperty(propertyName = "valueDeserializer", propertyValue = "org.apache.kafka.common.serialization.StringDeserializer"),
    @ActivationConfigProperty(propertyName = "pollInterval", propertyValue = "1000"),})
public class CustomerRequestListener implements KafkaListener {

    @EJB
    Customer_EJBLocal cust;

    @EJB
    RequestHolder holder;

    @Resource(lookup = "java:app/kafka/factory")
    private KafkaConnectionFactory kafka;
    private static final Logger LOGGER = Logger.getLogger(CustomerRequestListener.class.getName());

    @OnRecord(topics = "user-request")
    public void consumer(ConsumerRecord record) throws InterruptedException, ExecutionException {
//        holder.reset((String)record.key(), (String) record.value(), holder);
        String customerRequestValue = (String) record.value();
        String customerRequestKey = (String) record.key();
        LOGGER.log(Level.INFO, "CUSTOMER SERVICE...");
        LOGGER.log(Level.INFO, customerRequestValue);
        LOGGER.log(Level.INFO, customerRequestKey);
//        holder.getCustomerRequestKey().complete(customerRequestKey);
//        holder.getCustomerRequestValue().complete(customerRequestValue);
        Double customerResponse = cust.getUserCredits(customerRequestValue);
        LOGGER.log(Level.INFO, Double.toString(customerResponse));
        System.out.println(customerResponse);
        try (KafkaConnection con = kafka.createConnection()) {
            con.send(new ProducerRecord("user-response", customerRequestKey, KafkaUtils.doubleToJson(customerResponse)));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")
}
