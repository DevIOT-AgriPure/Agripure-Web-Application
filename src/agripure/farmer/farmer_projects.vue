<template>
<div class="background">
  <div class="header" style="display: flex;justify-content: left;">
    <h1>My projects</h1>
    <div style="width: 40%; display: flex;justify-content: center;margin:  2rem 0 2rem 0">
      <i class="pi pi-search" style="margin-top: 0.5rem; margin-right: 1rem"></i>
    </div>
  </div>

  <div class="card">
    <pv-dataTable :value="projects" tableStyle="min-width: 50rem">
      <template #header>
        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
          <span class="text-xl text-900 font-bold">Products</span>
          <pv-button icon="pi pi-refresh" rounded raised />
        </div>
      </template>
      <pv-column field="name" header="Name"></pv-column>
      <pv-column field="isProjectStarted" header="Status"></pv-column>
      <pv-column field="weeks" header="Duration"></pv-column>
      <pv-column field="description" header="Description"></pv-column>
      <template #footer> In total there are {{ projects ? projects.length : 0 }} products. </template>
    </pv-dataTable>
  </div>
</div>
</template>

<script>
import {ProjectService} from "@/services/project-service";

export default {
    name: "farmer_projects",
    data(){
      return{
        projects:[]
      };
    },
    created(){
      new ProjectService().getProjectByFarmerId(1).then(response=>{
        this.projects=response.data
      })

    },
    methods:{

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
</style>