import axios from "axios";
const http = axios.create({
    baseURL:"http://localhost:8080/",
    headers: { "Content-type": "application/json" },
})
export class UserServices{
    getUserById(id){
        return http.get(""+id);
    }
    getAllUsersSpecialists(){
        return http.get("?type=specialist");
    }

    login(email,password){
        return http.post("auth/login",{
            "email": email,
            "password": password,
        })
    }
    register(newUser){
        return http.post("auth/register",{
            "email": newUser.email,
            "password": newUser.password,
            "name": newUser.name,
            "description": ("Hello i am "+newUser.name).toString(),
            "imageUrl": newUser.imageUrl,
            "location": "Lima, Peru",
            "type": newUser.type,
            "planId": 0,
        })
    }
}