import axios from "axios";
import {PlantServices} from "@/services/plant-service";
const http = axios.create({
    baseURL:"http://localhost:8080/api/v1/",
    headers: { "Content-type": "application/json" },
})
export class CropServices{
    addCrop(token,farmerId,plantId){
        return http.post("crops",{
            "farmerId": farmerId,
            "plantId": plantId
        },{ headers: {"Authorization" : `Bearer ${token}`} })
    }
    getCropsByFarmerId(token,id){
        return http.get("crops/"+id,{ headers: {"Authorization" : `Bearer ${token}`} });
        
    }
    getCropInfoById(token,id){
        return http.get("crops/getCrop/"+id,{ headers: {"Authorization" : `Bearer ${token}`} });

    }
 
}