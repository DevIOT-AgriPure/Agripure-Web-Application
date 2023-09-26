<template>
  <div class="background">
    <div class="tomato-details">
        <div class="title">
          <h1 class="title-text">Tomato Details</h1>
        </div>
        <div class="detail">
          <p class="detail-text">Scientific name: {{ scientificName }}</p>
        </div>
        <div class="detail">
          <p class="detail-text">Variety: {{ variety }}</p>
        </div>
        <div class="image-container">
          <img src="https://sembralia.com/cdn/shop/articles/tomate.jpg?v=1648560931" alt="Tomato Image" class="centered-image">
        </div>
        <div class="detail-row">
            <p class="detail-text">Land type: {{ cropLandType }}</p>
        </div>
        <div class="divider"></div>
        <div class="detail-row">
          <p class="detail-text">Distance between plants: {{ distanceCrop }}</p>
        </div>
        <div class="divider"></div>
        <div class="detail-row">
          <p class="detail-text">Weather conditions: {{ cropWeather }}</p>
        </div>
    </div>
  </div>  
</template>
<script>
export default {
  data() {
    return {
      scientificName: "asdasdasd",
      variety: "sadasd",
      cropLandType: "Crop Land Type",
      distanceCrop: "Distance Crop",
      cropWeather: "Crop Weather"
    };
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
    .tomato-details {

  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Alinea los elementos a la izquierda */
  text-align: left; /* Alinea el texto a la izquierda */
  
}
.title {
  margin-right: 20px; /* Espacio entre el título y el borde derecho */
}

.title-text {
  font-weight: bold;
}

.detail {
  margin-right: 20px; /* Espacio entre los detalles y el borde derecho */
  margin-top: 15px;
}

.detail-text {
  font-weight: bold;
}
.image-container {
  text-align: center; /* Centrar la imagen horizontalmente */
  margin-top: 15px;
}

.centered-image {
  max-width: 100%; /* Asegura que la imagen no sea más ancha que su contenedor */
  max-height: 300px; /* Límite de altura máximo */
  height: auto; /* Mantiene la proporción de aspecto de la imagen */
}
.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-top: 15px;
  
}

.divider {
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.5); /* Color de línea divisoria */
  margin: 10px 0;
  margin-top: 15px;
  }
</style>