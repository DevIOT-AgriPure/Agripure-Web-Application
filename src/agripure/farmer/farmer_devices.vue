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
                      tableStyle="min-width: 10rem">
          <template #header>
            <div style="display: flex; width: 100%; justify-content: space-between ">
              <pv-button severity="primary" style=" font-weight: bold" @click="addNewDevice()">Add a device</pv-button>
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <pv-input v-model="filters['global'].value" placeholder="Keyword Search" />
                    </span>
            </div>
          </template>
          <template #empty> No devices found. </template>
          <template #loading> Loading devices data. Please wait. </template>
          <pv-column field="name" header="Name" style="min-width: 1rem"></pv-column>
          <pv-column field="cropName" header="Plant" style="min-width: 5rem"></pv-column>
          <pv-column  header="Active" style="min-width: 1rem">
            <template #body="{ data }">
              <pv-inputSwitch v-model="data.active" />
            </template>
          </pv-column >
          <pv-column  header="" style="min-width: 1rem">
            <template #body="{ data }">
                <div style="display: flex;justify-content: space-evenly">
                    <pv-button style="margin-right: 1rem" label="Info" severity="warning" aria-label="Information" @click="openInfoDeviceDialog(data)"/>
                    <pv-button icon="pi pi-trash" severity="danger" rounded aria-label="Delete" @click="openDeleteDeviceDialog(data)"/>
                </div>
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
              <h1 style="margin: 1rem ">{{currentDeviceForInfo.name}}</h1>
              <h4 style="margin: 1rem ">Model: {{currentDeviceForInfo.model}}</h4>
            <h5 style="margin: 1rem ">Crop: {{currentDeviceForInfo.cropName}}</h5>
            <h5 style="margin: 1rem " v-if="currentDeviceForInfo.projectId!==0">Project: {{currentDeviceForInfo.projectName}}</h5>
              <div style="margin: 1rem ">
                  <pv-tag :value="getDeviceStatus(currentDeviceForInfo.active)" :severity="getSeverity(currentDeviceForInfo.active)" />

              </div>


          </div>
        </div>
      </pv-dialog>
        <pv-dialog v-model:visible="addDeviceDialogVisible" maximizable modal header="Add Devices" :style="{ width: '80vw' }">
            <div class="addplantbackground">
                <div class="crop-details">
                    <div v-for="device in devicesCataloge">
                        <div style="display: flex;justify-content: left; padding: 1rem">
                            <img :src="device.imageUrl" alt="" style="width: 100px; height: 100px;border-radius: 1rem; margin-right: 1.5rem">
                            <div style="display: flex; width: 100%;justify-content: space-between">
                                <div>
                                    <h2 style="margin: 0.5rem 0">{{device.model}}</h2>
                                    <h3 style="margin: 0.2rem 0">{{device.category}}</h3>
                                    <h4>S/. {{device.price}}</h4>
                                </div>
                                <div style="display: flex; align-items: center;">
                                    <pv-button label="Add" />
                                </div>

                            </div>
                        </div>
                    </div>
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
import {DeviceCatalogeServices} from "@/services/devicesCataloge-service";

export default {
  name: "farmer_devices",
  data(){
    return{
      devices:[],
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          cropName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        active: { value: null, matchMode: FilterMatchMode.IN },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS }
      },
      deviceDialogVisible:false,
      deleteDeviceDialogVisible:false,
        addDeviceDialogVisible:false,
      currentCropForProject:{},
      currentDeviceForDelete:{},
      currentDeviceForInfo:{},
        devicesCataloge:{},
    };
  },
  created(){
    new DeviceServices().getAllDevicesByUserId(sessionStorage.getItem("id")).then(response=>{
      this.devices=response.data
    })

  },
  methods:{
      returnDisplayableSpecification(specification){
          if (specification) {
              return specification.replace(/\$/g, ' - ');
          } else {
              return '';
          }
      },
      returnProjectName(id){
        new ProjectService().getProjectById(id).then(response=>{
            return response.data.name.toString()
        })
      },
      addNewDevice(){
          new DeviceCatalogeServices().getAllDevices().then(response=>{
              this.devicesCataloge=response.data
              this.addDeviceDialogVisible=!this.addDeviceDialogVisible
          })
      },
    openDeleteDeviceDialog(device){
      this.currentDeviceForDelete=device
      this.deleteDeviceDialogVisible=!this.deleteDeviceDialogVisible
    },
    openInfoDeviceDialog(device){
      this.currentDeviceForInfo=device
        new ProjectService().getProjectById(device.projectId).then(response=>{
            this.currentDeviceForInfo.projectName= response.data.name.toString()
        })
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