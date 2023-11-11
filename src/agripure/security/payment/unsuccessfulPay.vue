<template>
  PAYMENT FAILED
  tu operacion ha sido rechazada
    puedes
    <pv-button @click="Retry()">Volver a intentarlo</pv-button>
  o
    <pv-button @click="continueFree()">continuar con el plan Free</pv-button>
  No te preocupes, puedes actualizar tu plan de pago desde tu perfil
</template>

<script>
import {SubscriptionService} from "@/services/subscription-service";

export default {
    name: "unsuccessfulPay",
    data(){
        return{
            accountId:null
        }
    },
    created() {
        localStorage.removeItem("tempUserAccount")
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