<template>
<div class="background">
  <div class="header" style="display: flex;justify-content: left;">
    <h1>Manage your projects</h1>
  </div>
    <div class="projects">
        <div class="card">
            <pv-dataTable ref="dt"
                          :value="projects"
                          v-model:filters="filters"
                          datakey="id"
                          :paginator="true"
                          :rows="10"
                          :filters="filters"
                          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                          :rowsPerPageOptions="[1, 2, 3]"
                          currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} habitaciones"
                          responsiveLayout="scroll"
                          :globalFilterFields="['name', 'isProjectStarted', 'weeks', 'description']"
                          tableStyle="min-width: 50rem">
                <template #header>
                    <div class="flex justify-content-end">
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <pv-input v-model="filters['global'].value" placeholder="Keyword Search" />
                    </span>
                    </div>
                </template>
                <template #empty> No customers found. </template>
                <template #loading> Loading customers data. Please wait. </template>
                <pv-column field="name" header="Name" style="min-width: 14rem"></pv-column>
                <pv-column field="weeks" header="Duration" style="min-width: 7rem">
                    <template #body="{ data }">
                        <p>{{data.weeks}} weeks</p>
                    </template>
                </pv-column>
                <pv-column field="totalActivities" header="Activities" style="min-width: 7rem">
                    <template #body="{ data }">
                        <pv-button severity="secondary" rounded size="small" @click="openActivities">{{ data.activitiesDone }}/{{ data.totalActivities }}</pv-button>
                    </template>
                </pv-column>
                <pv-column field="progress" header="Progress" style="min-width: 14rem">
                    <template #body="{ data }">
                        <pv-progressBar :value="data.progress" :showValue="false" style="height: 6px"></pv-progressBar>
                    </template>
                </pv-column>
                <pv-column field="isProjectStarted" header="Status" style="min-width: 1rem">
                    <template #body="{ data }">
                        <pv-tag :value="data.isProjectStarted" :severity="getSeverity(data.isProjectStarted)" />
                    </template>
                </pv-column >
                <pv-column  header="" style="min-width: 1rem">
                    <template #body="{ data }">
                        <pv-button label="Details" severity="success" rounded  />
                    </template>
                </pv-column >
            </pv-dataTable>
        </div>
        <pv-dialog v-model:visible="activitiesDialogVisible" maximizable modal header="Crop Detail" :style="{ width: '80vw' }">
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
import { FilterMatchMode } from 'primevue/api';
import {ProjectService} from "@/services/project-service";

export default {
    name: "farmer_projects",
    data(){
      return{
        projects:[],
          selectedProjects:[],
          filters: {
              global: { value: null, matchMode: FilterMatchMode.CONTAINS },
              name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
              description: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
              weeks: { value: null, matchMode: FilterMatchMode.IN },
              isProjectStarted: { value: null, matchMode: FilterMatchMode.EQUALS },
              verified: { value: null, matchMode: FilterMatchMode.EQUALS }
          },
          activitiesDialogVisible:false
      };
    },
    created(){
      new ProjectService().getProjectByFarmerId(1).then(response=>{
        this.projects=response.data
      })

    },
    methods:{
        getSeverity(status) {
            switch (status) {
                case true:
                    return 'success';

                case false:
                    return 'danger';
            }
        },
        openActivities(){
            this.activitiesDialogVisible=!this.activitiesDialogVisible
            
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
</style>