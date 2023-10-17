import axios from "axios";
const http = axios.create({
    baseURL:"https://my-json-server.typicode.com/DevIOT-AgriPure/Agripure-JsonDos/Devices/",
    headers: { "Content-type": "application/json" },
})
export class DeviceServices{
    getAllDevicesByUserId(id){
        return http.get("?farmerId_like="+id);
    }
}