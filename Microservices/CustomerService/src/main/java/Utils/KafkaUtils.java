/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Utils;

import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;

/**
 *
 * @author Arya
 */
public class KafkaUtils {
    public static String doubleToJson(Double value){
        Jsonb json = JsonbBuilder.create();
        return json.toJson(value);
    }
}
