import axios from "axios";
const http = axios.create({
    baseURL:"https://nifty-jet-404014.rj.r.appspot.com/api/v1/",
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
    getSubscriptionById(accountId){
        return http.get("subscriptions/getSubscription/"+accountId,)
    }
    updateSubscription(accountId,active){
        return http.put("subscriptions",{
            "accountId": accountId,
            "active": active
        })
    }
}