<template>
  <div class="background">
    <div class="container">
      <div class="header" style="display: flex;justify-content: left;">
        <h1>Good morning {{ userName }}!</h1>
        <div style="width: 40%; display: flex;justify-content: center;margin:  2rem 0 2rem 0">
          <i class="pi pi-search" style="margin-top: 0.5rem; margin-right: 1rem"></i>
          <div class="card p-fluid" style="width: 80%">
            <pv-autoComplete v-model="searchContactValue"
                             :suggestions="searchContactItems"
                             @complete="contactSearch"
                             @itemSelect="contactSearchSelected"
                             placeholder="Search a contact"
                             class="searchBar"
            />
          </div>
        </div>
      </div>
      <div class="inventory" style="margin-bottom: 20px;">
        <h2 style="margin: 2rem 0 2rem 0">Contacts:</h2>
        <p v-if="currentContactResultsSpecialists !== displayableContacts" @click="resetContacts()" style="text-decoration: underline; cursor: pointer;margin-top: 1.5rem">Reset search</p>
        <div class="cards">
          <div v-for="contact in currentContactResultsSpecialists" :key="contact.id">
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
              <pv-button text @click="addSpecialist" style="border-radius: 15px; width: 100%; height: 17rem; display: flex; flex-direction: column; justify-content: center; align-items: center;">
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
                  style="height: 15rem; border-radius: 1rem;"
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
              <pv-button class="green-button" @click="contactSpecialist">Contact</pv-button>
            </div>
          </div>
        </div>
      </pv-dialog>
      <pv-dialog v-model:visible="addSpecialistVisible" maximizable modal header="Contact a Specialist" :style="{ width: '80vw' }">
        <div class="addplantbackground" >
          <div class="detail" v-if="showDetailsForSearch">
            <div class="agriculture-specialist-details">
              <div class="title">
                <h1 class="title-text">Agriculture Specialist Details</h1>
              </div>
              <div class="detail">
                <p class="detail-text">Name: {{ currentSpecialistInSearch.name }}</p>
              </div>
              <div class="detail">
                <p class="detail-text">Expertise: {{ currentSpecialistInSearch.expertise }}</p>
              </div>
              <div class="image-container">
                <img
                    :src="currentSpecialistInSearch.imageUrl"
                    alt="Specialist Image"
                    class="centered-image"
                />
              </div>
              <div class="detail-row">
                <p class="detail-text">Location: {{ currentSpecialistInSearch.location }}</p>
              </div>
              <div class="divider"></div>
              <div class="detail-row">
                <p class="detail-text">Contact Email: {{ currentSpecialistInSearch.contactEmail }}</p>
              </div>
              <div class="divider"></div>
              <div class="detail-row">
                <p class="detail-text">Areas of Focus: {{ currentSpecialistInSearch.areasOfFocus }}</p>
              </div>
              <div class="button-row">
                <pv-button severity="secondary" style="margin-right: 3rem; color: white; font-weight: bold; text-align: center;" @click="showDetailsForSearch=!showDetailsForSearch">
                  <div style="display: flex; justify-content: center; align-items: center; font-weight: bold; height: 100%;">cancel</div>
                </pv-button>
                <pv-button style="width: 15rem; color: white; font-weight: bold;" @click="sendRequestToSpecialist">
                  <div style="display: flex; justify-content: center; align-items: center; height: 100%;width: 100%">Send request</div>
                </pv-button>
              </div>
            </div>
          </div>
          <div class="results" v-if="!showDetailsForSearch">
            <div style="margin: 0 3rem 3rem 3rem">
              <h1 style="margin-bottom: 2rem;">Search for a new specialist</h1>
              <div class="card p-fluid" style="margin: 0 3rem 4rem 3rem">
                <pv-autoComplete v-model="searchNewSpecialistValue"
                                 :suggestions="searchNewSpecialistItems"
                                 @complete="newSpecialistSearch"
                                 @itemSelect="newSpecialistSearchSelected"
                                 placeholder="What are you looking for?"
                                 class="searchBar" />
              </div>
            </div>
            <div class="inventory">
              <h2 style="margin-left: 2rem">Results:</h2>
              <p v-if="currentResultsSpecialists !== defaultResultsSpecialists" @click="resetNewSpecialist()" style="text-decoration: underline; cursor: pointer;margin-top: 1.5rem;margin-left: 1.9rem">Reset search</p>
              <div class="cards" style="margin-top: 2rem">
                <div v-for="specialist in currentResultsSpecialists" :key="specialist.id">
                  <pv-card style="width: 17em; border-radius: 15px;">
                    <template #header>
                      <img
                          alt="user header"
                          :src="specialist.imageUrl"
                          style="margin: 1em; width: 15em; height: 150px; border-radius: 15px;"
                      />
                    </template>
                    <template #title>{{ specialist.name }}</template>
                    <template #footer>
                      <div style="display: flex; justify-content: center">
                        <pv-button label="Details" severity="warning" @click="showDetailsForSpecialistInSearch(specialist)" />
                      </div>
                    </template>
                  </pv-card>
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
import { ref } from "vue";
import {ContactServices} from "../../services/contacts-service"
import {UserServices} from "../../services/user-service"
import {SpecialistServices} from "@/services/specialists-service";

export default {
  name: "Farmer_specialist",
  data() {
    return {
      token: sessionStorage.getItem("jwt"),
      userName: sessionStorage.getItem("name"),
      searchContactValue: ref(""),
      searchContactItems: ref([]),
      searchNewSpecialistValue: ref(""),
      searchNewSpecialistItems: ref([]),
      showDropdown: false,
      displayableContacts:[],
      contactDetailsVisible: false,
      addSpecialistVisible: false,
      currentContact:{},
      showDetailsForSearch:false,
      defaultResultsSpecialists:[],
      currentResultsSpecialists:[],
      currentSpecialistInSearch:{},
      currentContactResultsSpecialists:[],
    };
  },
  created() {
    new ContactServices().getContactsForFarmer(sessionStorage.getItem("id")).then(response=>{
      this.getDisplayableContacts(response.data)
    })
  },
  methods: {
    resetContacts(){
      this.currentContactResultsSpecialists=this.displayableContacts
        this.searchContactValue=""
    },
      resetNewSpecialist(){
          this.currentResultsSpecialists=this.defaultResultsSpecialists
          this.searchNewSpecialistValue=""
      },
    contactSearchSelected(){
      for (let i = 0; i < this.currentContactResultsSpecialists.length; i++) {
        if(this.currentContactResultsSpecialists[i].name===this.searchContactValue){
          let temp=this.currentContactResultsSpecialists[i]
          this.currentContactResultsSpecialists=[]
          this.currentContactResultsSpecialists.push(temp)
        }
      }
    },
      newSpecialistSearchSelected(){
          for (let i = 0; i < this.currentResultsSpecialists.length; i++) {
              if(this.currentResultsSpecialists[i].name===this.searchNewSpecialistValue){
                  let temp=this.currentResultsSpecialists[i]
                  this.currentResultsSpecialists=[]
                  this.currentResultsSpecialists.push(temp)
              }
          }
      },
    contactSearch(event) {
      // Filtra los objetos cuyo atributo "name" coincide con searchInventorValue
      const matchingContacts = this.displayableContacts.filter(contact =>
          contact.name.toLowerCase().includes(this.searchContactValue.toString().toLowerCase())
      );
      if(matchingContacts.length===0){
        this.currentContactResultsSpecialists=[]
      }else {
        this.searchContactItems = matchingContacts.map(contact => contact.name);
        this.currentContactResultsSpecialists=matchingContacts
      }
    },
    newSpecialistSearch(event) {
      // Filtra los objetos cuyo atributo "name" coincide con searchInventorValue
      const matchingNewSpecialist = this.defaultResultsSpecialists.filter(contact =>
          contact.name.toLowerCase().includes(this.searchNewSpecialistValue.toString().toLowerCase())
      );
      if(matchingNewSpecialist.length===0){
        this.currentResultsSpecialists=[]
      }else {
        this.searchNewSpecialistItems = matchingNewSpecialist.map(contact => contact.name);
        this.currentResultsSpecialists=matchingNewSpecialist
      }
    },
    getDisplayableContacts(rawContacts){
      for (let i = 0; i < rawContacts.length; i++) {
        new UserServices().getUserById(rawContacts[i].specialistId).then(response=>{
            let temp=response.data
            temp.contactId=rawContacts[i].id
          this.displayableContacts.push(temp)
        })
        this.currentContactResultsSpecialists=this.displayableContacts
      }
    },
    getAllSpecialist(){
      new UserServices().getAllUsersSpecialists().then(response=>{
        this.defaultResultsSpecialists=response.data
        this.currentResultsSpecialists=this.defaultResultsSpecialists
      })
    },
    showSpecialistDetails(contact) {
      this.loadContactDetails(contact.id)
      this.contactDetailsVisible=!this.contactDetailsVisible
      this.currentContact= contact;
    },
    loadContactDetails(id) {
      new SpecialistServices().getSpecialistInformationByUserId(id).then(response=>{
        this.currentContact.expertise=response.data[0].expertise
        this.currentContact.contactEmail = response.data[0].contactEmail
        this.currentContact.areasOfFocus= response.data[0].areasOfFocus
          this.currentContact.specialistId=response.data[0].id
      })
    },
    loadSpecialistDetails(id) {
      new SpecialistServices().getSpecialistInformationByUserId(id).then(response=>{
        this.currentSpecialistInSearch.expertise=response.data[0].expertise
        this.currentSpecialistInSearch.contactEmail = response.data[0].contactEmail
        this.currentSpecialistInSearch.areasOfFocus= response.data[0].areasOfFocus
      })
    },
    contactSpecialist() {
      this.$router.push("/farmer/chat/" + this.currentContact.contactId)
    },
    addSpecialist(){
      //this.$router.push("/farmer/createCrop")
      this.searchNewPlantValue=""
      this.addSpecialistVisible=!this.addSpecialistVisible
      this.showDetailsForSearch=false
      this.getAllSpecialist()
    },
    
    showDetailsForSpecialistInSearch(specialist){
      this.loadSpecialistDetails(specialist.id)
      this.showDetailsForSearch=!this.showDetailsForSearch
      this.currentSpecialistInSearch=specialist;
    },
    sendRequestToSpecialist(){
      this.addSpecialistVisible=!this.addSpecialistVisible
      this.showDetailsForSearch=false
    }
  },
};
</script>

<style scoped>
.background {
  background-color: #242424;
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 20px;
  width: 100%;
}

.container {
    padding: 1.5rem;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
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

.pi {
  color: white;
}

.green-button {
  margin-top: 1.5rem;
  color: white;
}

.agriculture-specialist-details {
  text-align: left;
  padding: 20px;
}

.title-text {
  font-size: 24px;
  margin-bottom: 10px;
  color: #fff;
}

.detail-text {
  font-size: 18px;
  color: #fff;
  margin: 10px 0;
}

.image-container {
  margin-top: 20px;
}

.centered-image {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.divider {
  height: 1px;
  background-color: #ccc;
  margin: 20px 0;
}

.button-row {
  display: flex;
  justify-content: center;
}

.green-button {
  background-color: green;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
}

.green-button:hover {
  background-color: darkgreen;
}
</style>
