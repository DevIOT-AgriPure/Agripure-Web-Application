import axios from "axios";
const http = axios.create({
    baseURL:"http://localhost:8080/api/v1/devices",
    headers: { "Content-type": "application/json" },
})
export class DeviceServices{
    getDeviceInfoByCropId(id){
        return http.get("/cropId/"+id);
    }
    getDeviceById(id){
        return http.get("/"+id);
    }
    getAllDevicesByUserId(id){
        return http.get("/getDevicesByFarmerId/"+id);
    }
    getDeviceValueById(id){
        return http.get("/temperaturehumidity/"+id);
    }
    setDeviceStatus(device){
        return http.post("/status",{
            "deviceId": device.id,
            "newStatus": !device.active
        })
    }
    updateDeviceById(device){
        return http.put("/updateDeviceById",{
            "id": device.id,
            "name": device.name,
            "cropName": device.cropName,
            "projectId": device.projectId,
            "active": device.active,
            "activeNotification": device.activeNotification
        })
    }
    setDeviceNotification(device){
        return http.post("/notification",{
            "deviceId": device.id,
            "newStatus": !device.activeNotification
        })
    }
    postDevice(device){
        return http.post("",{
            "name": device.name,
            "model": device.model,
            "category": device.category,
            "cropName": device.cropName,
            "cropId": device.cropId,
            "farmerId": device.farmerId,
            "projectId": device.projectId
        })
    }

}