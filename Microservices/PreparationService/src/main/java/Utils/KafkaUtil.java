/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Utils;

import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import utilities.PHResponseType;

/**
 *
 * @author Arya
 */
public class KafkaUtil {
    public static String phResponseTypeToJson(RequestDto dto){
        Jsonb json = JsonbBuilder.create();
        return json.toJson(dto);
    }
    public static PHResponseType jsonToPhResponseType(String json){
        Jsonb jsonb =JsonbBuilder.create();
        return jsonb.fromJson(json, PHResponseType.class);
    }
}
