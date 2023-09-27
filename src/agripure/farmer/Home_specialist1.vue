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
            v-for="card in cards"
            :key="card.id"
            :to="'/info/' + card.id"
          >
            <pv-card style="width: 17em; border-radius: 15px;">
              <template #header>
                <img
                  alt="user header"
                  :src="card.image"
                  style="width: 100%; height: 150px; border-radius: 15px;"
                />
              </template>
              <template #title>{{ card.title }}</template>
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
import {SpecialistServices} from "../../services/specialists-service"
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
      cards: [
        {
          id: 1,
          image:
            "https://static.albertafarmexpress.ca/wp-content/uploads/2022/11/10152211/on-farm-trials-boychyn-supplied.jpeg",
          title: "Cesar Paredes",
          content: "Contenido de la tarjeta 1",
        },
        {
          id: 2,
          image:
            "https://as2.ftcdn.net/v2/jpg/05/12/12/07/1000_F_512120707_OjneMPioROqdKGXiHJbQy9xVKKXdDX6b.jpg",
          title: "Susana Suarez",
          content: "Contenido de la tarjeta 2",
        },
        {
          id: 3,
          image:
            "https://static.albertafarmexpress.ca/wp-content/uploads/2022/07/19174144/Baarda-Lewis.jpeg",
          title: "Adriano Vilca",
          content: "Contenido de la tarjeta 3",
        },
      ],
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
            console.log(this.displayableContacts)
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
  display: center;
  flex-wrap: wrap;
  gap: 90px;
  justify-content: space-between;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.button {
  margin-top: 20px;
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
