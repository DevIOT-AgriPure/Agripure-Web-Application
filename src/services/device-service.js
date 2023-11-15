import axios from "axios";
const http = axios.create({
    baseURL:"http://localhost:8080/api/v1/devices",
    headers: { "Content-type": "application/json" },
})
export class DeviceServices{
    getAllDevicesByUserId(id){
        return http.get("/getDevicesByFarmerId/"+id);
    }
    getDeviceValueById(id){
        return http.get("/temperaturehumidity/"+id);
    }
    postDevice(device){
        return http.post("",{
            "name": device.name,
            "model": device.model,
            "category": device.category,
            "cropName": device.cropName,
            "farmerId": device.farmerId,
            "projectId": device.projectId
        })
    }

}