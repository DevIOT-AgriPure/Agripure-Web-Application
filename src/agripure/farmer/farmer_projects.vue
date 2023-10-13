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
                        <pv-button severity="secondary" rounded size="small" @click="openActivities(data.id)">{{ data.activitiesDone }}/{{ data.totalActivities }}</pv-button>
                    </template>
                </pv-column>
                <pv-column field="progress" header="Progress" style="min-width: 14rem">
                    <template #body="{ data }">
                        <pv-progressBar :value="data.progress" :showValue="false" style="height: 6px"></pv-progressBar>
                    </template>
                </pv-column>
                <pv-column field="isProjectStarted" header="Status" style="min-width: 1rem">
                    <template #body="{ data }">
                        <pv-tag :value="getStatusProject(data.isProjectStarted)" :severity="getSeverity(data.isProjectStarted)" />
                    </template>
                </pv-column >
                <pv-column  header="" style="min-width: 1rem">
                    <template #body="{ data }">
                        <pv-button v-if="data.isProjectStarted" label="Details" severity="success" rounded  />
                        <pv-button v-if="!data.isProjectStarted" label="Start" severity="success" rounded  />
                    </template>
                </pv-column >
            </pv-dataTable>
        </div>
        <pv-dialog v-model:visible="activitiesDialogVisible" maximizable modal header="Activities" :style="{ width: '80vw' }">
            <div class="addplantbackground">
                <div class="crop-details">
                    <div v-for="activities in currentActivities"
                         :key="activities.id">
                        <pv-accordion>
                            <pv-accordionTab>
                                <template #header>
                                    <div style="width: 100%;display: flex;justify-content: space-between">
                                        <span>{{ activities.title }}</span>
                                        <pv-tag v-if="activities.completed" severity="success" >Finished</pv-tag>
                                        <pv-tag v-if="!activities.completed" severity="danger" >Pending</pv-tag>
                                    </div>
                                </template>
                                <div class="chat-card">
                                    <div class="chat-content" >
                                        <div class="chat-header">
                                            <h3 style="margin-bottom: 0.5rem">{{ activities.description }}</h3>
                                            <pv-checkbox v-model="activities.completed" :binary="true"/>
                                        </div>
                                        <div style="display: flex;">
                                            <i class="pi pi-calendar" style="margin-right: 1rem"></i>
                                            <p style="width: 50%">{{ activities.date }}</p>
                                        </div>
                                    </div>
                                </div>
                            </pv-accordionTab>
                        </pv-accordion>
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

export default {
    name: "farmer_projects",
    data(){
      return{
        projects:[],
          filters: {
              global: { value: null, matchMode: FilterMatchMode.CONTAINS },
              name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
              description: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
              weeks: { value: null, matchMode: FilterMatchMode.IN },
              isProjectStarted: { value: null, matchMode: FilterMatchMode.EQUALS },
              verified: { value: null, matchMode: FilterMatchMode.EQUALS }
          },
          activitiesDialogVisible:false,
          currentActivities:[],
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
        getStatusProject(status){
            switch (status) {
                case true:
                    return 'Started';

                case false:
                    return 'Pending';
            }
        },
        openActivities(id){
            this.activitiesDialogVisible=!this.activitiesDialogVisible
            new ActivitiesService().getActivitiesByProjectId(id).then(response=>{
                this.currentActivities=response.data
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