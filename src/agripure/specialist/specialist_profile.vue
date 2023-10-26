<template>
    <div class="background">
        <div style="display: flex;justify-content: center;align-items: center;align-content: center;height: 100%">
            <div class="text-container">
                <h1 style="width: 100%;margin: 1.2rem 0 1.2rem 0">Huell Babineaux</h1>
                <div class="profession-location">
                    <div style="display: flex;justify-content: space-between; width: 100%">
                        <p>Type</p>
                        <p>Location</p>
                    </div>
                </div>
                <div class="profession-location">
                    <div style="display: flex;justify-content: space-between; width: 100%">
                        <h3>Specialist</h3>
                        <h5 style="display: flex;align-content: center; align-items: center">Lima, Peru</h5>
                    </div>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 1.2rem 0 1.2rem 0">
                    <h3 >Email: Huel@gmail.com</h3>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 1.2rem 0 1.2rem 0">
                    <p>Hola, soy Huell y amo las lechugas. Estoy emocionado de unirme a agripure para aprender y compartir sobre el cultivo de lechugas. ¡Juntos cultivaremos de manera más inteligente y saludable!</p>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 2rem 0 0rem 0">
                    <h2>Plan</h2>
                </div>
                <div class="chat-card" @click="">
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
                <div>
                    <div class="profile-container">
                        <img
                                src="https://pyxis.nymag.com/v1/imgs/049/bc0/0c4563fc79b3284bdb33bd8ac3521ef94f-14-huell-breaking-bad.2x.rsquare-zoom.w190.jpg"
                                style="height: 400px; width: 400px; border-radius: 0.5rem;"
                                class="profile-image"
                        />
                        <div class="image-overlay">
                            <p>Change profile picture</p>
                        </div>
                    </div>
                    <div style="display: flex;justify-content: space-around; margin-top: 1rem">
                        <div style="display: flex">
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

<style scoped>
.profile-container {
    position: relative;
    display: inline-block;
    cursor: pointer; /* Cambia el cursor al pasar por encima para indicar que es clickeable */
}

.profile-image {
    transition: filter 0.3s;
}

.image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
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
.chat-card {
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
//background-color: red;
}

.text-container {
    width: 50%;
//background-color: blue;

}
.profession-location {
    display: flex;
    align-items: center; /* Alinea los elementos verticalmente en el centro */
}
</style>
<script >
export default {
    methods:{
        logOut(){
            this.$router.push("/sign-in")
        }
    }
}
</script>
