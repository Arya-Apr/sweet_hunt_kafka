/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/J2EE/EJB30/StatelessEjbClass.java to edit this template
 */
package EJB;

import Utils.KafkaUtil;
import entities.OrderMaster;
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
import utilities.PHResponseType;

/**
 *
 * @author Arya
 */
@MessageDriven(activationConfig = {
    @ActivationConfigProperty(propertyName = "clientId", propertyValue = "paymentRequestListener"),
    @ActivationConfigProperty(propertyName = "groupIdConfig", propertyValue = "paymentRequestGroup"),
    @ActivationConfigProperty(propertyName = "topics", propertyValue = "payment-request"),
    @ActivationConfigProperty(propertyName = "bootstrapServersConfig", propertyValue = "localhost:9092"),
    @ActivationConfigProperty(propertyName = "autoCommitInterval", propertyValue = "100"),
    @ActivationConfigProperty(propertyName = "retryBackoff", propertyValue = "1000"),
    @ActivationConfigProperty(propertyName = "keyDeserializer", propertyValue = "org.apache.kafka.common.serialization.StringDeserializer"),
    @ActivationConfigProperty(propertyName = "valueDeserializer", propertyValue = "org.apache.kafka.common.serialization.StringDeserializer"),
    @ActivationConfigProperty(propertyName = "pollInterval", propertyValue = "1000"),})
public class PaymentRequestBean implements KafkaListener {

    @EJB
    ResponseHolder holder;

    @EJB
    CustomerResponseHolder custHolder;

    @Resource(lookup = "java:app/kafka/factory")
    private KafkaConnectionFactory kafka;

    @EJB
    PaymentBeanLocal paymentBean;
    private static final Logger LOGGER = Logger.getLogger(PaymentRequestBean.class.getName());

    @OnRecord(topics = {"payment-request"})
    public void paymentRequestListener(ConsumerRecord record) throws InterruptedException, ExecutionException {
//        custHolder.reset();
        String paymentKey = (String) record.key();
        String paymentValue = (String) record.value();
        //holder.resetPayment();
        holder.getPaymentRequestFutureKey().complete(paymentKey);
        holder.getPaymentRequestFutureValue().complete(paymentValue);
        LOGGER.log(Level.INFO, "Order Request.....");
        LOGGER.log(Level.INFO, paymentKey);
        LOGGER.log(Level.INFO, paymentValue);
//        if (custHolder.getCustomerResponseFutureKey().getNow(null) != null) {
//            custHolder.reset();
//        }
        OrderMaster order = KafkaUtil.jsonToOrder(paymentValue);
        PHResponseType phResponseType = paymentBean.doPaymentAndPlaceOrder(order, holder, custHolder, paymentKey);
        LOGGER.log(Level.INFO, "Customer Response from payment Reqyest Listener.....");
        LOGGER.log(Level.INFO, custHolder.getCustomerResponseFutureKey().get());
        LOGGER.log(Level.INFO, KafkaUtil.phResponseTypeToJson(phResponseType));
        try (KafkaConnection con = kafka.createConnection()) {
//            if (holder.getCustomerResponseFutureKey().get().equals(holder.getPaymentRequestFutureKey().get())) {
            LOGGER.log(Level.INFO, "Getting customer key in request litener....");
            if (holder.getPaymentRequestFutureKey().get().equals(holder.getPaymentRequestFutureKey().get())) {
                LOGGER.log(Level.INFO, "Got customer key in request litener....");
                LOGGER.log(Level.INFO, "Sending Message to Payment Response.....");
                LOGGER.log(Level.INFO, "Sending Message to Payment Response with id : " + custHolder.getCustomerResponseFutureKey().get());
                con.send(new ProducerRecord("payment-response", holder.getPaymentRequestFutureKey().get(), KafkaUtil.phResponseTypeToJson(phResponseType)));
                LOGGER.log(Level.INFO, "Message Sent to Payment Response.....");
//                holder.resetPayment(holder.getCustomerResponseFutureKey(), holder.getPaymentRequestFutureValue());
//                holder.resetCustomer();
            } else {
                throw new Exception("Correlation Id Not Matching in Payment Service: " + paymentKey + custHolder.customerResponseFutureKey.get());
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")
}
