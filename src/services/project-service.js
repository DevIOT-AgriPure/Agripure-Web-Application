import axios from "axios";
const http = axios.create({
    baseURL:"https://my-json-server.typicode.com/DevIOT-AgriPure/Agripure-JsonDos/projects//",
    headers: { "Content-type": "application/json" },
})
export class ProjectService{
    getProjectByFarmerId(id){
        return http.get("?farmerId="+id);
    }
}