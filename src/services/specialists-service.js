import axios from "axios";
const http = axios.create({
    baseURL:"http://nifty-jet-404014.rj.r.appspot.com/api/v1/profiles/",
    headers: { "Content-type": "application/json" },
})
export class SpecialistServices{
    getSpecialistInformationByUserId(id){
        return http.get("getSpecialistInfoByAccountId/"+id);
    }

}