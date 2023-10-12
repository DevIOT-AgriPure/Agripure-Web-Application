import axios from "axios";
const http = axios.create({
    baseURL:"https://my-json-server.typicode.com/DevIOT-AgriPure/agripure-json/Contacts/",
    headers: { "Content-type": "application/json" },
})
export class ContactServices{
    getContactsForFarmer(id){
        return http.get("?farmerId="+id);
    }
    getContactById(id){
        return http.get(""+id);
    }

}