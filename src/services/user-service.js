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
        return http.get("api/v1/profiles/getProfileByEmail/"+email,);
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
            "description": newUser.description,
            "imageUrl": newUser.imageUrl,
            "location": "Lima, Peru",
            "type": newUser.type,
            "planId": newUser.plan,
        })
    }
    registerSpecialist(newUser){
        return http.post("auth/registerSpecialist",{
            "email": newUser.email,
            "password": newUser.password,
            "name": newUser.name,
            "description": newUser.description,
            "imageUrl": newUser.imageUrl,
            "location": "Lima, Peru",
            "type": newUser.type,
            "expertise": newUser.expertise,
            "contactEmail": newUser.contactEmail,
            "areasOfFocus": newUser.areasOfFocus,
            "planId": 0,
        })
    }
}