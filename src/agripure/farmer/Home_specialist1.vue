<template>
  <div class="background">
    <div class="container">
      <div class="header">
        <h1>Good Morning {{ username }}</h1>
        <div class="search-container">
          <div class="searchBar-container">
            <pv-autoComplete
              v-model="value"
              :suggestions="items"
              @complete="search"
              placeholder="Buscar"
              class="searchBar"
            />
          </div>
          <i class="pi pi-search"></i>
        </div>
      </div>
      <div class="inventory" style="margin-bottom: 20px;">
        <h2 style="margin: 2rem 0 2rem 0">Contactos:</h2>
        <div class="cards">
          <router-link
                  v-for="contact in displayableContacts"
                  :key="contact.id"
                  :to="'/info/' + contact.id">
            <pv-card style="width: 17em; border-radius: 15px;">
              <template #header>
                <img
                  alt="user header"
                  :src="contact.imageUrl"
                  style="width: 100%; height: 150px; border-radius: 15px;"
                />
              </template>
              <template #title>{{ contact.name }}</template>
              <template #footer>
                <div class="button-container">
                  <pv-button label="Detalle" class="green-button" />
                </div>
              </template>
            </pv-card>
          </router-link>
        </div>
      </div>
      <div class="button">
        <pv-button label="Buscar más especialistas" class="green-button" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import {ContactServices} from "../../services/contacts-service"
import {UserServices} from "../../services/user-service"

export default {
  name: "Home_specialist",
  data() {
    return {
      token: sessionStorage.getItem("jwt"),
      username: "Huell",
      value: ref(""),
      items: ref([]),
      showDropdown: false,
        displayableContacts:[]
    };
  },
    created() {
      new ContactServices().getContactsForFarmer(1).then(response=>{
          this.getDisplayableContacts(response.data)
      })
    },
    methods: {
    search(event) {
      console.log("hola");
      this.items = [...Array(10).keys()].map((item) => this.value + "-" + item);
    },
        getDisplayableContacts(rawContacts){
            for (let i = 0; i < rawContacts.length; i++) {
                new UserServices().getUserById(rawContacts[i].specialistId).then(response=>{
                    this.displayableContacts.push(response.data)
                })
            }
        }
  },
};
</script>

<style scoped>
.background {
  background-color: #242424;
  padding: 70px;
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 20px;
    width: 100%;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.search-container {
  display: flex;
  align-items: center;
}

.searchBar-container {
  width: 200px;
  margin-left: 10px;
}

.searchBar {
  width: 100%;
}

.inventory {
  margin-bottom: 200px;
  flex-wrap: wrap;
  gap: 90px;
  justify-content: space-between;
}

.cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(17em, 1fr)); /* 3 columnas y tamaño mínimo de 17em */
    gap: 2rem; /* Espacio entre las cartas */
    justify-items: center; /* Centra las cartas horizontalmente */
    margin-top: 2rem;
}

.button {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}

.button-container {
  display: flex;
  justify-content: center;
}

.pi {
  color: white;
}

.green-button {
  background-color: green;
  color: white;
}
</style>
