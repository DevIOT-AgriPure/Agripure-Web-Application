<template>
  <div class="background">
    <div class="crop-registration">
      <div class="left-section">
        <img src="ruta_de_la_imagen.jpg" alt="Imagen del cultivo" />
      </div>
      <div class="right-section">
        <h2><b>Register a Crop</b></h2>
        <div class="form-row">
          <label for="plant">Plant:  </label>
          <select id="plant" v-model="selectedPlant">
            <option value="plant1">Planta 1</option>
            <option value="plant2">Planta 2</option>
            <option value="plant3">Planta 3</option>
            <!-- Puedes cargar dinámicamente las opciones desde tu base de datos -->
          </select>
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
        spacePlants:''
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
  .background {
    background-color: #242424;
    color: white; /* Cambiar el color del texto si es necesario */
    margin: 15px 20px 15px 20px; /* Agregar el relleno deseado */
    border-radius: 15px; /* Agregar bordes redondeados */
    width: 100%;
}
  .crop-registration {
    padding-top: 10px;
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
  