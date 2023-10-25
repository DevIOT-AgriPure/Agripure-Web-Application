import axios from "axios";
const http = axios.create({
    baseURL:"https://my-json-server.typicode.com/DevIOT-AgriPure/Agripure-JsonTres/notifications/",
    headers: { "Content-type": "application/json" },
})
export class NotificationService{
    getAllNotificationByUserId(userId){
        return http.get("?userId="+userId);
    }
    getAllNotificationBySpecialistId(userId){
        return http.get("?specialistId="+userId);
    }

}