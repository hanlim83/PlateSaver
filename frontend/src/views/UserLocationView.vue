<template>
  <div class="m-auto">
    <h4>Your Position</h4>
    Latitude : {{ currPos.lat.toFixed(2) }}, longitude {{ currPos.lng.toFixed(2) }}
  </div>
  <div ref="mapDiv" style="width : 100%; height : 80vh" />
  <b-row>
    <b-col sm="12">
      <b-card no-body>
        <b-card-header header-class="d-flex justify-content-between">
          <div class="header-title">
            <h4 class="card-title">Basic</h4>
          </div>
        </b-card-header>
        <b-card-body>
          <p>Creating basic google map</p>
          <iframe id="link1" loading="lazy" class="w-100" :src="url" height="500" allowfullscreen=""></iframe>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
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

      const map = new google.maps.Map(mapDiv.value, {
        center: currPos.value, /* centre the map */
        zoom:18, /* how zoomed in is the map */

      })

      new google.maps.Marker({
        position: currPos.value, /* centre the map */
        map
    
      })
    })
    return { currPos, mapDiv }

  }

}


</script>