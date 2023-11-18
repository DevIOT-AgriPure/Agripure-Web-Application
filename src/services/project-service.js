import axios from "axios";
const http = axios.create({
    baseURL:"http://localhost:8080/api/v1/projects",
    headers: { "Content-type": "application/json" },
})
export class ProjectService{
    starProject(projectId){
        return http.put("/startProject/"+projectId)
    }
    addDeviceProject(projectId){
        return http.put("/AddDeviceProject/"+projectId)
    }
    createProject(project){
        return http.post("",{
            "farmerId": project.farmerId,
            "specialistId": project.specialistId,
            "isStarted": project.projectStarted,
            "cropId": project.cropId,
            "device": project.device,
            "name": project.name,
            "description": project.description,
            "startDate": project.startDate,
            "endDate": project.endDate
        })
    }
    getProjectByFarmerId(id){
        return http.get("/projectsByFarmerId/"+id);
    }
    getProjectsBySpecialistId(id){
        return http.get("/projectsBySpecialistId/"+id);
    }
    getProjectById(id){
        return http.get(""+id);
    }
    getProjectByCropId(cropId){
        return http.get("/getProjectByCropId/"+cropId)
    }
}