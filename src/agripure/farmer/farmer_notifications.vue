<template>
  <div class="background">
    <div style="margin: 2rem 2rem 2rem 2rem" >
      <div v-for="notification in notifications"
           :key="notification.id">
        <div class="chat-card" @click="redirectTo()">
          <div class="profile-image">
            <img :src="http" alt="Foto de perfil">
          </div>
          <div class="chat-content" >
            <div class="chat-header">
              <h3 style="margin-bottom: 0.5rem">{{ notification.message }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
import {FilterMatchMode} from "primevue/api";
import {NotificationService} from "@/services/notification-service";

export default {
  name: "farmer_devices",
  data(){
    return {
      token: sessionStorage.getItem("jwt"),
      notifications:{},
    };
  },
  created(){
    new NotificationService().getAllNotificationByUserId(1).then(response=>{
      this.notifications=response.data
    })

  },
  methods:{
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

p {
  margin: 0;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>