<template>
  <div class="background" >
      <div class="header">
          <h1 style="margin-right: 3rem">Good morning {{ username }}!</h1>
          <div class="search-container">
              <div class="searchBar-container">
                  <pv-autoComplete
                          v-model="value"
                          :suggestions="items"
                          @complete="search"
                          placeholder="Search for plants"
                          class="searchBar"
                  />
              </div>
          </div>
      </div>
      <div class="inventory">
          <h2>Your plants: </h2>
          <div class="cards" style="margin-top: 2rem">
              <pv-card style="width: 17em; border-radius: 15px;"> <!-- Agregamos el estilo border-radius -->
                  <template #header>
                      <img
                          alt="user header"
                          src="https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/What-Are-Plants.jpg"
                          style="margin: 1em; width: 15em; height: 150px;border-radius: 15px;"
                      />
                  </template>
                  <template #title>Advanced Card</template>
                  <template #footer>
                      <div style="display: flex; justify-content: center">
                          <pv-button label="Detail" severity="warning"  />
                      </div>
                  </template>
              </pv-card>
          </div>
      </div>


  </div>
</template>

<script>
import { ref } from "vue";
import { CropServices } from "../../services/crop-service";
export default {
    name: "crop_inventory",
    data(){
        return{
            token: sessionStorage.getItem("jwt"),
            username:"Huell",
            value : ref(""),
            items : ref([]),
            showDropdown: false,
        }
    },
    methods:{
        search(event){
            console.log("hola")
            this.items = [...Array(10).keys()].map((item) => this.value + '-' + item);
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
}
.header {
    margin: 3rem;
    display: flex;
    align-items: center; /* Centra verticalmente los elementos */
}

.search-container {
    display: flex; /* Hace que los elementos dentro se muestren en línea */
    align-items: center; /* Centra verticalmente los elementos */
}

.searchBar-container {
    width: 200px; /* Establece un ancho fijo para el contenedor del pv-autoComplete */
    margin-left: 10px; /* Ajusta el margen izquierdo según sea necesario */
}

.searchBar {
    width: 100%; /* Establece el ancho del pv-autoComplete al 100% del contenedor */
}

.inventory{
    margin: 0 5rem 0 5rem;
}

</style>

