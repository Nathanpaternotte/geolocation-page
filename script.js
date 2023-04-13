var latitude = null;
var longitude = null;

// Fonction de succès pour la récupération de la position
function successCallback(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;

  // Créer une carte Leaflet centrée sur la position de l'utilisateur
  var map = L.map('mapview').setView([latitude, longitude], 13);

  // Ajouter une couche de carte (par exemple, OpenStreetMap)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  // Ajouter un marqueur sur la carte pour la position de l'utilisateur
  L.marker([latitude, longitude]).addTo(map)
    .bindPopup('Votre position :<br>Latitude : ' + latitude + '<br>Longitude : ' + longitude)

    const apiUrl = 'https://nominatim.openstreetmap.org/reverse?lat=' + latitude + '&lon=' + longitude + '&format=json';

    // Utilisation de la méthode fetch pour effectuer une requête GET
    fetch(apiUrl)
      .then(response => response.json()) // Convertir la réponse en JSON
      .then(data => {
        // Récupérer l'adresse à partir de la réponse JSON
        const address = data.address;
        console.log(address); // Afficher l'adresse dans la console
      })
      .catch(error => {
        console.error('Erreur lors de la requête API :', error);
      });    
}



// Fonction d'erreur pour la récupération de la position
function errorCallback(error) {
  console.error('Erreur de géolocalisation : ' + error.message);
}

// Vérifier si la géolocalisation est prise en charge par le navigateur
if (navigator.geolocation) {
  // Demander la position de l'utilisateur
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
} else {
  console.error('La géolocalisation n\'est pas supportée par votre navigateur.');
}
