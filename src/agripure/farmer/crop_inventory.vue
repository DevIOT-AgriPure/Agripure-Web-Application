<template>
  <div class="background" >
    <div class="header">
        <h1>Good morning {{username}}!</h1>
        <div class="card p-fluid">
            <pv-autoComplete
                    v-model="value"
                    :suggestions="items"
                    @complete="search"
                    placeholder="Search for plants"
                    style="margin-left: 5rem"
                    class="searchBar"/>
        </div>

    </div>
  </div>
</template>

<script>
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
        }
    },
    methods:{
        search(event){
            console.log("hola")
            this.items = [...Array(10).keys()].map((item) => this.value + '-' + item);
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
}
.header{
    margin: 2rem;
    margin-left: 3rem;
    display: flex;
}
.searchBar{

}
</style>

