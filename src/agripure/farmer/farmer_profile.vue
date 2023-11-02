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
                            <h3 style="margin-bottom: 0.5rem">Premium</h3>
                            <pv-button label="UPDATE" />
                        </div>
                        <p style="width: 30%">S/. 50</p>
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
                            <pv-button icon="pi pi-pencil" label="Edit profile" text rounded aria-label="update" />
                            <pv-button icon="pi pi-times" label="Delete profile" text rounded aria-label="Filter" />
                            <pv-button icon="pi pi-sign-out" label="Sign Out" text rounded aria-label="Filter" @click="logOut()"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script >
export default {
    data(){
        return{
            userName:sessionStorage.getItem("name"),
            userDescription:sessionStorage.getItem("description"),
            userEmail:sessionStorage.getItem("email"),
            imageUrl:sessionStorage.getItem("imageUrl"),
        }
    },
    methods:{
        logOut(){
            this.$router.push("/sign-in")
        }
    }
}
</script>
<style scoped>
@media (max-width: 1200px) {
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

