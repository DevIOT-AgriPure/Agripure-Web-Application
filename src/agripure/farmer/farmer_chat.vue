<template>
    <div class="background">
        <div style="width: 100%; display: flex;justify-content: center;margin:  2rem 0 2rem 0">
            <i class="pi pi-search" style="margin-top: 0.5rem; margin-right: 1rem"></i>
            <div class="card p-fluid" style="width: 80%">
                <pv-autoComplete v-model="value" multiple :suggestions="items" @complete="search" placeholder="Search" />
            </div>
        </div>
        <div style="margin: 0 2rem 0 2rem">
            <div v-for="contact in displayableContacts"
                 :key="contact.id">
                <div class="chat-card" @click="irAChat(contact.contactId)">
                    <div class="profile-image">
                        <img :src="contact.imageUrl" alt="Foto de perfil">
                    </div>
                    <div class="chat-content">
                        <div class="chat-header">
                            <h3 style="margin-bottom: 0.5rem">{{ contact.name }}</h3>
                            <span>00:08</span>
                        </div>
                        <p>Envia un mensaje !</p>
                    </div>
                </div>
            </div>

        </div>

    </div>

</template>

<script>
import {ref} from "vue";
import {ContactServices} from "../../services/contacts-service"
import {UserServices} from "../../services/user-service"

export default {
    name: "farmer_chat",
    data(){
        return{
            token: sessionStorage.getItem("jwt"),
            value : ref(""),
            items : ref([]),
            displayableContacts:[]

        }
    },
    created() {
        new ContactServices().getContactsForFarmer(1).then(response=>{
            this.getDisplayableContacts(response.data)
        })
    },
    methods:{
        search(event){
            items.value = [...Array(10).keys()].map((item) => event.query + '-' + item);
        },
        irAChat(id) {
            this.$router.push("/farmer/chat/" + id)
        },
        getDisplayableContacts(rawContacts){
            for (let i = 0; i < rawContacts.length; i++) {
                new UserServices().getUserById(rawContacts[i].specialistId).then(response=>{
                    let displayableContact=response.data
                    displayableContact.contactId=rawContacts[i].id
                    this.displayableContacts.push(displayableContact)
                })
            }
        }
    }
}
</script>

<style scoped>
.background {
    background-color: #242424;
    color: white; /* Cambiar el color del texto si es necesario */
    margin: 15px 20px 15px 20px; /* Agregar el relleno deseado */
    border-radius: 15px; /* Agregar bordes redondeados */
    width: 100%;
    padding-bottom: 3rem;
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
}

.profile-image {
    width: 50px; /* Ancho de la imagen de perfil */
    height: 50px; /* Alto de la imagen de perfil */
    border-radius: 50%; /* Hace que la imagen sea redonda */
    overflow: hidden; /* Oculta cualquier parte de la imagen fuera del círculo */
    margin-right: 10px;
}

.profile-image img {
    width: 100%; /* Ajusta la imagen de perfil al círculo */
    height: 100%;
    object-fit: cover; /* Mantiene la relación de aspecto de la imagen */
}

.chat-content {
    flex-grow: 1;
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

p {
    margin: 0;
    font-size: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

</style>