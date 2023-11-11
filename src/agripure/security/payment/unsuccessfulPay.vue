<template>
    <div style="height: 100vh;width: 100%;  display:flex; justify-content: center; align-content: center;align-items: center">
        <pv-card style=" border-radius: 1rem;justify-content: center;width: 50vw;">
            <template #header>
                <div style="background-color: #c92323;border-top-left-radius: 1.3rem;border-top-right-radius: 1.3rem">
                    <div style="height: 100%;padding: 1.5rem 1rem 1rem 1rem">
                        <div style="width: 100%;display: flex;justify-content: center">
                            <i class="pi pi-times-circle" style="font-size: 2.5rem"></i>
                        </div>
                        <div style="width: 100%;display: flex;justify-content: center">
                            <h1 style="color: white;padding-top: 1rem">PAYMENT REJECTED</h1>
                        </div>


                    </div>
                </div>
            </template>
            <template #content>
                <div style="margin: 1rem 2rem">
                    <div style="display: flex;justify-content: left;width: 100%;">
                        <h2>Your payment has been rejected</h2>
                    </div>
                    <div style="justify-content: left;width: 100%">
                        <div style="display: flex;justify-content: left;margin: 1rem 0; width: 100%">
                            <p>Don't worry, you can update your payment plan from your profile</p>
                        </div>
                        <div style="display: flex;justify-content: space-evenly;width: 100%;margin-top: 2rem">
                            <stripe-checkout
                                    ref="checkoutRef"
                                    mode="payment"
                                    :pk="publishableKey"
                                    :line-items="lineItems"
                                    :success-url="successURL"
                                    :cancel-url="cancelURL"
                                    @loading="v => loading = v"
                            />
                            <pv-button style="color: white;border-radius: 0.5rem" severity="secondary" @click="tryAgain()" label="Try again"/>
                            <pv-button style="color: white;border-radius: 0.5rem" severity="secondary" @click="signIn()" label="Login"/>
                        </div>
                    </div>
                </div>
            </template>
        </pv-card>
    </div>

</template>

<script>
import {StripeCheckout} from "@vue-stripe/vue-stripe";

export default {
    name: "unsuccessfulPay",
    components: {StripeCheckout},
    data(){
        return{
            accountId:null,
            publishableKey:'pk_test_51OAzYZHe6cIQ9MTkeu2FPZCcR1olGo1LeCLLkUNdmVvEXBGmIv2Tw3jFWWhqzCDZ6agSJYrMsQhBwCOdEeeMs3zf007fpn6u8x',
            successURL:'http://localhost:5173/successful-pay',
            cancelURL:'http://localhost:5173/unsuccessful-pay',
            loading: false,
            lineItems: [
                {
                    price: 'price_1OB0vHHe6cIQ9MTkbD9RYUzw',
                    quantity: 1,
                },
            ],
        }
    },
    created() {
        //localStorage.setItem("tempUserAccount","1")
        this.accountId=parseInt(localStorage.getItem("tempUserAccount"))
        localStorage.removeItem("tempUserAccount")
    },
    methods:{
        tryAgain(){
            localStorage.setItem("tempUserAccount",this.accountId)
            this.$refs.checkoutRef.redirectToCheckout();
        },
        signIn(){
            this.$router.push("/")
            setTimeout(() => {
                location.reload();

            }, 100);


        }
    }
}
</script>

<style scoped>

</style>