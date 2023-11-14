import axios from "axios";
const http = axios.create({
    baseURL:"https://my-json-server.typicode.com/DevIOT-AgriPure/Agripure-JsonDos/",
    headers: { "Content-type": "application/json" },
})
export class DeviceServices{
    getAllDevicesByUserId(id){
        return http.get("Devices/?farmerId_like="+id);
    }
    getDeviceValueById(id){
        return http.get("DevicesValue/"+id);
    }

}