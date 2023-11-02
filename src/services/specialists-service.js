import axios from "axios";
const http = axios.create({
    baseURL:"http://localhost:8080/api/v1/profiles/",
    headers: { "Content-type": "application/json" },
})
export class SpecialistServices{
    getSpecialistInformationByUserId(id){
        return http.get("getSpecialistInfoByAccountId/"+id);
    }

}