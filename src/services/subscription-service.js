import axios from "axios";
const http = axios.create({
    baseURL:"http://localhost:8080/api/v1/",
    headers: { "Content-type": "application/json" },
})
export class SubscriptionService{
    createSubscription(subscription){
        return http.post("subscriptions",{
            "accountId": subscription.accountId,
            "validDate": subscription.validDate,
            "active": false
        })
    }
    updateSubscription(accountId,active){
        return http.put("subscriptions",{
            "accountId": accountId,
            "active": active
        })
    }
}