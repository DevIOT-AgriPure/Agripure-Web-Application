import axios from "axios";
const http = axios.create({
    baseURL:"https://my-json-server.typicode.com/DevIOT-AgriPure/Agripure-JsonDos/Messages/",
    headers: { "Content-type": "application/json" },
})
export class ChatServices{
    getChatByContactId(id){
        return http.get("?contactId="+id);
    }

}