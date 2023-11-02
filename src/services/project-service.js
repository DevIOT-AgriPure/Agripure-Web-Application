import axios from "axios";
const http = axios.create({
    baseURL:"http://localhost:8080/api/v1/projects",
    headers: { "Content-type": "application/json" },
})
export class ProjectService{
    getProjectByFarmerId(id){
        return http.get("?farmerId="+id);
    }
    getProjectsBySpecialistId(id){
        return http.get("/projectsByFarmerId/"+id);
    }
    getProjectById(id){
        return http.get(""+id);
    }
}