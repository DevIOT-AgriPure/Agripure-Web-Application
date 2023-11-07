import axios from "axios";
const http = axios.create({
    baseURL:"https://nifty-jet-404014.rj.r.appspot.com/api/v1/messages",
    headers: { "Content-type": "application/json" },
})
export class ChatServices{
    sendMessage(message){
        return http.post("",{
            "contactId": message.contactId,
            "authorId": message.authorId,
            "message": message.message,
            "hour": message.hour
        })
    }
    getChatByContactId(id){
        return http.get("/"+id);
    }

}