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
                        <div class="flex" style="justify-content: space-between">
                            <span class="p-input-icon-left">
                              <pv-button label="Create project" severity="success" @click="createProject()"  />
                            </span>
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <pv-input v-model="filters['global'].value" placeholder="Keyword Search" />
                    </span>
                        </div>
                    </template>
                    <template #empty> No projects found. </template>
                    <template #loading> Loading projects data. Please wait. </template>
                    <pv-column field="name" header="Name" style="min-width: 7rem"></pv-column>
                    <pv-column field="farmerName" header="Farmer" style="min-width: 7rem">
                    </pv-column>
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
                            <pv-button v-if="data.isProjectStarted" label="Details" severity="success" @click="showProjectDetail(data)"  />
                            <pv-button v-if="!data.isProjectStarted" label="Start" severity="success"   />
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
            <pv-dialog v-model:visible="projectDetailsDialogVisible" maximizable modal header="Details" :style="{ width: '80vw' }">
                <div class="addplantbackground">
                    <div class="crop-details">
                        <h1>{{currentProjectDetail.name}}</h1>
                        <h4>{{currentProjectDetail.description}}</h4>
                        <h5>Specialist: {{currentSpecialistForProject.name}}</h5>
                        <h5>Status: {{getStatusProject(currentProjectDetail.isProjectStarted)}}</h5>
                        <h5>Crop: {{currentCropForProject.name}}</h5>
                        <h5>Duration: {{currentProjectDetail.weeks}}</h5>
                        <h5>Activities: {{ currentProjectDetail.activitiesDone }} of {{ currentProjectDetail.totalActivities }} done</h5>
                        <h5>Progress: {{ currentProjectDetail.progress }} %</h5>

                    </div>
                </div>
            </pv-dialog>
            <pv-dialog v-model:visible="createProjectVisible" maximizable modal header="Create a project" :style="{ width: '70vw' }">
                <div class="addplantbackground">
                    <div v-if="selectionStep">
                        <div v-if="!stepContactSelected">
                            <div style="display:flex; justify-content: center">
                                <h2 style="margin-bottom: 2rem">SELECT A CONTACT</h2>
                            </div>
                            <pv-dropdown v-model="selectedContact" class="w-full md:w-14rem" editable :options="currentContactForSpecialist"
                                         optionLabel="name" placeholder="Select a contact" @change="getCropForProject()"/>
                        </div>
                        <div v-if="stepContactSelected">
                            <div style="display:flex; justify-content: center">
                                <h2 style="margin: 2rem 2rem 2rem 0">SELECT A CROP</h2>
                            </div>
                            <pv-dropdown :disabled="selectedContact===null" class="w-full md:w-14rem" v-model="selectedCrop" editable :options="currentCropsForFarmer"
                                         optionLabel="name" placeholder="Select a crop" />
                        </div>
                    </div>
                    <div v-if="informationStep">
                        <div style="display:flex; justify-content: center">
                            <h2 style="margin: 0rem 2rem 2rem 0">INFORMATION</h2>
                        </div>
                        <span style="margin: 2rem 2rem 2rem 0" class="p-float-label">
                        <pv-input  v-model="projectName" class="w-full md:w-14rem"/>
                        <label >Project name</label>
                    </span>
                        <span style="margin: 2rem 2rem 2rem 0" class="p-float-label">
                        <pv-textArea  v-model="projectDescription" class="w-full md:w-14rem" />
                        <label>Project description</label>
                    </span>
                    </div>
                    <div v-if="dateStep">
                        <h2 style="margin: 0rem 2rem 2rem 0">Duracion del proyecto</h2>
                        <p style="margin: 2rem 2rem 2rem 0">Fecha de inicio</p>
                        <div class="card flex justify-content-center">
                            <pv-calendar v-model="startProjectDate" date-format="dd/mm/yy" class="w-full md:w-14rem" @dateSelect="formatDate()" :minDate="startProjectMinDate" :manualInput="false" />
                        </div>
                        <p style="margin: 2rem 2rem 2rem 0">Fecha de finalizacion</p>
                        <div class="card flex justify-content-center">
                            <pv-calendar v-model="finishProjectDate" date-format="dd/mm/yy" class="w-full md:w-14rem" :minDate="startProjectDate" :manualInput="false" />
                        </div>
                    </div>
                    <div v-if="taskStep">
                        <h2 style="margin: 0rem 2rem 2rem 0">Add tasks</h2>
                        <div style="display: flex;justify-content: space-around">
                            <div style="width: 50%">
                               <span style="margin: 0 2rem 0 0" class="p-float-label">
                                <pv-input class="w-full md:w-14rem" v-model="taskName" />
                                <label>Nombre</label>
                               </span>
                                <span style="margin: 1.5rem 2rem 0 0" class="p-float-label">
                                  <pv-textArea class="w-full md:w-14rem" rows="3" cols="15" v-model="taskDescription" />
                                  <label>Description</label>
                                </span>
                                <div style="display: flex;justify-content: center; width: 93%">
                                    <pv-button style="margin-top: 1rem; width: 100%"  label="Add" severity="success" @click="addTask()"/>
                                </div>
                                <div class="task-grid">
                                    <div class="task-icon" v-for="task in taskForProject">
                                        <div class="calendar-day">{{ formatCardDate(task.date) }}</div>
                                        <div class="task-name">{{ task.name }}</div>
                                    </div>
                                </div>
                            </div>
                            <div style="width: 50%">
                                <div class="card flex justify-content-center">
                                    <pv-calendar  v-model="activityProjectDate" :minDate="startProjectDate" :maxDate="finishProjectDate" inline showWeek />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex;justify-content: space-between; margin: 2rem 1rem 0 1rem">
                        <pv-button v-if="!stepContactSelected" label="Cancel" severity="danger" @click="addTask()"  />
                        <pv-button v-if="stepContactSelected" label="Previous" severity="secondary" @click="stepContactSelected=!stepContactSelected"  />
                        <pv-button label="Next" severity="success" @click="addProjectStepNext()"/>
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
import {ContactServices} from "@/services/contacts-service";

export default {
    name: "farmer_projects",
    data(){
        return{
            selectionStep:true,
            informationStep:false,
            dateStep:false,
            taskStep:false,
            stepContactSelected:false,
            startProjectDate: null,
            startProjectMinDate: null,
            finishProjectDate: null,
            activityProjectDate: null,
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
            createProjectVisible:false,
            currentActivities:[],
            currentProjectDetail:{},
            currentSpecialistForProject:{},
            currentCropForProject:{},
            currentContactForSpecialist:[],
            currentCropsForFarmer:[],
            selectedContact: null,
            selectedCrop: null,
            projectName:"",
            projectDescription:"",
            taskName:"",
            taskDescription:"",
            taskForProject:[],
        };
    },
    created(){
        this.startProjectMinDate = new Date();
        new ProjectService().getProjectsBySpecialistId(1).then(response=>{
            this.projects=response.data
            this.setFarmerDataToProject()
        })
    },
    methods:{
        addProjectStepNext(){
            if(this.dateStep){
                this.dateStep = false
                this.taskStep=true
            }
            if(this.informationStep){
                this.informationStep = false
                this.dateStep = true
            }
            if(this.selectionStep){
                if(this.stepContactSelected){
                    this.selectionStep=false
                    this.informationStep=true
                }else{
                    this.stepContactSelected=true
                }
            }


        },
        formatCardDate(date) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            return `${day}`;
        },
        formatPeruvianDate(date) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        },
        addTask(){
            let newTask= {}
            newTask.name=this.taskName
            newTask.description=this.taskDescription
            newTask.date=this.activityProjectDate
            this.taskForProject.push(newTask)
        },
        getCropForProject(){
            this.currentCropsForFarmer=[]
            new CropServices().getCropsByFarmerId(this.selectedContact.id).then(response=>{
                let cropsForFarmer=response.data
                for (let i = 0; i < cropsForFarmer.length; i++) {
                    new PlantServices().getPlantInfoById(cropsForFarmer[i].plantId).then(res=>{
                        this.currentCropsForFarmer.push(res.data)
                    })
                }
            })
        },
        createProject(){
            this.currentContactForSpecialist=[]
            new ContactServices().getContactsForSpecialist(2).then(response=>{
                let rawContact=response.data
                for (let i = 0; i < rawContact.length; i++) {
                    new UserServices().getUserById(rawContact[i].farmerId).then(response=>{
                        this.currentContactForSpecialist.push(response.data)
                    })
                }
            })
            this.createProjectVisible=!this.createProjectVisible
        },
        getSeverity(status) {
            switch (status) {
                case true:
                    return 'success';

                case false:
                    return 'danger';
            }
        },
        setFarmerDataToProject(){
            for (let i = 0; i < this.projects.length; i++) {
                new UserServices().getUserById(this.projects[i].farmerId).then(response=>{
                    this.projects[i].farmerName=response.data.name
                    this.projects[i].farmerImageUrl=response.data.imageUrl
                })
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
    },
}
</script>

<style scoped>
.task-grid {
    margin-top: 1rem;
    margin-right: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(60px, 1fr)); /* Ajusta el ancho de las columnas según tus necesidades */
    gap: 10px; /* Espacio entre las tarjetas */
    max-height: 180px; /* Establece la altura máxima según tus necesidades */
    overflow-y: auto; /* Habilita el desplazamiento vertical */
}

.task-icon {
    background-color: #0e0e0e;
    color: white;
    border-radius: 5px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    padding: 10px;
    text-align: center;
}

.calendar-day {
    font-size: 20px;
    font-weight: bold;
}

.task-name {
    font-size: 10px;
    margin-top: 5px;
}

/* Ajusta los estilos según tus preferencias */


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