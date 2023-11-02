<template>
  <div style="height: 100vh;width: 100%;  display:flex; justify-content: center; align-content: center;align-items: center">
    <div v-if="currentPath==='Types'">
      <pv-card style=" border-radius: 1rem;justify-content: center;width: 50vw;">
        <template #content>
          <div style="display: flex;justify-content: center;margin: 2rem 0">
            <h1 style="color: white;">SELECT USER TYPE</h1>
          </div>
          <div class="plan-cards">
            <pv-card
                class="type-card"
                :class="{ selected: selectedUserType === 'farmer' }"
                @click="selectUserType('farmer')"
            >
              <template #content>
                <div style="display: flex;justify-content: center;margin: 2rem 0">
                  <img src="../../assets/farmer_logo.png" alt="" style="height: 150px;">
                </div>
                <div style="display: flex;justify-content: center">
                  <h2 style="color: white">Farmer</h2>
                </div>
              </template>
            </pv-card>

            <pv-card
                class="type-card"
                :class="{ selected: selectedUserType === 'specialist' }"
                @click="selectUserType('specialist')"
            >
              <template #content>
                <div style="display: flex;justify-content: center;margin: 2rem 0">
                  <img src="../../assets/specialist_logo.png" alt="" style="height: 150px;">
                </div>
                <div style="display: flex;justify-content: center">
                  <h2 style="color: white">Specialist</h2>
                </div>
              </template>
            </pv-card>
          </div>
          <div style="display: flex;justify-content: space-evenly">
            <pv-button style="border-radius: 1rem;color: white;background-color: #131313;border-color: #131313" @click="goBack('sign-in')" label="Back"/>
            <pv-button :disabled="!isUserTypeSelected" style="border-radius: 1rem;color: white;background-color: darkgreen;border-color: darkgreen" @click="nextPath()" label="Next"/>
          </div>
        </template>
      </pv-card>
    </div>
    <div v-if="currentPath==='Plans'">
      <pv-card style=" border-radius: 1rem;justify-content: center;width: 50vw;">
        <template #content>
          <div class="content" >
            <div class="steps" style="margin-top: 2rem">
              <p style="margin-left:2rem; text-decoration-line: none;color: white; cursor: pointer " @click="goBack('Types')" >
                Go back
              </p>
              <h4 style="margin-left: 2rem;margin-top: 1rem;margin-bottom: 2rem">Step 1 of 3</h4>
            </div>
            <div class="phrase" style="margin-bottom: 3rem; display: flex; justify-content: center; text-align: center">
              <h1>Select your plan in Agripure</h1>
            </div>
            <div class="plans">
              <div v-show="defaultPlan" class="default">
                <div class="plan-cards">
                  <div v-for="plan in plans">
                    <pv-card class="plan-card">
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
                            <p style="font-weight: bold; margin-top: 8px" v-if="plan.name!=='Free'">{{ plan.price }} S/</p>
                            <p style="font-weight: bold; margin-top: 8px" v-if="plan.name==='Free'">‎ </p>
                            <div style="display: table;">
                              <p style="margin: 0;padding: 0 0 0.45rem 0.1rem ;align-items: end ;display: table-cell;vertical-align: bottom; color: darkgrey" v-if="plan.name!=='Free'">mo*</p>
                              <p style="margin: 0;padding: 0 0 0.45rem 0.1rem ;align-items: end ;display: table-cell;vertical-align: bottom; color: darkgrey" v-if="plan.name==='Free'">‎ </p>
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
    <div v-if="currentPath==='Form'">
      <div class="card" style="height: 98vh ">
        <pv-card style=" border-radius: 1rem;justify-content: center;">
          <template #content>
            <div class="content" style="width: 50vw">
              <p style="margin:2rem 2rem 1rem 2rem; text-decoration-line: none;color: white; cursor: pointer " @click="goBack('Plans')"  >
                Go back
              </p>
              <div class="steps" >
                <h4 style="margin: 0 0 0 2rem">Step 2 of 3</h4>
              </div>
              <div class="phrase" style="margin-bottom: 1rem; display: flex; justify-content: center">
                <h1>Create an account</h1>
              </div>
              <div class="card" style="justify-content: center;">
                <div class="register" style="width: 30vw">
                  <div class="form" >
                    <div class="nombre" style="display: flex; justify-content: center; margin: 1rem 0">
                      <pv-input id="name" class="form-input" @input="actualizarEstadoBoton()" placeholder="Name" style="border-radius: 1rem" v-model="user.name" maxlength="56" @keypress="validarNombre($event)"></pv-input>
                    </div>
                    <div class="email" style="display: flex; justify-content: center; margin: 1rem 0">
                      <pv-input id="email" class="form-input" @input="actualizarEstadoBoton()" placeholder="Email" style="border-radius: 1rem" maxlength="256" v-model="user.email"></pv-input>
                    </div>
                    <div class="password" style="display: flex; justify-content: center; margin: 1rem 0">
                      <pv-input id="password" type="password" class="form-input" @input="actualizarEstadoBoton()" placeholder="Password" style="border-radius: 1rem" v-model="user.password"></pv-input>
                    </div>
                  </div>
                  <div class="footer">
                    <div class="form-Text" style="margin: 3rem 0">
                      By creating my account I accept the terms of service and policy of
                      <br>Agripure
                    </div>
                    <div class="buttons" >
                      <pv-button :disabled="!esFormularioCompleto" style="border-radius: 1rem;color: white;background-color: darkgreen;border-color: darkgreen" @click="addTemporaryUser()">Create account</pv-button >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </pv-card>
      </div>
    </div>
    <div v-if="currentPath==='Payment'">
      <div class="card" style="height: 98vh ">
        <pv-card style=" border-radius: 1rem;justify-content: center;">
          <template #content>
            <div class="content" style="width: 50vw">
              <p style="margin:2rem 2rem 1rem 2rem; text-decoration-line: none;color: white; cursor: pointer " @click="goBack('Form')"  >
                Go back
              </p>
              <div class="steps" >
                <h4 style="margin: 0 0 0 2rem">Step 3 of 3</h4>
              </div>
              <div class="phrase" style="margin-bottom: 1rem; display: flex; justify-content: center">
                <h1>Payment method</h1>
              </div>
              <div style=" display: flex; justify-content: center;align-content: center">
                <div>

                </div>
              </div>
              <div class="footer">
                <div class="buttons" >
                    <pv-button style="border-radius: 1rem;color: white;background-color: darkgreen;border-color: darkgreen" @click="register()">Iniciar subscripcion</pv-button >
                </div>
              </div>
            </div>
          </template>
        </pv-card>
      </div>
    </div>
  </div>

</template>
<script>
import {UserServices} from "@/services/user-service";

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
            plans:[],
            currentPath:"",
          user:{
            name:null,
            email:null,
            password:null,
          },
          esFormularioCompleto: false,
          isUserTypeSelected:false,
          selectedUserType: null,
          userPlanSelected:"none",
        }
    },
    created()
    {   this.currentPath="Types"
        var planFree={} ;
        var planPremium={} ;
      planFree.id=1
      planFree.name="Free"
      planFree.price=20
        planPremium.id=2
        planPremium.name="Premium"
        planPremium.price=20
        this.plans.push(planFree)
        this.plans.push(planPremium)

    },
    methods:{
      register(){
          let newUser={}
          newUser.name=this.user.name
          newUser.email=this.user.email
          newUser.password=this.user.password
          newUser.imageUrl="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
          newUser.location="Lima, Peru"
          newUser.type=this.selectedUserType.toUpperCase()
          newUser.plan=this.userPlanSelected
          new UserServices().register(newUser).then(response=>{
              this.$router.push("/sign-in")
          }).catch(error=>{
              this.$toast.add({severity:'error', summary: 'Error', detail:'Server error', life: 3000});
          })

        console.log(newUser)
      },
      nextPath(){
        if(this.selectedUserType==="farmer"){
          this.currentPath='Plans'
        }else {
          this.currentPath="Form"
        }
      },
      selectUserType(userType) {
        this.selectedUserType = userType;
        if(this.selectedUserType!==null){
          this.isUserTypeSelected=true
        }
      },
      goBack(path){
        if(path==="sign-in"){
          this.$router.push("/sign-in")
        }
        this.currentPath=path
      },
      actualizarEstadoBoton() {
        this.esFormularioCompleto = (this.user.name.length>0 && this.user.email.length >0 && this.user.password.length >0);
      },
      addTemporaryUser(){
        this.currentPath="Payment"
        /*if (this.user.email.includes('@') && this.user.email.toString().includes('.')) {
          localStorage.setItem("user",JSON.stringify(this.user))
          this.$router.push("/sign-up-payment")
        } else {
          this.$toast.add({severity:'info', summary: 'Email invalido', detail:'Se debe ingresar un correo valido', life: 3000});
        }*/

      },
      validarNombre(evento) {
        const codigo = evento.keyCode || evento.which;
        const caracter = String.fromCharCode(codigo);
        const patron = /^[a-zA-Z\s]*$/; // Patrón para permitir solo letras y espacios

        if (caracter.match(patron)) {
          return true;
        } else {
          evento.preventDefault();
          return false;
        }
      },
        planSelected(plan){
            this.addTemporaryPlan(plan)
            this.currentPath="Form"
        },
        addTemporaryPlan(plan){
            this.userPlanSelected=plan
        }
    }
}
</script>
<style scoped>
.type-card.selected {
  border: 2px solid white;
}
.type-card{
  cursor: pointer;
  border-color: white;
  border-radius: 1rem;
  background-color: #111111;
  color: black;
  margin-top: 0;
  width: 15em;
}
.form label{
  display: block;
}
.form-Text{
  text-align: center;
}
.rw{
  color: white;
  text-decoration: none;
}
.card{
  display: flex;
  justify-content: center;
  align-items: center;
}
.form{
  margin: 0;
}
.form .form-input{
  margin: 0.3rem 0;
}
.buttons{
  display: flex;
  margin: 1.3rem 0;
  justify-content: space-around;
}
.footer{
  margin-top: 0.5rem;
}
.form-input{
  width: 100%;
}
.solidColor{
    height: 2.5rem;
    border-top-right-radius: 1rem;
    border-top-left-radius: 1rem;
}
.plan-card{
    border-radius: 1rem;
    background-color: #efefef;
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
.plan-cards{

    margin-bottom: 3rem;
    display: flex;
    justify-content: space-evenly;
}
.planButton{
    margin-top: .5em;
}
@media (max-width:1280px){
    .plan-cards{
        margin-bottom: 3rem;
        display: flex;
        justify-content: space-evenly;
    }
    .plan-card{
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
    .plan-cards{
        margin-bottom: 3rem;
        display: flex;
        justify-content: space-evenly;
    }
    .plan-card{
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
    .plan-cards{
        margin-bottom: 3rem;
        display: block;
        justify-content: center;
    }
    .plan-card{
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
    .plan-cards{
        margin-bottom: 3rem;
        display: block;
        justify-content: center;
    }
    .switch{
        margin-left: 15vw;
    }
}
</style>