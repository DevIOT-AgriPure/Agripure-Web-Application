<template>
    <div class="background">
        <div class="content-container">
            <div class="text-container">
                <h1 style="width: 100%;margin: 1.2rem 0 1.2rem 0">{{ userName }}</h1>
                <div class="profession-location">
                    <div style="display: flex;justify-content: space-between; width: 100%">
                        <p>Type</p>
                        <p>Location</p>
                    </div>
                </div>
                <div class="profession-location">
                    <div style="display: flex;justify-content: space-between; width: 100%">
                        <h3>Farmer</h3>
                        <h5 style="display: flex;align-content: center; align-items: center">Lima, Peru</h5>
                    </div>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 1.2rem 0 1.2rem 0">
                    <h3 >Email: {{ userEmail }}</h3>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 1.2rem 0 1.2rem 0">
                    <p>{{userDescription}}</p>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 2rem 0 0rem 0">
                    <h2>Plan</h2>
                </div>
                <div class="chat-card-first">
                    <div class="plan-image">
                        <i class="pi pi-bolt" style="font-size: 2.5rem"></i>
                    </div>
                    <div class="chat-content" >
                        <div class="chat-header">
                            <h3 style="margin-bottom: 0.5rem">{{ plan.name }}</h3>
                            <pv-button label="UPDATE" />
                        </div>
                        <p style="width: 30%">S/. {{ plan.price }}</p>
                    </div>
                </div>
            </div>
            <div class="profilePicture">
                <div style="display: inline;justify-content: center">
                    <div class="profile-container">
                        <img
                            :src="imageUrl"
                            style=""
                            class="profile-image"
                        />
                        <div class="image-overlay">
                            <p>Change profile picture</p>
                        </div>
                    </div>
                    <div class="action-buttons">
                        <div class="acb" style="">
                            <pv-button icon="pi pi-pencil" label="Edit profile" @click="showEditProfileDialog()" text rounded aria-label="update" />
                            <pv-button icon="pi pi-times" label="Delete profile" text rounded aria-label="Filter" />
                            <pv-button icon="pi pi-sign-out" label="Sign Out" text rounded aria-label="Filter" @click="logOut()"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <pv-dialog v-model:visible="editProfileDialogVisible" maximizable modal header="Edit Profile" :style="{ width: '700px' }">
            <div class="addplantbackground">
                <div class="crop-details">
                    <div v-if="currentPath==='Form'" style="margin: 1rem 1rem; display: flex;justify-content: center">
                        <div style="width: 90%">
                            <div style="margin: 2rem 0rem">
                                <span class="p-float-label">
                               <pv-input id="username" @input="actualizarEstadoBoton()" style="border-radius: 0.5rem;width: 100%" v-model="editUserName" maxlength="56" @keypress="validarNombre($event)"/>
                                <label for="username">Name</label>
                            </span>
                            </div>
                            <div style="margin: 2rem 0rem">
                                <span class="p-float-label">
                                                <pv-textArea id="description" class="form-input" @input="actualizarEstadoBoton()" placeholder="Description" style="border-radius: 0.5rem;width: 100%" maxlength="600" v-model="editUserDescription"></pv-textArea>
                                                <label for="description">Description</label>
                                            </span>
                            </div>
                            <div style="width: 100%;display: flex;justify-content: space-between">
                                <pv-button style="border-radius: 1rem;color: white;" severity="secondary" @click="editProfileDialogVisible=false">Cancel</pv-button >
                                <pv-button :disabled="!esFormularioCompleto" style="border-radius: 1rem;color: white;background-color: darkgreen;border-color: darkgreen" @click="updateProfile()">Update</pv-button >
                            </div>

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
                                                        <pv-button  style="border-radius: 1rem;color: white;background-color: darkred;border-color: darkred" severity="danger" @click="deleteImage()">Reload</pv-button >
                                                        <pv-button  style="border-radius: 1rem;color: white;background-color: darkgreen;border-color: darkgreen" @click="uploadPhotoNext()">Continue</pv-button >
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </template>
                            </pv-card>
                        </div>

                    </div>
                </div>
            </div>
        </pv-dialog>

    </div>
</template>
<script >
import {PlansServices} from "@/services/plans-service";

export default {
    data(){
        return{
            esFormularioCompleto:false,
            currentPath:"Form",
            editProfileDialogVisible:false,
            userName:sessionStorage.getItem("name"),
            userDescription:sessionStorage.getItem("description"),
            userEmail:sessionStorage.getItem("email"),
            editUserName:"",
            editUserDescription:"",
            editUserEmail:"",
            imageUrl:sessionStorage.getItem("imageUrl"),
            planId:sessionStorage.getItem("planId"),
            plan: {}
        }
    },
    created() {
        new PlansServices().getPlanById(this.planId).then(res=>{
            this.plan=res.data
        })
    },
    methods:{
        updateProfile(){

        },
        showEditProfileDialog(){
            this.editUserName=this.userName
            this.editUserDescription=this.userDescription
            this.esFormularioCompleto = (this.editUserName.length>0  && this.editUserDescription.length >0);
            this.editProfileDialogVisible=true
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
        actualizarEstadoBoton() {
            this.esFormularioCompleto = (this.editUserName.length>0  && this.editUserDescription.length >0);
        },
        logOut(){
            this.$router.push("/sign-in")
        }
    }
}
</script>
<style scoped>
@media (max-width: 1200px) {
    .card-edit{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .content h2{
        margin-bottom: 0.5rem;
    }
    .chat-card-first {
        display: flex;
        align-items: center;
        padding: 1.2rem;
        background-color: #1c1c1c; /* Color de fondo negro */
        color: white; /* Color de texto blanco */
        border-radius: 10px; /* Bordes redondos */
        cursor: pointer; /* Cambia el cursor al pasar por encima para indicar que es clickeable */
        margin-top: 1rem;
        margin-bottom: 2rem;
    }
    .acb{
        display: block;
        width: 100%;
    }
    .action-buttons{
        display: inline;justify-content: space-around; margin-top: 1rem;
        width: 100px;
    }
    .background {
        display: flex;
        flex-direction: column;
        background-color: #242424;
        color: white;
        margin: 15px 20px 15px 20px;
        border-radius: 15px;
        width: 100%;
        padding: 4rem;
        align-content: center;
    }
    .text-container {
        width: 100%;
    }
    .content-container {
        display: inline;
        justify-content: center;
        align-items: flex-start;
        flex-wrap: wrap;
        width: 100%;
    }
    .profilePicture {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start; /* Alinea la parte superior de la imagen */
    }
    .profile-container {
        width: 30vw;
        position: relative;
        display: inline-block;
        cursor: pointer;
    }

    .profile-image {
        transition: filter 0.3s;
    }

    .image-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 40vw;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        border-radius: 0.5rem;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s;
    }

    .profile-container img{
        width: 40vw; border-radius: 0.5rem;
    }

    .profile-container:hover .profile-image {
        filter: grayscale(100%) brightness(70%);
    }

    .profile-container:hover .image-overlay {
        opacity: 1;
    }
    .plan-image{
        margin-right: 1rem;
    }

    .chat-content {
        flex-grow: 1;
        width: 10px;
    }

    .chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .chat-header h3 {
        margin: 0;
        font-size: 1.2rem;
    }

    .chat-header span {
        font-size: 0.9rem;
        color: #888;
    }
}
@media (min-width: 1200px) {
    .content h2{
        margin-bottom: 0.5rem;
    }
    .chat-card-sec {
        visibility: hidden;
        display: flex;
        align-items: center;
        padding: 1.2rem;
        background-color: #1c1c1c; /* Color de fondo negro */
        color: white; /* Color de texto blanco */
        border-radius: 10px; /* Bordes redondos */
        cursor: pointer; /* Cambia el cursor al pasar por encima para indicar que es clickeable */
        margin-top: 1rem;
        margin-bottom: 3rem;
    }
    .acb{
        display: block
    }
    .action-buttons{
        display: flex;justify-content: space-around; margin-top: 1rem;
    }
    .profilePicture{
        display: flex;
        justify-content: center;
    }
    .content-container {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap: wrap;
    }

    .text-container {
        flex: 1;
        margin-right: 2rem;
    }
    .profile-container {
        width: 400px;
        position: relative;
        display: inline-block;
        cursor: pointer;
    }

    .profile-container img{
        width: 30vw; border-radius: 0.5rem;
    }

    .profile-image {
        transition: filter 0.3s;
    }

    .image-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 30vw;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        border-radius: 0.5rem;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s;
    }

    .profile-container:hover .profile-image {
        filter: grayscale(100%) brightness(70%);
    }

    .profile-container:hover .image-overlay {
        opacity: 1;
    }
    .plan-image{
        margin-right: 1rem;
    }
    .chat-card-first {
        display: flex;
        align-items: center;
        padding: 1.2rem;
        background-color: #1c1c1c; /* Color de fondo negro */
        color: white; /* Color de texto blanco */
        border-radius: 10px; /* Bordes redondos */
        cursor: pointer; /* Cambia el cursor al pasar por encima para indicar que es clickeable */
        margin-bottom: 10px; /* Espaciado entre tarjetas */
        margin-top: 1rem;
    }
    .chat-content {
        flex-grow: 1;
        width: 10px;
    }

    .chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .chat-header h3 {
        margin: 0;
        font-size: 1.2rem;
    }

    .chat-header span {
        font-size: 0.9rem;
        color: #888;
    }

    .background {
        display: flex;
        flex-direction: column;
        background-color: #242424;
        color: white;
        margin: 15px 20px 15px 20px;
        border-radius: 15px;
        width: 100%;
        padding: 4rem;
        align-content: center;
    }

    .profilePicture {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: flex-start; /* Alinea la parte superior de la imagen */
    }

    .text-container {
        width: 80%;
    }
    .profession-location {
        display: flex;
        align-items: center; /* Alinea los elementos verticalmente en el centro */
    }
}


</style>

