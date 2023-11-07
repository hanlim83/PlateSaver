<template>
  <div class="container-xxl display-3 text-center text-primary"><strong>Edit Your Post</strong></div>
  <br />
  <br />
  <div class="create-post">
    <div class="card text-bg-dark">
      <img src="@/assets/fried_rice_banner.png" />
      <div class="card-img-overlay">
        <div class="card-title display-5 text-left align-middle text-dark fw-bold w-50 h-100 overflow-auto text-capitalize">
          {{ title }}
        </div>
      </div>
    </div>
    <br />
    <form @submit.prevent="handleUpdatingPost">
      <div class="row g-3">
        <div class="col"></div>
        <div class="col-4 mb-3">
          <label for="title" class="form-label">Title:</label>
          <input type="text" class="form-control text-center" v-model="title" placeholder="Title" id="title" required />
        </div>
        <div class="col"></div>
      </div>

      <div class="mb-3">
        <label for="description" class="form-label">Description:</label>
        <textarea class="form-control" id="description" rows="3" v-model="content" required></textarea>
      </div>

      <div class="row">
        <div class="col-4 mb-3">
          <label class="form-label mb-0" for="contact">Contact:</label>
          <input type="text" class="form-control" id="contact" required />
        </div>
        <div class="col-4 mb-3">
          <label for="Tags" class="form-label mb-0">Hashtags:</label>
          <input type="text" class="form-control" id="food" v-model="tags" required />
        </div>
        </div>
        <div class="row">
        <div class="col">
          <h4>Your Position</h4>
          Latitude : {{ currPos.lat.toFixed(2) }}, longitude {{ currPos.lng.toFixed(2) }}
        </div>
        <div ref="mapDiv" style="width: 100%; height: 25vh"></div>
        <div class="col"></div>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <br />
    <br />
  </div>
</template>

<script setup>
/*eslint-disable no-undef*/
import { ref as dbRef, update, onValue } from 'firebase/database'
import { useFirebaseAuth, useDatabase} from 'vuefire'
import { computed, ref, onMounted } from 'vue'
import router from '@/router'
import { toast } from 'vue3-toastify'
import { useGeoLocation } from '@/components/useGeolocation'
import { Loader } from '@googlemaps/js-api-loader'
import { useRoute } from 'vue-router'

const auth = useFirebaseAuth()
const db = useDatabase()
const route = useRoute()
const id = route.params.id
const title = ref('')
const content = ref('')
const tags = ref('')
const contact = ref('')
const lat = ref(0)
const long = ref(0)

onValue(
  dbRef(db, '/Posts/' + id),
  (snapshot) => {
    console.log(snapshot.val())
    if (snapshot.val().userID != auth.currentUser.uid) {
      router.push({ name: 'not-found' })
    }
    title.value = snapshot.val().title
    content.value = snapshot.val().content
    tags.value = '#' + snapshot.val().tags.join('#')
    lat.value = snapshot.val().lat
    long.value = snapshot.val().long
  },
  {
    onlyOnce: true
  }
)

const handleUpdatingPost = () => {
  console.log('Updating Post')
  try {
    update(dbRef(db, 'Posts/' + id), {
      title: title.value,
      content: content.value,
      tags: tags.value.split('#').slice(1),
      contact: contact.value
    })
    toast('Post Updated Successfully', {
      autoClose: 5000,
      type: 'success'
    })
    setTimeout(() => {
      router.push({ name: 'posts.own' })
    }, 6000)
  } catch (error) {
    console.log(error)
    toast('An Error Occurred', {
      autoClose: 5000,
      type: 'error'
    })
  }
}

const GOOGLE_MAPS_API_KEY = 'AIzaSyBHv4JD1OQx8TgqAgiing9nRP6HM72zAB4'
const { coords } = useGeoLocation() // Need Replace this with coordinates of backend
const currPos = computed(() => ({
  lat: coords.value.latitude,
  lng: coords.value.longitude
}))
const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY })
const mapDiv = ref(null)

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

onMounted(async () => {
  await loader.load()
  console.log('centering map on coords')
  while (currPos.value.lat == 0 && currPos.value.lng == 0) {
    console.log('Awaiting Coords')
    await sleep(1000)
  }
  console.log('Centering Lat: ' + currPos.value.lat)
  console.log('Centering Lng: ' + currPos.value.lng)

  const map = new google.maps.Map(mapDiv.value, {
    center: currPos.value /* centre the map */,
    zoom: 18 /* how zoomed in is the map */
  })
  const icon = {
    url: 'https://maps.gstatic.com/mapfiles/markers2/measle_blue.png', // url
    scaledSize: new google.maps.Size(14, 14) // scaled size
  }

  const infowindow = new google.maps.InfoWindow()
  const geocoder = new google.maps.Geocoder()
  geocoder
    .geocode({ location: currPos.value })
    .then((response) => {
      if (response.results[0]) {
        const marker = new google.maps.Marker({
          position: currPos.value,
          map: map,
          icon: icon
        })
        infowindow.setContent(response.results[0].formatted_address)
        infowindow.open(map, marker) //Don't Need for Radar Page
      } else {
        window.alert('No results found')
      }
    })
    .catch((e) => window.alert('Geocoder failed due to: ' + e))
})

toast.clearAll()
</script>
