import axios from "axios";
const http = axios.create({
    baseURL:"https://my-json-server.typicode.com/DevIOT-AgriPure/agripure-json/users/",
    headers: { "Content-type": "application/json" },
})
export class UserServices{
    getUserById(id){
        return http.get(""+id);
    }
    getAllUsersSpecialists(){
        return http.get("?type=specialist");
    }

}