<template>
  <div class="m-auto">
    <h4>Your Position</h4>
    Latitude : {{ currPos.lat.toFixed(2) }}, longitude {{ currPos.lng.toFixed(2) }}
  </div>
  <div ref="mapDiv" style="width : 100%; height : 80vh" />

</template>

<script>
/*eslint-disable no-undef*/
import { computed, ref, onMounted } from 'vue'
import { useGeoLocation } from '@/components/useGeolocation'
import { Loader } from '@googlemaps/js-api-loader'

const GOOGLE_MAPS_API_KEY = 'AIzaSyBHv4JD1OQx8TgqAgiing9nRP6HM72zAB4'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default {
  setup() {
    const { coords } = useGeoLocation()
    const currPos = computed(() => ({
      lat: coords.value.latitude,
      lng: coords.value.longitude
    }))

    const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY })
    const mapDiv = ref(null)
    onMounted(async () => {
      await loader.load()
      console.log("centering map on coords")
      while (currPos.value.lat == 0 && currPos.value.lng == 0) {
        console.log("Awaiting Coords")
        await sleep(500)
      }
      console.log("Centering Lat: " + currPos.value.lat)
      console.log("Centering Lng: " + currPos.value.lng)

      // Main Map Settings
      const map = new google.maps.Map(mapDiv.value, {
        center: currPos.value, /* centre the map */
        zoom: 16, /* how zoomed in is the map */
      
      })

      const icon = {
          url: "http://maps.gstatic.com/mapfiles/markers2/measle_blue.png", // url
          scaledSize: new google.maps.Size(14, 14), // scaled size
      };
  
      const infowindow = new google.maps.InfoWindow();
      const geocoder = new google.maps.Geocoder();
      geocoder
        .geocode({ location: currPos.value })
        .then((response) => {
          if (response.results[0]) {
            new google.maps.Marker({
              position: currPos.value,
              map: map,
              icon : icon 
            });
            
            infowindow.setContent(response.results[0].formatted_address);
          } else {
            window.alert("No results found");
          }
        })
        .catch((e) => window.alert("Geocoder failed due to: " + e));

      // Other Collection Areas Within 5KM Range

      const infowindow2 = new google.maps.InfoWindow();

      var markers = [ //Need Backend collection to insert here
          ['Shun Li Industrial Park', 1.3367, 103.9112],
          ['Mcdonald',1.332058104, 103.913595064]
      ];

      for(var i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        var marker2 = new google.maps.Marker({
            position: position,
            map: map,
            animation: google.maps.Animation.DROP,
            title: markers[i][0]
        });


      google.maps.event.addListener(marker2, 'click', (function(marker2, i)
      {
          return function() {
              var content = markers[i][0] + "<br/>" + markers[i][1]+"," + markers[i][2];
              infowindow2.setContent(content);
              infowindow2.open(map, marker2);
          }
          })(marker2, i));
      }

      function createCenterControl(map) {
        const controlButton = document.createElement('button');

        // Set CSS for the control.
        controlButton.style.backgroundColor = '#fff';
        controlButton.style.border = '2px solid #fff';
        controlButton.style.borderRadius = '3px';
        controlButton.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlButton.style.color = 'rgb(25,25,25)';
        controlButton.style.cursor = 'pointer';
        controlButton.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlButton.style.fontSize = '16px';
        controlButton.style.lineHeight = '38px';
        controlButton.style.margin = '8px 0 22px';
        controlButton.style.padding = '0 10px';
        controlButton.style.textAlign = 'center';

        controlButton.textContent = 'Center Map';
        controlButton.title = 'Click to recenter the map';
        controlButton.type = 'button';

        // Setup the click event listeners: simply set the map to Chicago.
        controlButton.addEventListener('click', () => {
          map.setCenter(currPos.value);
          map.setZoom(16);
        });

        return controlButton;
      }

      const centerControlDiv = document.createElement('div');
      // Create the control.
      const centerControl = createCenterControl(map);
      // Append the control to the DIV.
      centerControlDiv.appendChild(centerControl);

      map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

    })
    return { currPos, mapDiv }

  }

}
</script>
