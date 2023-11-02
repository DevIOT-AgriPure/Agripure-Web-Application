import axios from "axios";
const http = axios.create({
    baseURL:"http://localhost:8080/api/v1/activities/",
    headers: { "Content-type": "application/json" },
})
export class ActivitiesService{
    getActivitiesByProjectId(token,id){
        return http.get("activityByProjectId/"+id,{ headers: {"Authorization" : `Bearer ${token}`} });
    }
}