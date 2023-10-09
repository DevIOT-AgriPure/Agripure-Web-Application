import axios from "axios";
const http = axios.create({
    baseURL:"https://my-json-server.typicode.com/DevIOT-AgriPure/agripure-json/Specialist/",
    headers: { "Content-type": "application/json" },
})
export class SpecialistServices{
    getSpecialistInformationByUserId(id){
        return http.get("?userId="+id);
    }

}