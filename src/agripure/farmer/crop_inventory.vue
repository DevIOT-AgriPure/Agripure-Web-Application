<template>
  <div class="background" >
      <div class="header" style="display: flex;justify-content: left;">
          <h1>Good morning {{ userName }}!</h1>
          <div style="width: 40%; display: flex;justify-content: center;margin:  2rem 0 2rem 0">
              <i class="pi pi-search" style="margin-top: 0.5rem; margin-right: 1rem"></i>
              <div class="card p-fluid" style="width: 80%">
                  <pv-autoComplete v-model="searchInventorValue"
                                   :suggestions="searchInventorItems"
                                   @complete="inventorySearch"
                                   @itemSelect="inventorySearchSelected"
                                   placeholder="Search your plant"
                                   class="searchBar"
                                   />
              </div>
          </div>
      </div>
      <div class="inventory">
          <div style="margin-left: 1rem">
                <h2>Your plants:</h2>
                <p v-if="currentInventoryResultsPlants !== displayableCrops" @click="resetInventory()" style="text-decoration: underline; cursor: pointer;margin-top: 1.5rem">Reset search</p>
          </div>
          <div class="cards" style="margin-top: 2rem">
              <div v-for="crop in currentInventoryResultsPlants" :key="crop.id">
                  <pv-card style="width: 17em; border-radius: 15px;">
                      <template #header>
                          <img alt="user header" :src="crop.imageUrl" style="margin: 1em; width: 15em; height: 150px; border-radius: 15px;"/>
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
          <pv-dialog v-model:visible="visible" maximizable modal header="Add a plant" :style="{ width: '800px' }">
              <div class="addplantbackground" >
                  <div class="detail" v-if="showDetailsForSearch">
                      <div class="crop-details">
                          <div style="display: flex; justify-content: space-around;width: 100%">
                              <div>
                                  <div class="title">
                                      <h1 class="title-text">{{ currentPlantInSearch.name }} Details</h1>
                                  </div>
                                  <div class="detail">
                                      <p class="detail-text">Scientific name: {{ currentPlantInSearch.scientificName }}</p>
                                  </div>
                                  <div class="detail">
                                      <p class="detail-text">Variety: {{ currentPlantInSearch.variety }}</p>
                                  </div>
                                  <div class="detail-row">
                                      <p class="detail-text">Land type: {{ currentPlantInSearch.landType }}</p>
                                  </div>
                                  <div class="detail-row">
                                      <p class="detail-text">Distance between plants: {{ currentPlantInSearch.distanceBetweenPlants }}</p>
                                  </div>
                                  <div class="detail-row">
                                      <p class="detail-text">Weather conditions: {{ currentPlantInSearch.weatherConditions }}</p>
                                  </div>
                              </div>
                              <div>
                                  <div class="image-container">
                                      <img :src="currentPlantInSearch.imageUrl" alt="crop Image" class="centered-image" style="width: 300px">
                                  </div>
                              </div>
                          </div>
                          <div style="margin-top: 2rem; display: flex; width: 100%;justify-content: space-around">
                              <pv-button severity="secondary" style="margin-right: 3rem; color: white; font-weight: bold; text-align: center;" @click="showDetailsForSearch=!showDetailsForSearch">
                                  <div style="display: flex; justify-content: center; align-items: center; font-weight: bold; height: 100%;">cancel</div>
                              </pv-button>
                              <pv-button style="width: 10rem; color: white; font-weight: bold;" @click="addPlantToCrop">
                                  <div style="display: flex; justify-content: center; align-items: center; height: 100%;width: 100%">Add plant</div>
                              </pv-button>
                          </div>
                      </div>
                  </div>
                  <div class="results" v-if="!showDetailsForSearch">
                      <div style="margin: 0 3rem 0 3rem">
                          <h1 style="margin-bottom: 2rem;">Search for a new plant</h1>
                          <div class="card p-fluid" style="margin: 0 3rem 0rem 3rem">
                              <pv-autoComplete v-model="searchNewPlantValue"
                                               :suggestions="searchNewPlantItems"
                                               @complete="newPlantSearch"
                                               @itemSelect="newPlantSearchSelected"
                                               placeholder="What are you looking for?"
                                               class="searchBar" />
                          </div>
                      </div>
                      <div class="inventory">
                          <h2 style="margin-left: 2rem">Results:</h2>
                          <p v-if="currentResultsPlants !== defaultResultsPlants" @click="resetAddPlant()" style="text-decoration: underline; cursor: pointer;margin-top: 1.5rem;margin-left: 1.9rem">Reset search</p>
                          <div class="cards" style="margin-top: 2rem">
                              <div v-for="crop in currentResultsPlants" :key="crop.id">
                                  <pv-card  style="width: 17em; border-radius: 15px;background-color: #171717">
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
                                              <pv-button label="Detail" severity="warning" @click="showDetailsForPlantInSearch(crop)" />
                                          </div>
                                      </template>
                                  </pv-card>
                              </div>

                          </div>
                      </div>
                  </div>
              </div>
          </pv-dialog>
          <pv-dialog v-model:visible="cropDetailsVisible" maximizable modal header="Crop Detail" :style="{ width: '700px' }">
              <div class="addplantbackground">
                  <div class="crop-details">
                      <div style="display: flex; justify-content: space-around;width: 100%">
                          <div>
                              <div class="title">
                                  <h1 class="title-text">{{ currentCrop.name }} Details</h1>
                              </div>
                              <div class="detail">
                                  <p class="detail-text">Scientific name: {{ currentCrop.scientificName }}</p>
                              </div>
                              <div class="detail">
                                  <p class="detail-text">Variety: {{ currentCrop.variety }}</p>
                              </div>
                              <div class="detail-row">
                                  <p class="detail-text">Land type: {{ currentCrop.landType }}</p>
                              </div>
                              <div class="detail-row">
                                  <p class="detail-text">Distance between plants: {{ currentCrop.distanceBetweenPlants }}</p>
                              </div>
                              <div class="detail-row">
                                  <p class="detail-text">Weather conditions: {{ currentCrop.weatherConditions }}</p>
                              </div>
                          </div>
                          <div>
                              <div class="image-container">
                                  <img :src="currentCrop.imageUrl" alt="crop Image" class="centered-image" style="width: 300px">
                              </div>
                          </div>
                      </div>
                      <div style="margin-top: 2rem; display: flex; width: 100%;justify-content: space-around">
                          <pv-button severity="secondary" style="color: white; font-weight: bold; text-align: center;" @click="cropDetailsVisible=!cropDetailsVisible">
                              <div style="display: flex; justify-content: center; align-items: center; font-weight: bold; height: 100%;">To return</div>
                          </pv-button>
                          <pv-button severity="danger" style="width: 10rem; color: white; font-weight: bold;" @click="deleteCrop">
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
            userName: sessionStorage.getItem("name"),
            searchInventorValue: ref(""),
            searchInventorItems: ref([]),
            searchNewPlantValue: ref(""),
            searchNewPlantItems: ref([]),
            newPlantsSearchOptions:[],
            showDropdown: false,
            displayableCrops:[],
            currentCrop:{},
            currentPlantInSearch:{},
            defaultResultsPlants:[],
            visible :false,
            cropDetailsVisible :false,
            showDetailsForSearch:false,
            currentResultsPlants:[],
            currentInventoryResultsPlants:[]


        }
    },
    created(){
        new CropServices().getCropsByFarmerId(sessionStorage.getItem("id")).then(response=>{
            this.getDisplayableCrops(response.data)
        })

    },
    methods:{
        resetInventory(){
          this.currentInventoryResultsPlants=this.displayableCrops
            this.searchInventorValue=""
        },
        resetAddPlant(){
            this.currentResultsPlants = this.defaultResultsPlants
            this.searchNewPlantValue=""
        },
        inventorySearchSelected(){
            for (let i = 0; i < this.currentInventoryResultsPlants.length; i++) {
                if(this.currentInventoryResultsPlants[i].name===this.searchInventorValue){
                    let temp=this.currentInventoryResultsPlants[i]
                    this.currentInventoryResultsPlants=[]
                    this.currentInventoryResultsPlants.push(temp)
                }
            }
        },
        newPlantSearchSelected() {
            for (let i = 0; i < this.currentResultsPlants.length; i++) {
                if(this.currentResultsPlants[i].name===this.searchNewPlantValue){
                    let temp=this.currentResultsPlants[i]
                    this.currentResultsPlants=[]
                    this.currentResultsPlants.push(temp)
                }
            }
        },
        inventorySearch(event) {
            const matchingCrops = this.displayableCrops.filter(crop =>
                crop.name.toLowerCase().includes(this.searchInventorValue.toString().toLowerCase())
            );
            if(matchingCrops.length===0){
                this.currentInventoryResultsPlants=[]
            }else {
                this.searchInventorItems = matchingCrops.map(crop => crop.name);
                this.currentInventoryResultsPlants=matchingCrops
            }
        },
        newPlantSearch(event){
            console.log("Busque: "+this.searchNewPlantValue)
            new PlantServices().getResultsByPlantName(this.searchNewPlantValue).then(response=>{
                this.newPlantsSearchOptions=response.data
                let options=[]
                if(response.data.length===0){
                    this.currentResultsPlants=[]
                }else {
                    for (let i = 0; i < response.data.length; i++) {
                        options.push(response.data[i].name)
                    }
                    this.searchNewPlantItems=options
                    this.currentResultsPlants=this.newPlantsSearchOptions
                }

            })
        },
        getDisplayableCrops(rawCrop){
            for (let i = 0; i < rawCrop.length; i++) {
                new PlantServices().getPlantInfoById(rawCrop[i].plantId).then(response=>{
                    this.displayableCrops.push(response.data)
                })
                this.currentInventoryResultsPlants=this.displayableCrops
            }
        },
        deleteCrop(){
            this.currentInventoryResultsPlants = this.currentInventoryResultsPlants.filter(crop => crop.id !== this.currentCrop.id);
            this.displayableCrops=this.currentInventoryResultsPlants
            this.cropDetailsVisible=!this.cropDetailsVisible
        },
        getAllPlants(){
            new PlantServices().getAllPlants().then(response=>{
                this.defaultResultsPlants=response.data
                this.currentResultsPlants=this.defaultResultsPlants
            })
        },
        showCropDetails(crop) {
            this.cropDetailsVisible=!this.cropDetailsVisible
            this.currentCrop= crop;
        },
        showDetailsForPlantInSearch(crop){
            this.showDetailsForSearch=!this.showDetailsForSearch
            this.currentPlantInSearch=crop;
        },
        findIndexById(id) {
            //return this.rooms.findIndex((room) => room.id === id);
        },
        addPlant(){
            //this.$router.push("/farmer/createCrop")
            this.searchNewPlantValue=""
            this.visible=!this.visible
            this.showDetailsForSearch=false
            this.getAllPlants()
        },
        addPlantToCrop(){
            //this.$router.push("/farmer/createCrop")
            this.visible=!this.visible
            this.showDetailsForSearch=false
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
    color: white; /* Cambiar el color del texto si es necesario */
    border-radius: 15px; /* Agregar bordes redondeados */
    width: 100%;
    padding-top: 1rem;
}

.header {
    margin: 3rem 3rem 1rem 3rem;
    display: flex;
    align-items: center; /* Centra verticalmente los elementos */
}

.searchBar {
    width: 100%; /* Establece el ancho del pv-autoComplete al 100% del contenedor */
}

.inventory{
    padding: 1.5rem;
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

