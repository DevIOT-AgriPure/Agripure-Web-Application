import axios from "axios";
const http = axios.create({
    baseURL:"http://localhost:8080/",
    headers: { "Content-type": "application/json" },
})
export class UserServices{
    getUserById(id){
        return http.get("api/v1/profiles/getProfile/"+id);
    }
    getUserByEmail(token,email){
        return http.get("api/v1/profiles/getProfileByEmail/"+email,{ headers: {"Authorization" : `Bearer ${token}`} });
    }
    getAllUsersSpecialists(token){
        return http.get("api/v1/profiles/getSpecialists");
    }

    login(email,password){
        return http.post("auth/login",{
            "email": email,
            "password": password,
        })
    }
    registerFarmer(newUser){
        return http.post("auth/registerFarmer",{
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
    registerSpecialist(newUser){
        return http.post("auth/registerSpecialist",{
            "email": newUser.email,
            "password": newUser.password,
            "name": newUser.name,
            "description": ("Hello i am "+newUser.name).toString(),
            "imageUrl": newUser.imageUrl,
            "location": "Lima, Peru",
            "type": newUser.type,
            "expertise": "Especialista en crecimiento de plantas",
            "contactEmail": newUser.email,
            "areasOfFocus": "Gestión de cultivos, Salud del suelo, Control de plagas",
            "planId": 0,
        })
    }
}