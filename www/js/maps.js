var app = {
  inicio: function() {
    this.iniciaFastClick();

  },

  iniciaFastClick: function () {
    FastClick.attach(document.body);
  },

  dispositivoListo: function(){
    navigator.geolocation.watchPosition(app.pintaCoordenadasEnMapa, app.errorAlSolicitarLocalizacion);
  },

  pintaCoordenadasEnMapa: function(position){
    var miMapa = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWF4Z20iLCJhIjoiY2l3YW5nbXV3MDAyeTJvbzZueDltem83aCJ9.5NZah3U6xVR8QTcXhnls-w', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',		
    }).addTo(miMapa);
	  app.pintarSuperficie([position.coords.latitude, position.coords.longitude], miMapa);
	  app.pintaMarcador([position.coords.latitude, position.coords.longitude], '¡Estoy aquí!', miMapa);

		miMapa.on('click', function(evento){
		  var texto = 'Lat: ' + evento.latlng.lat.toFixed(7) + '<br>Lon: ' + evento.latlng.lng.toFixed(7);
		  app.pintaMarcador(evento.latlng, texto, miMapa);
    });
  },
	pintarSuperficie: function(latlng, mapa){
		var circle = L.circle(latlng,{
			color: '#205934',
			fillColor: '#86D9A3',
			fillOpacity: 0.3,
			radius: 1000
		}).addTo(mapa);
	},
	
	pintaMarcador: function(latlng, texto, mapa){
		var marcador = L.marker(latlng).addTo(mapa);
		marcador.bindPopup(texto).openPopup();
  },

  errorAlSolicitarLocalizacion: function(error){
    console.log(error.code + ': ' + error.message);
  }

};

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    app.inicio();
  }, false);
  document.addEventListener('deviceready', function() {
    app.dispositivoListo();
  }, false);
}