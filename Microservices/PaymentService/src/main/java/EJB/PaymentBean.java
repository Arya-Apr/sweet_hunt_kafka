/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/J2EE/EJB30/StatelessEjbClass.java to edit this template
 */
package EJB;

import Utils.KafkaUtil;
import client.IClientCustomer;
import client.IClientOrder;
import entities.OrderMaster;
import fish.payara.cloud.connectors.kafka.api.KafkaConnection;
import fish.payara.cloud.connectors.kafka.api.KafkaConnectionFactory;
import java.io.Console;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.Resource;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import utilities.PHResponseType;

/**
 *
 * @author krdmo
 */
@Stateless
public class PaymentBean implements PaymentBeanLocal {

    // @PersistenceContext(unitName = "orderpu")
    @PersistenceContext(unitName = "ordersyspu")

    EntityManager em;

    @Inject
    @RestClient
    IClientOrder cli;

//    @EJB
//    CustomerResponseHolder custHolder;
    @Resource(lookup = "java:app/kafka/factory")
    private KafkaConnectionFactory kafka;

    @Inject
    @RestClient
    IClientCustomer custCli;

    private static final Logger LOGGER = Logger.getLogger(PaymentBean.class.getName());

    @Override
    public PHResponseType doPaymentAndPlaceOrder(OrderMaster order, ResponseHolder holder, CustomerResponseHolder custHolder, String paymentRequestKey) {
        PHResponseType phr = new PHResponseType();
        if (order != null) {
            LOGGER.log(Level.INFO, "Order not null " + order.getId());
        }
        try {
            if (order.getPaymentMethod().equals("CREDIT")) {
                try (KafkaConnection con = kafka.createConnection()) {
//                    custHolder.reset();
//                    String paymentRequestKey = holder.getPaymentRequestFutureKey().get();
                    if (custHolder.getCustomerResponseFutureKey().getNow(null) != null) {
                        custHolder.reset();
                    }
                    LOGGER.log(Level.INFO, "Payment Bean Logger.....");
                    LOGGER.log(Level.INFO, paymentRequestKey);
                    con.send(new ProducerRecord("user-request", paymentRequestKey, order.getUserId().getId()));
                    //Below is the api call
                    //Double userCredits = custCli.getUserCredits(order.getUserId().getId());
                    String customerResponseKey = custHolder.getCustomerResponseFutureKey().get();
                    String customerResponseValue = custHolder.getCustomerResponseFutureValue().get();
                    LOGGER.log(Level.INFO, "Customer Res in Payment Bean Logger.....");
                    LOGGER.log(Level.INFO, customerResponseKey);
                    LOGGER.log(Level.INFO, customerResponseValue);
                    if (customerResponseKey.equals(paymentRequestKey)) {
                        LOGGER.log(Level.INFO, "Keys are Equal" + "Customer: " + customerResponseKey + "Payment: " + paymentRequestKey);
                        Double userCredits = Double.valueOf(KafkaUtil.jsonToDouble(customerResponseValue));
                        System.out.println(userCredits);
                        if (userCredits < order.getPayableAmount()) {
                            phr.setStatus(405);
                            LOGGER.log(Level.INFO, "User Credits Are less than payable amount");

                            phr.setMessage("Payment Failed !! You don't have enough credits to Pay.");
                            return phr;
                        } else {
                            phr.setStatus(200);
                            LOGGER.log(Level.INFO, "User Credits Are There");

                            phr.setMessage("Payment Successfull");
                            return phr;
                        }
                    } else {
                        throw new Exception("Correlation Id from Customer Service does not match : " + paymentRequestKey);
                    }
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
                return phr;
            } else {
                phr.setStatus(200);
                phr.setMessage("Payment Successfull");
                return phr;
            }
        } catch (Exception ex) {
            // phr.setMessage("Payment Failed due to some Exception.");
            phr.setMessage("request to customer service failed " + ex.getMessage().toString());
            phr.setStatus(404);
            return phr;
        }
    }

    @Override
    public OrderMaster getOrderById(String id) {
        OrderMaster order = (OrderMaster) em.createNamedQuery("OrderMaster.findById").setParameter("id", id).getSingleResult();
        return order;

    }

    @Override
    public Boolean updateOrderStatus(OrderMaster order, String status) {
        if (em.contains(order)) {
            order.setOrderStatus(status);
            em.merge(order);
            return true;
        }
        return false;
    }
}
