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
                              <pv-button label="Detail" severity="warning" @click="showCropDetails(crop)" />
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
          <pv-dialog v-model:visible="visible" maximizable modal header="Add a plant" :style="{ width: '80vw' }">
              <div class="addplantbackground" >
                  <div style="margin: 0 3rem 3rem 3rem">
                      <h1 style="margin-bottom: 2rem">Search for a new plant</h1>
                      <div class="card p-fluid" style="margin: 0 3rem 4rem 3rem">
                          <pv-autoComplete v-model="value"
                                           :suggestions="items"
                                           @complete="search"
                                           placeholder="What are you looking for?"
                                           class="searchBar" />
                      </div>
                  </div>

                  <div class="inventory">
                      <h2 style="margin-left: 2rem">Results:</h2>
                      <div class="cards" style="margin-top: 2rem">
                          <div v-for="crop in resultsPlants" :key="crop.id">
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

                      </div>

                  </div>



              </div>
          </pv-dialog>
          <pv-dialog v-model:visible="cropDetailsVisible" maximizable modal header="Crop Detail" :style="{ width: '80vw' }">
              <div class="addplantbackground">
                  <div class="crop-details">
                      <div class="title">
                          <h1 class="title-text">{{ currentCrop.name }} Details</h1>
                      </div>
                      <div class="detail">
                          <p class="detail-text">Scientific name: {{ currentCrop.scientificName }}</p>
                      </div>
                      <div class="detail">
                          <p class="detail-text">Variety: {{ currentCrop.variety }}</p>
                      </div>
                      <div class="image-container">
                          <img :src="currentCrop.imageUrl" alt="crop Image" class="centered-image">
                      </div>
                      <div class="detail-row">
                          <p class="detail-text">Land type: {{ currentCrop.landType }}</p>
                      </div>
                      <div class="divider"></div>
                      <div class="detail-row">
                          <p class="detail-text">Distance between plants: {{ currentCrop.distanceBetweenPlants }}</p>
                      </div>
                      <div class="divider"></div>
                      <div class="detail-row">
                          <p class="detail-text">Weather conditions: {{ currentCrop.weatherConditions }}</p>
                      </div>
                      <div style="display: flex; width: 100%;justify-content: end">
                          <pv-button severity="secondary" style="margin-right: 3rem; color: white; font-weight: bold; text-align: center;" @click="cropDetailsVisible=!cropDetailsVisible">
                              <div style="display: flex; justify-content: center; align-items: center; font-weight: bold; height: 100%;">To return</div>
                          </pv-button>
                          <pv-button severity="danger" style="width: 15rem; color: white; font-weight: bold;" @click="deleteCrop">
                              <div style="display: flex; justify-content: center; align-items: center; height: 100%;width: 100%">Delete plant</div>
                          </pv-button>


                      </div>

                  </div>
              </div>
          </pv-dialog>

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
            displayableCrops:[],
            currentCrop:{},
            resultsPlants:[],
            visible :false,
            cropDetailsVisible :false

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
        deleteCrop(){
            this.cropDetailsVisible=!this.cropDetailsVisible
        },
        getAllPlants(){
            new PlantServices().getAllPlants().then(response=>{
                this.resultsPlants=response.data
            })
        },
        showCropDetails(crop) {
            this.cropDetailsVisible=!this.cropDetailsVisible
            this.currentCrop= crop;
        },
        findIndexById(id) {
            //return this.rooms.findIndex((room) => room.id === id);
        },
        addPlant(){
            //this.$router.push("/farmer/createCrop")
            this.visible=!this.visible
            this.getAllPlants()
        }
    }
}

</script>

<style scoped>
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
.addplantbackground {
    background-color: #242424;
    color: white; /* Cambiar el color del texto si es necesario */
    border-radius: 15px; /* Agregar bordes redondeados */
    width: 100%;
    padding-top: 3rem;
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

.crop-details {
    color: white;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* Alinea los elementos a la izquierda */
    text-align: left; /* Alinea el texto a la izquierda */

}
.title {
    margin-right: 20px; /* Espacio entre el título y el borde derecho */
}

.title-text {
    font-weight: bold;
}

.detail {
    margin-right: 20px; /* Espacio entre los detalles y el borde derecho */
    margin-top: 15px;
}

.detail-text {
    font-weight: bold;
}
.image-container {
    text-align: center; /* Centrar la imagen horizontalmente */
    margin-top: 15px;

}

.centered-image {
    max-width: 100%; /* Asegura que la imagen no sea más ancha que su contenedor */
    max-height: 300px; /* Límite de altura máximo */
    height: auto; /* Mantiene la proporción de aspecto de la imagen */
    border-radius: 15px;
}
.detail-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;

}

.divider {
    width: 100%;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.5); /* Color de línea divisoria */
    margin: 10px 0;
    margin-top: 15px;
}

</style>

