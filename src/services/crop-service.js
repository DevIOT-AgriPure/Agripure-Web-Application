import axios from "axios";
import {PlantServices} from "@/services/plant-service";
const http = axios.create({
    baseURL:"https://my-json-server.typicode.com/DevIOT-AgriPure/agripure-json/farmerCrop/",
    headers: { "Content-type": "application/json" },
})
export class CropServices{
    getCropsByFarmerId(id){        
        return http.get("?farmerId="+id);
        
    }
    getCropInfoById(id){
        return http.get(""+id);

    }
 
}