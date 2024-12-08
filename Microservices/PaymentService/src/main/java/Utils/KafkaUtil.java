/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Utils;

import entities.OrderMaster;
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import utilities.PHResponseType;

/**
 *
 * @author Arya
 */
public class KafkaUtil {

    public static String phResponseTypeToJson(PHResponseType dto) {
        Jsonb json = JsonbBuilder.create();
        return json.toJson(dto);
    }
    public static OrderMaster jsonToOrder(String order){
        Jsonb jsonb =JsonbBuilder.create();
        return jsonb.fromJson(order, OrderMaster.class);
    }
    public static double jsonToDouble(String custValue){
        return Double.parseDouble(custValue);
    }
}
