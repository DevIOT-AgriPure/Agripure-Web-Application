<template>
  <div class="background">
    <div class="header" style="display: flex;justify-content: left;">
      <h1>Manage your devices</h1>
    </div>
    <div class="projects">
      <div class="card">
        <pv-dataTable ref="dt"
                      :value="devices"
                      v-model:filters="filters"
                      datakey="id"
                      :paginator="true"
                      :rows="10"
                      :filters="filters"
                      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                      :rowsPerPageOptions="[1, 2, 3]"
                      currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} habitaciones"
                      responsiveLayout="scroll"
                      :globalFilterFields="['name', 'model', 'active', 'category']"
                      tableStyle="min-width: 50rem">
          <template #header>
            <div style="display: flex; width: 100%; justify-content: space-between ">
              <pv-button severity="primary" >Add a device</pv-button>
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <pv-input v-model="filters['global'].value" placeholder="Keyword Search" />
                    </span>
            </div>
          </template>
          <template #empty> No devices found. </template>
          <template #loading> Loading devices data. Please wait. </template>
          <pv-column field="name" header="Name" style="min-width: 14rem"></pv-column>
          <pv-column field="cropName" header="Plant" style="min-width: 14rem"></pv-column>
          <pv-column  header="Active" style="min-width: 1rem">
            <template #body="{ data }">
              <pv-inputSwitch v-model="data.active" />
            </template>
          </pv-column >
          <pv-column  header="" style="min-width: 1rem">
            <template #body="{ data }">
              <pv-button style="margin-right: 1rem" icon="pi pi-info" severity="warning" rounded aria-label="Information" @click="openInfoDeviceDialog(data)"/>
              <pv-button icon="pi pi-trash" severity="danger" rounded aria-label="Delete" @click="openDeleteDeviceDialog(data)"/>
            </template>
          </pv-column >
        </pv-dataTable>
      </div>
      <pv-dialog v-model:visible="deleteDeviceDialogVisible"  modal header="Delete device" :style="{ width: '30vw' }">
        <div class="addplantbackground">
          <h3 style="margin: 0rem 2rem 2rem 2rem">¿ Are you sure you want delete this device ?</h3>
          <div style="display: flex;justify-content: space-around">
            <pv-button label="Yes" severity="success" @click="deleteDevice()"/>
            <pv-button label="No" severity="danger" @click="deleteDeviceDialogVisible=!deleteDeviceDialogVisible"/>
          </div>
        </div>
      </pv-dialog>
      <pv-dialog v-model:visible="deviceDialogVisible" maximizable modal header="Details" :style="{ width: '80vw' }">
        <div class="addplantbackground">
          <div class="crop-details">
            <h1>{{currentDeviceForInfo.name}}</h1>
            <h4>{{currentDeviceForInfo.model}}</h4>
            <h5>Crop: {{currentDeviceForInfo.cropName}}</h5>
            <div>
              <h5>Status: </h5>
              <pv-tag :value="getDeviceStatus(currentDeviceForInfo.active)" :severity="getSeverity(currentDeviceForInfo.active)" />
            </div>
            <h5>Project: {{currentCropForProject.name}}</h5>

          </div>
        </div>
      </pv-dialog>
    </div>
  </div>
</template>

<script>
import { FilterMatchMode } from 'primevue/api';
import {ProjectService} from "@/services/project-service";
import {ActivitiesService} from "@/services/activities-service";
import {SpecialistServices} from "@/services/specialists-service";
import {PlantServices} from "@/services/plant-service";
import {CropServices} from "@/services/crop-service";
import {UserServices} from "@/services/user-service";
import {DeviceServices} from "@/services/device-service";

export default {
  name: "farmer_devices",
  data(){
    return{
      devices:[],
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        description: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        weeks: { value: null, matchMode: FilterMatchMode.IN },
        isProjectStarted: { value: null, matchMode: FilterMatchMode.EQUALS },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS }
      },
      deviceDialogVisible:false,
      deleteDeviceDialogVisible:false,
      currentActivities:[],
      currentProjectDetail:{},
      currentSpecialistForProject:{},
      currentCropForProject:{},
      currentDeviceForDelete:{},
      currentDeviceForInfo:{}
    };
  },
  created(){
    new DeviceServices().getAllDevicesByUserId(1).then(response=>{
      this.devices=response.data
    })

  },
  methods:{
    openDeleteDeviceDialog(device){
      this.currentDeviceForDelete=device
      this.deleteDeviceDialogVisible=!this.deleteDeviceDialogVisible
    },
    openInfoDeviceDialog(device){
      this.currentDeviceForInfo=device
      this.deviceDialogVisible=!this.deviceDialogVisible
    },
    deleteDevice(){

    },
    getSeverity(status) {
      switch (status) {
        case true:
          return 'success';

        case false:
          return 'danger';
      }
    },
    showProjectDetail(project){
      this.getSpecialistInfo(project.specialistId)
      this.getCropInfo(project.cropId)
      this.currentProjectDetail=project
      this.projectDetailsDialogVisible=!this.projectDetailsDialogVisible

    },
    getDeviceStatus(status){
      switch (status) {
        case true:
          return 'On';

        case false:
          return 'Off';
      }
    },
    openActivities(id){
      this.activitiesDialogVisible=!this.activitiesDialogVisible
      new ActivitiesService().getActivitiesByProjectId(id).then(response=>{
        this.currentActivities=response.data
      })
    },
    getSpecialistInfo(id){
      new SpecialistServices().getSpecialistInformationById(id).then(response=>{
        new UserServices().getUserById(response.data.userId).then(res=>{
          this.currentSpecialistForProject=res.data
          console.log("SPCname is: "+this.currentSpecialistForProject.name)
        })
      })
    },
    getCropInfo(cropId){
      new CropServices().getCropInfoById(cropId).then(response=>{
        new PlantServices().getPlantInfoById(response.data.plantId).then(resp=>{
          this.currentCropForProject=resp.data
          console.log("name is: "+this.currentCropForProject.name)
        })
      })
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
.header {
  margin: 3rem 3rem 1rem 3rem;
  display: flex;
  align-items: center; /* Centra verticalmente los elementos */
}
.projects{
  padding: 1.5rem;
}

.chat-card {
  display: flex;
  align-items: center;
  background-color: #1c1c1c; /* Color de fondo negro */
  color: white; /* Color de texto blanco */
  border-radius: 10px; /* Bordes redondos */
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
  margin-bottom: 1rem;
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