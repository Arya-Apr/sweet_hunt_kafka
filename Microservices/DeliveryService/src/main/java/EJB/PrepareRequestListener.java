/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package EJB;

import Utils.KafkaUtil;
import Utils.RequestDto;
import fish.payara.cloud.connectors.kafka.api.KafkaConnection;
import fish.payara.cloud.connectors.kafka.api.KafkaConnectionFactory;
import fish.payara.cloud.connectors.kafka.api.KafkaListener;
import fish.payara.cloud.connectors.kafka.api.OnRecord;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.Resource;
import javax.ejb.ActivationConfigProperty;
import javax.ejb.EJB;
import javax.ejb.MessageDriven;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.producer.ProducerRecord;
import utilities.PHResponseType;

/**
 *
 * @author Arya
 */
@MessageDriven(activationConfig = {
    @ActivationConfigProperty(propertyName = "clientId", propertyValue = "prepareRequestListener"),
    @ActivationConfigProperty(propertyName = "groupIdConfig", propertyValue = "prepareRequestGroup"),
    @ActivationConfigProperty(propertyName = "topics", propertyValue = "prepare-request"),
    @ActivationConfigProperty(propertyName = "bootstrapServersConfig", propertyValue = "localhost:9092"),
    @ActivationConfigProperty(propertyName = "autoCommitInterval", propertyValue = "100"),
    @ActivationConfigProperty(propertyName = "retryBackoff", propertyValue = "1000"),
    @ActivationConfigProperty(propertyName = "keyDeserializer", propertyValue = "org.apache.kafka.common.serialization.StringDeserializer"),
    @ActivationConfigProperty(propertyName = "valueDeserializer", propertyValue = "org.apache.kafka.common.serialization.StringDeserializer"),
    @ActivationConfigProperty(propertyName = "pollInterval", propertyValue = "1000"),})
public class PrepareRequestListener implements KafkaListener {

    @EJB
    DeliveryBeanLocal bean;
    private static final Logger LOGGER = Logger.getLogger(PrepareRequestListener.class.getName());
    
    @Resource(lookup = "java:app/kafka/factory")
    private KafkaConnectionFactory kafka;

    @OnRecord(topics = {"prepare-request"})
    public void consumer(ConsumerRecord record) {
        String key = (String) record.key();
        String value = (String) record.value();
        LOGGER.log(Level.INFO, key);
        LOGGER.log(Level.INFO, value);
        RequestDto dto = KafkaUtil.jsonToPhResponseType(value);
        PHResponseType res = bean.deliveryPersonAllocation(dto.getOrderid(), dto.getOutledtid());
        try(KafkaConnection con = kafka.createConnection()){
            con.send(new ProducerRecord("prepare-response", key, KafkaUtil.responseTypeToJson(res) ));
        }
        catch(Exception ex){
            ex.printStackTrace();
        }
    }
}
