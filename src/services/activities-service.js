import axios from "axios";
const http = axios.create({
    baseURL:"https://nifty-jet-404014.rj.r.appspot.com/api/v1/activities",
    headers: { "Content-type": "application/json" },
})
export class ActivitiesService{
    setActivityCompleted(id){
        return http.put("/completeActivity/"+id);
    }
    getActivitiesByProjectId(token,id){
        return http.get("/activityByProjectId/"+id,);
    }
    addActivity(activity){
        return http.post("",{
            "projectId": activity.projectId,
            "title": activity.title,
            "description": activity.description,
            "date": activity.date
        })
    }
}