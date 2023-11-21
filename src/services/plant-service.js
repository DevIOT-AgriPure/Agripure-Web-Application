import axios from "axios";
const http = axios.create({
    baseURL:"http://localhost:8080/api/v1/plant",
    headers: { "Content-type": "application/json" },
})
export class PlantServices{
    getPlantInfoById(id){
        return http.get("/"+id);
    }
    getAllPlants(){
        return http.get("");
    }

}