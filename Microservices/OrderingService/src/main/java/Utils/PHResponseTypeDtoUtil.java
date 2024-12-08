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
public class PHResponseTypeDtoUtil {
    public static String phResponseTypeToJson(PHResponseType dto){
        Jsonb json = JsonbBuilder.create();
        return json.toJson(dto);
    }
    public static PHResponseType jsonToPhResponseType(String json){
        Jsonb jsonb =JsonbBuilder.create();
        return jsonb.fromJson(json, PHResponseType.class);
    }
    public static String orderToJson(OrderMaster order){
        Jsonb json = JsonbBuilder.create();
        return json.toJson(order);
    }
}
