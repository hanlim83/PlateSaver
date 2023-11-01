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
    const { coords } = useGeoLocation() // Need Replace this with coordinates of backend
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

      const map = new google.maps.Map(mapDiv.value, {
        center: currPos.value, /* centre the map */
        zoom:18, /* how zoomed in is the map */

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
            const marker = new google.maps.Marker({
              position: currPos.value,
              map: map, 
              icon : icon
            });


            infowindow.setContent(response.results[0].formatted_address);
            infowindow.open(map, marker); //Don't Need for Radar Page
          } else {
            window.alert("No results found");
          }
        })
        .catch((e) => window.alert("Geocoder failed due to: " + e));
        
    })
    return { currPos, mapDiv }

  }

}


</script>