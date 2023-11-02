import axios from "axios";
const http = axios.create({
    baseURL:"http://localhost:8080/api/v1/projects",
    headers: { "Content-type": "application/json" },
})
export class ProjectService{
    createProject(project){
        return http.post("",{
            "farmerId": project.farmerId,
            "specialistId": project.specialistId,
            "isStarted": project.isProjectStarted,
            "cropId": project.cropId,
            "name": project.name,
            "description": project.description,
            "startDate": project.startDate,
            "endDate": project.endDate
        })
    }
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