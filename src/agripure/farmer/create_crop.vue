<template>
    <div class="crop-registration">
      <div class="left-section">
        <img src="ruta_de_la_imagen.jpg" alt="Imagen del cultivo" />
      </div>
      <div class="right-section">
        <h2><b>Register a Crop</b></h2>
        <div class="form-row">
          <label for="plant">Planta:</label>
          <select id="plant" v-model="selectedPlant">
            <option value="plant1">Planta 1</option>
            <option value="plant2">Planta 2</option>
            <option value="plant3">Planta 3</option>
            <!-- Puedes cargar dinámicamente las opciones desde tu base de datos -->
          </select>
        </div>
        <pv-button @click="submitForm" style="background-color: #1c1c1c; color: white;">Registrar Cultivo</pv-button>

      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedPlant: null
      };
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
  .crop-registration {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .left-section {
    flex: 1;
    padding: 20px;
  }
  
  .right-section {
    flex: 1;
    padding: 20px;
  }
  
  .form-row {
    margin-bottom: 10px;
  }
  
  /* Estilos CSS para tu formulario aquí */
  </style>
  