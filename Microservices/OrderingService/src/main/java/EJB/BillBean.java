/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/J2EE/EJB30/StatelessEjbClass.java to edit this template
 */
package EJB;

import Utils.PHResponseTypeDtoUtil;
import client.IClientPayment;
import entities.Items;
import entities.OrderLine;
import entities.OrderMaster;
import entities.Outlets;
import entities.Users;
import fish.payara.cloud.connectors.kafka.api.KafkaConnection;
import fish.payara.cloud.connectors.kafka.api.KafkaConnectionFactory;
import java.io.Console;
import java.text.DecimalFormat;
import utilities.Enums.OrderStatus;
import utilities.Utils;
import java.util.Date;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.Resource;
import javax.ejb.EJB;
import javax.ejb.Stateless;
//import com.mycompany.Modules.OrderStatus;
import javax.inject.Inject;
import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.core.Response;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.eclipse.microprofile.metrics.annotation.Counted;
import org.eclipse.microprofile.metrics.annotation.Metered;
import org.eclipse.microprofile.metrics.annotation.Timed;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.json.JSONObject;
import utilities.PHResponseType;

@Stateless
public class BillBean implements BillBeanLocal {

    // @PersistenceContext(unitName = "orderpu")
    @PersistenceContext(unitName = "ordersyspu")
    EntityManager em;

    @Resource(lookup = "java:app/kafka/factory")
    private KafkaConnectionFactory kafka;

    @Inject
    @RestClient
    IClientPayment cli;

    @Inject
    MetricRegistryManager metricRegistryManager;
    private static final Logger LOGGER = Logger.getLogger(BillBean.class.getName());

    @EJB
    PaymentResponseHolder paymentResponseHolder;

    @Timed(name = "addOrder.timer",
            absolute = true,
            displayName = "addOrder Timer",
            description = "Time taken by AddOrder.")

    @Metered(name = "addOrder.Meter",
            displayName = "addOrder call frequency",
            description = "Rate the throughput of addOrder.")

    @Counted(name = "addOrder",
            absolute = true,
            displayName = "addOrder call count",
            description = "Number of times we added order to the database")

    @Override
    public PHResponseType addOrder(JsonObject data) {
        PHResponseType phr1 = new PHResponseType();
        System.out.println("data " + data);
        OrderMaster order = new OrderMaster();
        try {
            JsonArray jsonarr = data.getJsonArray("items");
            double itemTotal = 0.00;

            order.setId(Utils.getUUID());

            order.setOrderStatus(OrderStatus.PREPARING.toString());

            order.setPaymentMethod(data.getString("paymentMethod"));
            order.setDeliveryCharge(25d);

            order.setOrderDate(new Date());
            Users user = (Users) em.createNamedQuery("Users.findById").setParameter("id", data.getString("userId")).getSingleResult();
            order.setUserId(user);

            Outlets outlet = (Outlets) em.createNamedQuery("Outlets.findById").setParameter("id", data.getString("outletId")).getSingleResult();
            order.setOutletId(outlet);
            System.out.println("" + order);
            em.persist(order);

//            DecimalFormat decfor = new DecimalFormat("0.00");
            for (int i = 0; i < jsonarr.size(); i++) {
                OrderLine lineItem = new OrderLine();
                JSONObject object = new JSONObject(jsonarr.getJsonObject(i).toString());
                int quantity = object.getInt("quantity");

                lineItem.setId(Utils.getUUID());
                lineItem.setQuantity(quantity);
                Items item = em.find(Items.class, object.getString("itemId"));
                lineItem.setItemId(item);
//                double tax = Math.round(item.getTaxSlabId().getPercentage() / 100);
//                Double taxVal = Double.valueOf(String.format(".2f", tax));
//                itemTotal += quantity * (item.getPrice() + item.getPrice() * taxVal);

//                Double tax = item.getPrice() * q * (item.getTaxSlabId().getPercentage() / 100);
//                itemTotal += item.getPrice() * q;
//                itemTotal += tax;
                lineItem.setOrderId(order);
                System.out.println("" + lineItem);

                em.persist(lineItem);

            }
            itemTotal = Double.parseDouble(data.getString("amount"));
            order.setAmount(itemTotal - 25);
            order.setPayableAmount(itemTotal);
            String orderJson = PHResponseTypeDtoUtil.orderToJson(order);
            String correlationId = UUID.randomUUID().toString();
            //  System.out.println("Before calling doPaymentAndPlaceOrder");
            try (KafkaConnection con = kafka.createConnection()) {
                LOGGER.log(Level.INFO, "Sending Message to Payment Request....");
                con.send(new ProducerRecord("payment-request", correlationId, orderJson));
//                if (paymentResponseHolder.getFutureKey().getNow(null) != null) {
//                    paymentResponseHolder.reset();
//                }
//                paymentResponseHolder.reset();
//                LOGGER.log(Level.INFO, "Payment Holder Reset....");
                if (correlationId.equals(correlationId)) {
                    LOGGER.log(Level.INFO, "Future Key of response is: " + paymentResponseHolder.getFutureKey().get());
                    PHResponseType phr = PHResponseTypeDtoUtil.jsonToPhResponseType(paymentResponseHolder.getFutureValue().get());
//            PHResponseType phr = (PHResponseType) response.readEntity(PHResponseType.class);
                    Double updatedCredits = 0d;
                    if (phr.getStatus() != 200) {
                        order.setOrderStatus(OrderStatus.CANCELLED.toString());
                        if (phr.getStatus() >= 400) {
                            metricRegistryManager.increment4xCount();
                            metricRegistryManager.get4xCount();
                        }
                    } else {
                        Users updateUserCreadits = order.getUserId();
                        updatedCredits += updateUserCreadits.getCredits() - itemTotal;
                        updateUserCreadits.setCredits(updatedCredits);
                        phr.setMessage(updatedCredits.toString());
                        em.merge(updateUserCreadits);
                        em.merge(order);
                    }
                    return phr;
                } else {
                    throw new Exception("Could Not Find the Response With Correlation Id: " + correlationId + "Response ID: " + paymentResponseHolder.getFutureKey().get());
                }
            } 
//            catch (Exception ex) {
//                Logger.getLogger(ex.getMessage());
//            }
            //below is the api request
            //Response response = cli.doPaymentAndPlaceOrder(order);
            // System.out.println("After calling doPaymentAndPlaceOrder");
        } catch (Exception ex) {
            ex.printStackTrace();
            order.setOrderStatus(OrderStatus.CANCELLED.toString());
            metricRegistryManager.increment4xCount();//one of service call failed as it is unavailable
            metricRegistryManager.get4xCount();
            phr1.setStatus(404);
            phr1.setMessage("Order Placing Failed " + ex.getMessage());
            return phr1;
        }
    }
}
