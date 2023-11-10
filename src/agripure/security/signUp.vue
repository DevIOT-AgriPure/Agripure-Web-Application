<template>
  <div style="height: 100vh;width: 100%;  display:flex; justify-content: center; align-content: center;align-items: center">
    <div v-if="currentPath==='Types'">
      <pv-card style=" border-radius: 1rem;justify-content: center;width: 50vw;">
        <template #content>
          <div style="display: flex;justify-content: center;margin: 2rem 0">
            <h1 style="color: white;">SELECT USER TYPE</h1>
          </div>
          <div class="plan-cards">
              <div style="width: 100%;display: flex;justify-content: center;">
                  <pv-card
                          class="type-card"
                          :class="{ selected: selectedUserType === 'farmer' }"
                          @click="selectUserType('farmer')"
                  >
                      <template #content>
                          <div style="display: flex;justify-content: center;margin-bottom: 1rem">
                              <img src="../../assets/farmer_logo.png" alt="" style="height: 150px;">
                          </div>
                          <div style="display: flex;justify-content: center">
                              <h2 style="color: white">Farmer</h2>
                          </div>
                      </template>
                  </pv-card>
              </div>
              <div style="width: 100%;display: flex;justify-content: center">
                  <pv-card
                          class="type-card"
                          :class="{ selected: selectedUserType === 'specialist' }"
                          @click="selectUserType('specialist')">
                      <template #content>
                          <div style="display: flex;justify-content: center;margin-bottom: 1rem">
                              <img src="../../assets/specialist_logo.png" alt="" style="height: 150px;">
                          </div>
                          <div style="display: flex;justify-content: center">
                              <h2 style="color: white">Specialist</h2>
                          </div>
                      </template>
                  </pv-card>
              </div>


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
                                <p style="margin-top: 15px">{{ plan.description }}</p>
                              </div>
                            </template>
                            <template v-if="plan.name==='Free'">
                              <div class="usherVisible">
                                <p style="margin-top: 15px">{{ plan.description }}</p>
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
                          <pv-button class="planButton" v-if="plan.name==='Free'" style="background-color: darkgreen; border-color:darkgreen ;color:white" @click="planSelected(1)">Elegir</pv-button>
                          <pv-button class="planButton" v-if="plan.name==='Premium'" style="background-color: #ff9914;border-color: #ff9914; color:white" @click="planSelected(2)">Elegir</pv-button>
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
              </div>
              <div class="phrase" style="margin-bottom: 1rem; display: flex; justify-content: center">
                <h1>Create an account</h1>
              </div>
              <div class="card" style="justify-content: center;">
                <div class="register" style="width: 30vw">
                  <div class="form">
                    <div class="nombre" style="display: flex; justify-content: center; margin: 1rem 0">
                      <pv-input id="name" class="form-input" @input="actualizarEstadoBoton()" placeholder="Name" style="border-radius: 1rem" v-model="user.name" maxlength="56" @keypress="validarNombre($event)"></pv-input>
                    </div>
                    <div class="email" style="display: flex; justify-content: center; margin: 1rem 0">
                      <pv-input id="email" class="form-input" @input="actualizarEstadoBoton()" placeholder="Email" style="border-radius: 1rem" maxlength="256" v-model="user.email"></pv-input>
                    </div>
                    <div class="password" style="display: flex; justify-content: center; margin: 1rem 0">
                      <pv-input id="password" type="password" class="form-input" @input="actualizarEstadoBoton()" placeholder="Password" style="border-radius: 1rem" v-model="user.password"></pv-input>
                    </div>
                      <div class="Description" style="display: flex; justify-content: center; margin: 1rem 0">
                          <pv-textArea id="description" class="form-input" @input="actualizarEstadoBoton()" placeholder="Description" style="border-radius: 1rem" maxlength="600" v-model="user.description"></pv-textArea>
                      </div>
                  </div>
                  <div class="footer">
                    <div v-if="selectedUserType==='farmer'" class="form-Text" style="margin: 3rem 0">
                      By creating my account I accept the terms of service and policy of
                      <br>Agripure
                    </div>
                    <div class="buttons" >
                      <pv-button :disabled="!esFormularioCompleto" style="border-radius: 1rem;color: white;background-color: darkgreen;border-color: darkgreen" @click="addTemporaryUser()">Next</pv-button >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </pv-card>
      </div>
    </div>
      <div v-if="currentPath==='SpecialistForm'">
          <div class="card" style="height: 98vh ">
              <pv-card style=" border-radius: 1rem;justify-content: center;">
                  <template #content>
                      <div class="content" style="width: 50vw">
                          <p style="margin:2rem 2rem 1rem 2rem; text-decoration-line: none;color: white; cursor: pointer " @click="goBack('Form')"  >
                              Go back
                          </p>
                          <div class="steps" >
                          </div>
                          <div class="phrase" style="margin-bottom: 1rem; display: flex; justify-content: center">
                              <h1>Add your information</h1>
                          </div>
                          <div class="card" style="justify-content: center;">
                              <div class="register" style="width: 30vw">
                                  <div class="form" >
                                      <div class="ContactEmail" style="display: flex; justify-content: center; margin: 1rem 0">
                                          <pv-input id="contactEmail" class="form-input" @input="actualizarEstadoBotonSpecialistForm()" placeholder="Contact Email" style="border-radius: 1rem" maxlength="256" v-model="user.contactEmail"></pv-input>
                                      </div>
                                      <div class="Expertise" style="display: flex; justify-content: center; margin: 1rem 0">
                                          <pv-textArea id="expertise" class="form-input" @input="actualizarEstadoBotonSpecialistForm()" placeholder="Expertise" style="border-radius: 1rem" maxlength="600" v-model="user.expertise"></pv-textArea>
                                      </div>
                                      <div class="AreaOfFocus" style="display: flex; justify-content: center; margin: 1rem 0">
                                          <pv-textArea id="areaOfFocus" class="form-input" @input="actualizarEstadoBotonSpecialistForm()" placeholder="Area Of Focus" style="border-radius: 1rem" maxlength="600" v-model="user.areasOfFocus"></pv-textArea>
                                      </div>
                                  </div>
                                  <div class="footer">
                                      <div class="form-Text" style="margin: 3rem 0">
                                          By creating my account I accept the terms of service and policy of
                                          <br>Agripure
                                      </div>
                                      <div class="buttons" >
                                          <pv-button :disabled="!esSpecialistFormularioCompleto" style="border-radius: 1rem;color: white;background-color: darkgreen;border-color: darkgreen" @click="addTemporaryUser()">Next</pv-button >
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </template>
              </pv-card>
          </div>
      </div>
      <div v-if="currentPath==='ProfilePicture'">
          <div class="card" style="height: 98vh ">
              <pv-card style=" border-radius: 1rem;justify-content: center;">
                  <template #content>
                      <div class="content" style="width: 50vw">
                          <p v-if="selectedUserType==='farmer'" style="margin:2rem 2rem 1rem 2rem; text-decoration-line: none;color: white; cursor: pointer " @click="goBack('Form')"  >
                              Go back
                          </p>
                          <p v-else style="margin:2rem 2rem 1rem 2rem; text-decoration-line: none;color: white; cursor: pointer " @click="goBack('SpecialistForm')"  >
                              Go back
                          </p>

                          <div class="card" style="justify-content: center;">
                              <div class="profile">
                                  <div v-if="this.profilePictureUploaded===false">
                                      <div v-if="loading===false" class="phrase" style="margin-bottom: 1rem; display: flex; justify-content: center">
                                          <h1>Upload a Profile Picture</h1>
                                      </div>
                                      <div v-if="loading===true" class="phrase" style="margin-bottom: 1rem; display: flex; justify-content: center">
                                          <h2>Uploading a Profile Picture</h2>
                                      </div>
                                      <div>
                                          <pv-fileUpload v-if="loading===false" name="demo[]" customUpload @uploader="customBase64Uploader" :multiple="false" accept="image/*" :maxFileSize="10000000">
                                              <template #empty>
                                                  <div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                                                      <i class="pi pi-cloud-upload" style="font-size: 5rem; border: 2px solid white; border-radius: 50%; padding: 25px;"></i>
                                                      <p class="mt-4 mb-0">Drag and drop files here to upload.</p>
                                                  </div>
                                              </template>
                                          </pv-fileUpload>
                                          <div v-if="loading===true" style="display: flex;justify-content: center;margin: 3rem">
                                              <i  class="pi pi-spin pi-spinner" style="font-size: 8rem"></i>
                                          </div>
                                      </div>
                                  </div>
                                  <div v-else>
                                      <div class="phrase" style="margin-bottom: 1rem; display: flex; justify-content: center">
                                          <h2>This is your profile picture</h2>
                                      </div>
                                      <div style="width: 100%; display:flex;justify-content: center">
                                          <img :src="this.profilePictureURL" alt="Image" height="250" style="border-radius: 1rem" />
                                      </div>
                                      <h2 style="margin: 2rem">¿Do you want to continue?</h2>
                                      <div class="buttons" >
                                          <pv-button :disabled="!esFormularioCompleto" style="border-radius: 1rem;color: white;background-color: darkred;border-color: darkred" severity="danger" @click="deleteImage()">Reload</pv-button >
                                          <pv-button :disabled="!esFormularioCompleto" style="border-radius: 1rem;color: white;background-color: darkgreen;border-color: darkgreen" @click="uploadPhotoNext()">Continue</pv-button >
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
              <p style="margin:2rem 2rem 1rem 2rem; text-decoration-line: none;color: white; cursor: pointer " @click="goBack('ProfilePicture')"  >
                Go back
              </p>
              <div class="steps" >
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
                    <pv-button style="border-radius: 1rem;color: white;background-color: darkgreen;border-color: darkgreen" @click="register()">Start subscription</pv-button >
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
import {PlansServices} from "@/services/plans-service";
import { ref, getDownloadURL, uploadBytes,deleteObject } from 'firebase/storage'
import { storage } from '../../firebaseConfig' // Importa la configuración de Firebase Storage

export default {
    name: "sign-up-plans",
    data(){
        return{
            loading:false,
            profilePictureUploaded:false,
          profilePictureFile: null,
          profilePictureURL: null,
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
              description: null,
              contactEmail:null,
              areasOfFocus:null,
              expertise:null,
          },
          esFormularioCompleto: false,
            esSpecialistFormularioCompleto:false,
          isUserTypeSelected:false,
          selectedUserType: null,
          userPlanSelected:"none",
        }
    },
    created(){   this.currentPath="Types"
        new PlansServices().getPlans().then(res=>{
            this.plans=res.data
        })

    },
    methods:{
        async customBase64Uploader(event){
            this.loading=true
            this.profilePictureFile = event.files[0];
            if (this.profilePictureFile) {
                this.profilePictureFile.name
                const storageRef = ref(storage, 'profile_pictures/' + this.user.email);
                console.log(this.profilePictureFile.name)
                await uploadBytes(storageRef, this.profilePictureFile);
                this.profilePictureURL = await getDownloadURL(storageRef);
                this.profilePictureUploaded=true
                this.loading=false
            }
            console.log('URL:', this.profilePictureURL)
        },
        async deleteImage() {
            this.profilePictureUploaded=false
            this.profilePictureFile=null
            this.profilePictureURL=null
        },
        uploadPhotoNext(){
          this.currentPath="Payment"
        },
      register(){
          let newUser={}
          newUser.name=this.user.name
          newUser.email=this.user.email
          newUser.password=this.user.password
          newUser.description=this.user.description
          newUser.imageUrl=this.profilePictureURL
          newUser.location="Lima, Peru"
          newUser.type=this.selectedUserType.toUpperCase()
          newUser.plan=parseInt(this.userPlanSelected)
          if(this.selectedUserType==="specialist"){
              newUser.contactEmail=this.user.contactEmail
              newUser.areasOfFocus=this.user.areasOfFocus
              newUser.expertise=this.user.expertise
          }
          if(this.selectedUserType==="farmer"){
              new UserServices().registerFarmer(newUser).then(response=>{
                  this.$router.push("/sign-in")
              }).catch(error=>{
                  this.$toast.add({severity:'error', summary: 'Error', detail:'Server error', life: 3000});
              })
          }else {
              new UserServices().registerSpecialist(newUser).then(response=>{
                  this.$router.push("/sign-in")
              }).catch(error=>{
                  this.$toast.add({severity:'error', summary: 'Error', detail:'Server error', life: 3000});
              })
          }

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
        console.log(this.selectedUserType)
          console.log(path)
        if(this.selectedUserType==="specialist"&&path==="Plans"){
            this.currentPath="Types"
        }else {
            this.currentPath=path
        }
      },
        actualizarEstadoBotonSpecialistForm(){
            this.esSpecialistFormularioCompleto = (this.user.areasOfFocus.length>0 && this.user.contactEmail.length >0 && this.user.expertise.length >0);
        },
      actualizarEstadoBoton() {
        this.esFormularioCompleto = (this.user.name.length>0 && this.user.email.length >0 && this.user.password.length >0 && this.user.description.length >0);
      },
      addTemporaryUser(){
          if(this.currentPath==="SpecialistForm"){
              this.currentPath="ProfilePicture"
          }
          else {
              if(this.selectedUserType==="specialist"){
                  this.currentPath="SpecialistForm"
              }else {
                  this.currentPath="ProfilePicture"
              }
          }

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
            console.log(this.userPlanSelected)

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
    .type-card{
        cursor: pointer;
        border-color: white;
        border-radius: 1rem;
        background-color: #111111;
        color: black;
        margin-top: 0;
        width: 13em;
    }
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
    .type-card{
        cursor: pointer;
        border-color: white;
        border-radius: 1rem;
        background-color: #111111;
        color: black;
        margin-top: 0;
        width: 11em;
    }
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
    .type-card{
        cursor: pointer;
        border-color: white;
        border-radius: 1rem;
        background-color: #111111;
        color: black;
        margin-top: 0;
        width: 10em;
    }
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
    .type-card{
        cursor: pointer;
        border-color: white;
        border-radius: 1rem;
        background-color: #111111;
        color: black;
        margin-top: 0;
        width: 10em;
    }
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