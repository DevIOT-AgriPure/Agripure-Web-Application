<template>
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
    .tomato-details {
  background-color: #1c1c1c;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Alinea los elementos a la izquierda */
  text-align: left; /* Alinea el texto a la izquierda */
  width: 100vw;
}
.title {
  margin-right: 20px; /* Espacio entre el título y el borde derecho */
}

.title-text {
  font-weight: bold;
}

.detail {
  margin-right: 20px; /* Espacio entre los detalles y el borde derecho */
}

.detail-text {
  font-weight: bold;
}
.image-container {
  text-align: center; /* Centrar la imagen horizontalmente */
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
}

.divider {
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.5); /* Color de línea divisoria */
  margin: 10px 0;
  }
</style>