<template>
  PAYMENT SUCCESS
  tu pago ha sido procesado correctamente
  Tu subscripcion esta activa hasta el 11/12/2023
  <pv-button @click="signIn()">Iniciar sesion</pv-button>
</template>

<script>

import {ref} from "vue";
import {SubscriptionService} from "@/services/subscription-service";

export default {
    name: "successfulPay",
    data(){
        return{
            accountId:null
        }
    },
    created() {
        this.accountId=parseInt(localStorage.getItem("tempUserAccount"))
        new SubscriptionService().updateSubscription(this.accountId,true).then(res=>{

        })
    },
    methods:{
      signIn(){
          this.$router.push("/")
      }
    }
}
</script>

<style scoped>

</style>