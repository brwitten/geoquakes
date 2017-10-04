// define globals
var geoUrl = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson";

$(document).ready(function() {
  console.log("Let's get coding!");



	request();
	$("button").on("click", function(e){
		e.preventDefault();
		geoUrl = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
		request();
	});
});




function request(){
	console.log(geoUrl);
  $.ajax({
	method: "GET",
	url: geoUrl,
	success: onSuccess,
	error: onError
});

  }


function onSuccess(json) {
	$('.quake-line').remove();
	for (var i = 0; i < json.features.length; i++) {
		$("#info").append('<p class="quake-line">'+json.features[i].properties.title+'</p>');
	
	}
}
	

function onError(xhr, status, errorThrown) {
	alert("Sorry, there was a problem!");
	console.log("Error: " + errorThrown);
	console.log("Status: " + status);
	console.dir(xhr);
}

	


  var map;


      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 2,
          center: new google.maps.LatLng(2.8,-187.3),
          mapTypeId: 'terrain'
        });

        var script = document.createElement('script');

        script.src = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp';
        document.getElementsByTagName('head')[0].appendChild(script);
      }

      window.eqfeed_callback = function(results) {
        for (var i = 0; i < results.features.length; i++) {
          var coords = results.features[i].geometry.coordinates;
          var latLng = new google.maps.LatLng(coords[1],coords[0]);
          var marker = new google.maps.Marker({
            position: latLng,
            map: map
          
          });

           
        }
      }