import axios from "axios";
const http = axios.create({
    baseURL:"https://my-json-server.typicode.com/DevIOT-AgriPure/agripure-jsondos/Activities/",
    headers: { "Content-type": "application/json" },
})
export class ActivitiesService{
    getActivitiesByProjectId(id){
        return http.get("?projectId="+id);
    }
}