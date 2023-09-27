<template>
  <div class="background">
    <div class="crop-registration">
      <div class="left-section">
        <img :src="selectedPlantImage" alt="Imagen del cultivo" style="width: 500px; height: 500px;" />
      </div>
      <div class="right-section">
        <h2><b>Register a Crop</b></h2>
        <div class="form-row">
          <label for="plant">Plant:  </label>
          <pv-dropdown v-model="selectedPlant" :options="plants" option-label="label" option-value="value" @change="updateSelectedPlantImage" placeholder="Select a plant"></pv-dropdown>

        </div>
        <div class="form-row">
        <label style="color: white;">Land type:  </label>
        <pv-input
          v-model="landType"
          style="border: 1px solid #4CAF50; background-color: transparent; color: white;"/>
        </div>
         <div class="form-row">
        <label style="color: white;">Space between plants:  </label>
        <pv-input
          v-model="spacePlants"
          style="border: 1px solid #4CAF50; background-color: transparent; color: white;"/>
        </div>
        <div class="center-button"><pv-button @click="submitForm" style="background-color: #1c1c1c; color: white;">Registrar Cultivo</pv-button></div>


      </div>
    </div>
  </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedPlant: null,
        landType:'',
        spacePlants:'',
        plants: [
        { label: 'TOMATE', value: 'plant1', imageUrl: 'https://s1.eestatic.com/2021/07/12/actualidad/595952167_195030066_1706x960.jpg' },
        { label: 'PEPINO', value: 'plant2', imageUrl: 'https://www.finedininglovers.com/es/sites/g/files/xknfdk1706/files/styles/article_1200_800_fallback/public/2022-06/Type%20of%20cucumber.jpg?itok=WEuXomjV' },
        { label: 'CEBOLLA', value: 'plant3', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJgyeKFSDUEuff1j_znrU6KQfal0dutg4sYkqlS009n_HH4ey9RkblwMvhjX17TFd4FL8&usqp=CAU' }
        // Agrega más plantas con sus respectivas imágenes y valores
      ]
      };
    },
    computed: {
    selectedPlantImage() {
      // Busca la URL de la imagen de la planta seleccionada
      const selectedPlantData = this.plants.find(plant => plant.value === this.selectedPlant);
      return selectedPlantData ? selectedPlantData.imageUrl : '';
    }
  },
    methods: {
      submitForm() {
        // Aquí puedes enviar los datos del cultivo al servidor o realizar otras acciones.
        // Por ahora, solo mostraremos la planta seleccionada en la consola.
        console.log('Planta seleccionada:', this.selectedPlant);
  
        // Puedes agregar la lógica para enviar estos datos al servidor aquí.
      }
    }
  };
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
  .crop-registration {
    padding-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .left-section {
    flex: 1;
  display: flex;
  justify-content: center; /* Centrar horizontalmente */
  align-items: center; /* Centrar verticalmente */
  }
  
  .right-section {
    flex: 1;
  padding-left: 20px;
  display: flex;
  flex-direction: column; /* Alinear los elementos verticalmente */
  gap: 10px; /* Agregar espacio vertical entre los elementos */
  }
  
  .form-row {
    margin-bottom: 10px;
  }
  .center-button {
  display: flex;
  justify-content: start /* Centrar el botón horizontalmente */
}
  /* Estilos CSS para tu formulario aquí */
  </style>
  