import axios from "axios";
const http = axios.create({
    baseURL:"https://my-json-server.typicode.com/DevIOT-AgriPure/agripure-json/farmerCrop/",
    headers: { "Content-type": "application/json" },
})
export class CropServices{
    getCropsByFarmerId(id){        
        return http.get("?farmerId="+id);
        
    }
 
}