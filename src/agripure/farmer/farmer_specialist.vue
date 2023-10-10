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
          <div v-for="contact in displayableContacts" :key="contact.id">
            <pv-card style="width: 17em; border-radius: 15px;">
              <template #header>
                <img
                    alt="user header"
                    :src="contact.imageUrl"
                    style="margin: 1em; width: 15em; height: 150px; border-radius: 15px;"
                />
              </template>
              <template #title>{{ contact.name }}</template>
              <template #footer>
                <div style="display: flex; justify-content: center">
                  <pv-button label="Detail" severity="warning" @click="showSpecialistDetails(contact)" />
                </div>
              </template>
            </pv-card>
          </div>
          <pv-card style="width: 17em; border-radius: 15px;">
            <template #content>
              <pv-button text @click="addPlant" style="border-radius: 15px; width: 100%; height: 17rem; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <h3 style="margin: 0;">SEARCH MORE SPECIALIST</h3>
              </pv-button>
            </template>
          </pv-card>
        </div>
      </div>
      <pv-dialog v-model:visible="contactDetailsVisible" maximizable modal header="Specialist Detail" :style="{ width: '80vw' }">
        <div class="addplantbackground">
          <div class="agriculture-specialist-details">
            <div class="title">
              <h1 class="title-text">Agriculture Specialist Details</h1>
            </div>
            <div class="detail">
              <p class="detail-text">Name: {{ currentContact.name }}</p>
            </div>
            <div class="detail">
              <p class="detail-text">Expertise: {{ currentContact.expertise }}</p>
            </div>
            <div class="image-container">
              <img
                  :src="currentContact.imageUrl"
                  alt="Specialist Image"
                  class="centered-image"
              />
            </div>
            <div class="detail-row">
              <p class="detail-text">Location: {{ currentContact.location }}</p>
            </div>
            <div class="divider"></div>
            <div class="detail-row">
              <p class="detail-text">Contact Email: {{ currentContact.contactEmail }}</p>
            </div>
            <div class="divider"></div>
            <div class="detail-row">
              <p class="detail-text">Areas of Focus: {{ currentContact.areasOfFocus }}</p>
            </div>
            <div class="button-row">
              <pv-button class="green-button" @click="contactSpecialist">Contactar Especialista</pv-button>
            </div>
          </div>
        </div>
      </pv-dialog>

    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import {ContactServices} from "../../services/contacts-service"
import {UserServices} from "../../services/user-service"
import {SpecialistServices} from "@/services/specialists-service";

export default {
  name: "Farmer_specialist",
  data() {
    return {
      token: sessionStorage.getItem("jwt"),
      username: "Huell",
      value: ref(""),
      items: ref([]),
      showDropdown: false,
      displayableContacts:[],
      contactDetailsVisible: false,
      currentContact:{}
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
    },
    showSpecialistDetails(contact) {
      console.log(contact)
      this.loadSpecialistDetails(contact.id)
      this.contactDetailsVisible=!this.contactDetailsVisible
      this.currentContact= contact;
    },
    loadSpecialistDetails(id) {
      new SpecialistServices().getSpecialistInformationByUserId(id).then(response=>{
        this.currentContact.expertise=response.data[0].expertise
        this.currentContact.contactEmail = response.data[0].contactEmail
        this.currentContact.areasOfFocus= response.data[0].areasOfFocus
      })
    },
    contactSpecialist() {
      this.$router.push("/chat/" + this.currentContact.id)
    },
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
