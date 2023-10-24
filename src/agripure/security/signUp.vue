<template>
  <div style="height: 100vh;width: 100%;  display:flex; justify-content: center; align-content: center;align-items: center">
    <pv-card style=" border-radius: 1rem;justify-content: center;width: 50vw;">
      <template #content>
        <div class="content" >
          <div class="steps" style="margin-top: 2rem">
            <router-link style="margin:2rem; text-decoration-line: none;color: white; cursor: pointer " to="/sign-in" >
              Go back
            </router-link>
            <h4 style="margin-left: 2rem;margin-top: 1rem">Paso 1 de 3</h4>
          </div>
          <div class="phrase" style="margin-bottom: 3rem; display: flex; justify-content: center; text-align: center">
            <h1>Select your plan in Agripure</h1>
          </div>
          <div class="plans">
            <div v-show="defaultPlan" class="default">
              <div class="cards">
                <div v-for="plan in plans">
                  <pv-card class="card">
                    <template #header>
                      <div class="solidColor" v-if="plan.name==='Free'" style="background-color: #158001"></div>
                      <div class="solidColor" v-if="plan.name==='Premium'" style="background-color: #ff9914"></div>
                    </template>
                    <template #content>
                      <div class="content">
                        <h2>{{plan.name}}</h2>
                        <div class="visible">
                          <template v-if="plan.name==='Premium'">
                            <div class="usherVisible">
                              <p style="margin-top: 15px">Allows you to have projects and devices</p>
                            </div>
                          </template>
                          <template v-if="plan.name==='Free'">
                            <div class="usherVisible">
                              <p style="margin-top: 15px">Allows you to manage unlimited crops</p>
                            </div>
                          </template>
                        </div>
                        <div class="price">
                          <p style="font-weight: bold; margin-top: 8px">{{ plan.price }} S/</p>
                          <div style="display: table;">
                            <p style="margin: 0;padding: 0 0 0.45rem 0.1rem ;align-items: end ;display: table-cell;vertical-align: bottom; color: darkgrey" >mo*</p>
                          </div>
                        </div>
                        <pv-button class="planButton" v-if="plan.name==='Free'" style="background-color: darkgreen; border-color:darkgreen ;color:white" @click="planSelected('Free')">Elegir</pv-button>
                        <pv-button class="planButton" v-if="plan.name==='Premium'" style="background-color: #ff9914;border-color: #ff9914; color:white" @click="planSelected('Premium')">Elegir</pv-button>
                      </div>
                    </template>
                  </pv-card >
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </pv-card>
  </div>

</template>
<script>
export default {
    name: "sign-up-plans",
    components: {},
    data(){
        return{
            value1: 'Nuestros Planes',
            options: ['Nuestros Planes', 'Plan personalizado'],
            defaultPlan: true,
            customPlan: false,
            customPlanQuantity:1,
            plans:[]
        }
    },
    created() {
        var planFree={} ;
        var planPremium={} ;

      planFree.id=1
      planFree.name="Free"
      planFree.price=180

        planPremium.id=2
        planPremium.name="Premium"
        planPremium.price=400

        this.plans.push(planFree)
        this.plans.push(planPremium)

    },
    methods:{
        changePlan(){
            if(this.defaultPlan===true){
                this.customPlan=true
                this.defaultPlan=false
            }
            else {
                this.customPlan=false
                this.defaultPlan=true
            }
        },
        planSelected(plan){
            this.addTemporaryPlan(plan)
            this.$router.push("/sign-up-register")
        },
        customPlanSelected(plan,roomsQuantity){
            this.customPlanQuantity=roomsQuantity
            this.addTemporaryPlan(plan)
            this.$router.push("/sign-up-register")
        },
        addTemporaryPlan(plan){
            localStorage.setItem("selectedPlan",JSON.stringify(plan))
            if(plan==="Custom"){
                localStorage.setItem("quantityPlan",JSON.stringify(this.customPlanQuantity))
            }
        }
    }
}
</script>
<style scoped>
.solidColor{
    height: 2.5rem;
    border-top-right-radius: 1rem;
    border-top-left-radius: 1rem;
}
.card{
    border-radius: 1rem;
    background-color: white;
    color: black;
    margin-top: 0;
    width: 18em;
}
p {
    line-height: 1.5;
    margin-bottom: 0.5rem
}
.content h2{
    margin-bottom: 0.5rem;
}
.price{
    display: flex;
}
.cards{
    margin-bottom: 3rem;
    display: flex;
    justify-content: space-evenly;
}
.planButton{
    margin-top: .5em;
}
.until{
    margin-top: 6px;
    margin-left: 4px;
}
.usher{
    display: flex;
}
.switch{
    margin-bottom: 3rem;
    display: flex;
    justify-content: center;
}
@media (max-width:1280px){
    .cards{
        margin-bottom: 3rem;
        display: flex;
        justify-content: space-evenly;
    }
    .card{
        border-radius: 1rem;
        background-color: white;
        color: black;
        margin-top: 0;
        width: 14em;
        height: 18em;
    }
    .content h2{
        margin-bottom: 0.5rem;
        margin-top: 0;
    }
    .content p{
        margin-top: 0;
    }
    .until{
        visibility: hidden;
        height: 0;
        width: 0;
        margin: 0;
    }
    .planButton{
        margin-top: 0;
    }
}
@media (max-width:1054px){
    .cards{
        margin-bottom: 3rem;
        display: flex;
        justify-content: space-evenly;
    }
    .card{
        border-radius: 1rem;
        background-color: white;
        color: black;
        margin-top: 0;
        width: 10em;
        height: 14em;
    }
    .content h2{
        margin-bottom: 0.5rem;
        margin-top: 0;
    }
    .content p{
        margin-top: 0;
    }
    .until{
        visibility: hidden;
        height: 0;
        width: 0;
        margin: 0;
    }
    .planButton{
        margin-top: 0;
    }
    .visible{
        visibility: hidden;
        height: 0;
        width: 0;
        margin: 0;
    }
}
@media (max-width:700px){
    .default{
        display: flex;
        justify-content: center;
    }
    .cards{
        margin-bottom: 3rem;
        display: block;
        justify-content: center;
    }
    .card{
        border-radius: 1rem;
        background-color: white;
        color: black;
        margin-bottom: 1.5rem;
        width: 10em;
        height: 14em;
    }
    .content h2{
        margin-bottom: 0.5rem;
        margin-top: 0;
    }
    .content p{
        margin-top: 0;
    }
    .planButton{
        margin-top: 0;
    }
}
@media (max-width:559px){
    .default{
        display: flex;
        justify-content: center;
    }
    .cards{
        margin-bottom: 3rem;
        display: block;
        justify-content: center;
    }
    .switch{
        margin-left: 15vw;
    }
}
</style>