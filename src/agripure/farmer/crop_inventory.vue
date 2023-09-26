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
  <h2>Your plants:</h2>
          <div class="cards" style="margin-top: 2rem">
              <div v-for="crop in displayableCrops" :key="crop.id">
                  <pv-card style="width: 17em; border-radius: 15px;">
                      <template #header>
                          <img
                                  alt="user header"
                                  :src="crop.imageUrl"
                                  style="margin: 1em; width: 15em; height: 150px; border-radius: 15px;"
                          />
                      </template>
                      <template #title>{{ crop.name }}</template>
                      <template #footer>
                          <div style="display: flex; justify-content: center">
                              <pv-button label="Detail" severity="warning" />
                          </div>
                      </template>
                  </pv-card>
              </div>
              <pv-card style="width: 17em; border-radius: 15px;">
                  <template #content>
                      <pv-button text @click="addPlant" style="border-radius: 15px; width: 100%; height: 17rem; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                          <h3 style="margin: 0;">+ ADD PLANTS</h3>
                      </pv-button>
                  </template>
              </pv-card>

          </div>

      </div>



  </div>
</template>

<script>
import {CropServices} from "../../services/crop-service"
import {PlantServices} from "../../services/plant-service"
import { ref } from "vue";
export default {
    name: "crop_inventory",
    data(){
        return{
            token: sessionStorage.getItem("jwt"),
            username:"Huell",
            value : ref(""),
            items : ref([]),
            showDropdown: false,
            displayableCrops:[]

        }
    },
    created(){
        new CropServices().getCropsByFarmerId(1).then(response=>{
            this.getDisplayableCrops(response.data)
        })

    },
    methods:{
        search(event){
            console.log("hola")
            this.items = [...Array(10).keys()].map((item) => this.value + '-' + item);
        },
        getDisplayableCrops(rawCrop){
            for (let i = 0; i < rawCrop.length; i++) {
                new PlantServices().getPlantInfoByCropId(rawCrop[i].id).then(response=>{
                    this.displayableCrops.push(response.data)
                })
            }
        },
        addPlant(){
            this.$router.push("/farmer/createCrop")
        }
    }
}

</script>

<style scoped>
pv-card:hover div {
    background-color: lightcoral;
    cursor: pointer;
}

.cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(17em, 1fr)); /* 3 columnas y tamaño mínimo de 17em */
    gap: 2rem; /* Espacio entre las cartas */
    justify-items: center; /* Centra las cartas horizontalmente */
    margin-top: 2rem;

}

.background {
    background-color: #242424;
    color: white; /* Cambiar el color del texto si es necesario */
    margin: 15px 20px 15px 20px; /* Agregar el relleno deseado */
    border-radius: 15px; /* Agregar bordes redondeados */
    width: 100%;
    padding-bottom: 3rem;
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

