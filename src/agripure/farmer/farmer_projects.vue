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
                    <template #empty> No projects found. </template>
                    <template #loading> Loading projects data. Please wait. </template>
                    <pv-column field="name" header="Name" style="min-width: 14rem"></pv-column>
                    <pv-column field="durationDays" header="Duration" style="min-width: 7rem">
                        <template #body="{ data }">
                            <p>{{data.durationDays}} days</p>
                        </template>
                    </pv-column>
                    <pv-column field="totalActivities" header="Activities" style="min-width: 7rem">
                        <template #body="{ data }">
                            <pv-button severity="secondary" rounded size="small" @click="openActivities(data.id,data)">{{ data.activitiesDone }}/{{ data.totalActivities }}</pv-button>
                        </template>
                    </pv-column>
                    <pv-column field="isProjectStarted" header="Status" style="min-width: 1rem">
                        <template #body="{ data }">
                            <pv-tag :value="getStatusProject(data.isProjectStarted)" :severity="getSeverity(data.isProjectStarted)" />
                        </template>
                    </pv-column >
                    <pv-column  header="" style="min-width: 1rem">
                        <template #body="{ data }">
                            <pv-button v-if="data.isProjectStarted" label="Details" severity="success" @click="showProjectDetail(data)"  />
                        </template>
                    </pv-column >
                </pv-dataTable>
            </div>
            <pv-dialog v-model:visible="activitiesDialogVisible" maximizable modal header="Activities" :style="{ width: '80vw' }">
                <div class="addplantbackground">
                    <div class="crop-details">
                        <div v-for="activity in currentActivities"
                             :key="activity.id">
                            <pv-accordion>
                                <pv-accordionTab>
                                    <template #header>
                                        <div style="width: 100%;display: flex;justify-content: space-between">
                                            <span>{{ activity.title }}</span>
                                            <pv-tag v-if="activity.completed" severity="success" >Finished</pv-tag>
                                            <pv-tag v-if="!activity.completed" severity="danger" >Pending</pv-tag>
                                        </div>
                                    </template>
                                    <div class="chat-card">
                                        <div class="chat-content" >
                                            <div class="chat-header">
                                                <h3 style="margin-bottom: 0.5rem">{{ activity.description }}</h3>
                                                <pv-checkbox v-model="activity.completed" @click="updateActivity(activity)" :binary="true"/>
                                            </div>
                                            <div style="display: flex;">
                                                <i class="pi pi-calendar" style="margin-right: 1rem"></i>
                                                <p style="width: 50%">{{ activity.date }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </pv-accordionTab>
                            </pv-accordion>
                        </div>
                    </div>
                </div>
            </pv-dialog>
            <pv-dialog v-model:visible="projectDetailsDialogVisible" maximizable modal header="Details" :style="{ width: '80vw' }">
                <div class="addplantbackground">
                    <div class="crop-details">
                        <h1>{{currentProjectDetail.name}}</h1>
                        <h4>{{currentProjectDetail.description}}</h4>
                        <h5>Specialist: {{currentSpecialistForProject.name}}</h5>
                        <h5>Status: {{getStatusProject(currentProjectDetail.isProjectStarted)}}</h5>
                        <h5>Crop: {{currentCropForProject.name}}</h5>
                        <h5>Duration: {{currentProjectDetail.durationDays}} days</h5>
                        <h5>Activities: {{ currentProjectDetail.activitiesDone }} of {{ currentProjectDetail.totalActivities }} done</h5>

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
            projectDetailsDialogVisible:false,
            currentActivities:[],
            currentProjectDetail:{},
            currentProjectForActivities:{},
            currentSpecialistForProject:{},
            currentCropForProject:{}
        };
    },
    created(){
        new ProjectService().getProjectByFarmerId(sessionStorage.getItem("id")).then(response=>{
            this.projects=response.data
            this.setDurationDayToProject()
            this.setActivitysForProject()
        })


    },
    methods:{
        setActivitysForProject(){
            for (let i = 0; i < this.projects.length; i++) {
                new ActivitiesService().getActivitiesByProjectId(this.projects[i].id).then(response=>{
                    let activities=response.data
                    let activitiesDone=0
                    for (let i = 0; i < activities.length; i++) {
                        if(activities[i].completed===true){
                            activitiesDone+=1
                        }
                    }
                    this.projects[i].totalActivities=activities.length
                    this.projects[i].activitiesDone=activitiesDone
                })
            }

        },
        setDurationDayToProject(){
            for (let i = 0; i < this.projects.length; i++) {
                this.projects[i].durationDays=this.calculateDurationDay(this.projects[i].startDate,this.projects[i].endDate)
            }
        },
        calculateDurationDay(start, end) {
            const [startDay, startMonth, startYear] = start.split('/');
            const [endDay, endMonth, endYear] = end.split('/');

            const startDate = new Date(startYear, startMonth - 1, startDay);
            const endDate = new Date(endYear, endMonth - 1, endDay);

            const timeDifference = endDate - startDate;
            const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            return daysDifference;
        },
        updateActivity(activity){
            //update activity by service
            if(activity.completed){
                console.log("Actividad pendiente")
                this.currentProjectForActivities.activitiesDone=parseInt(this.currentProjectForActivities.activitiesDone)-1
            }else {
                console.log("Actividad completa")
                this.currentProjectForActivities.activitiesDone=parseInt(this.currentProjectForActivities.activitiesDone)+1
            }
            this.updateProjectInProjectsById(this.currentProjectForActivities)
        },
        updateProjectInProjectsById(project) {
            this.projects = this.projects.map((p) => {
                if (p.id === project.id) {
                    return project; // Reemplaza el proyecto con el mismo ID
                } else {
                    return p; // Mantén los demás proyectos sin cambios
                }
            });
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
        getStatusProject(status){
            switch (status) {
                case true:
                    return 'Started';

                case false:
                    return 'Pending';
            }
        },
        openActivities(id,project){
            this.currentProjectForActivities=project
            this.activitiesDialogVisible=!this.activitiesDialogVisible
            new ActivitiesService().getActivitiesByProjectId(id).then(response=>{
                this.currentActivities=response.data
            })
        },
        getSpecialistInfo(id){
          new UserServices().getUserById(id).then(res=>{
            this.currentSpecialistForProject=res.data
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