<style>
/* body {
  background-color: #9da2b5;
} */
</style>

<template>
  <!-- <div class="p-5 mb-4 bg-light rounded-3 d-block h-100">
      <div class="container-fluid py-5">
        <h1 class="display-3 fw-bold" >{{ post.title }}</h1>
        <div class="row">
            <p class="col-md-8 fs-4">{{ post.content }}</p>
            <img :src="post.foodImage" class="col-md-6 float-md-end mb-3 ms-md-4 img-fluid rounded"/>
        </div>
        
        <p>Contact me at: {{ post.contact }}</p>
        <button class="btn btn-primary btn-lg mt-auto mb-3 " type="button">View Their Profile</button>
      </div>
    </div>-->
  <div class="row">
    <div class="col-xl-8 col-md-10 mx-auto">
      <div class="card mt-4">
        <div class="card-body p-6">
          <a @click="previousPage"><icon-component type="outlined" icon-name="arrow-circle-left" />
            Posts
          </a>
          <p class="text-primary pt-3">{{ timeStamp }}</p>
          <h1 class="mt-2">{{ title }}</h1>
          <!-- <div class="d-flex align-items-center my-3">
            <span class="badge bg-info py-1 mx-1 text-capitalize fs-5">Delicious</span>
            <span class="badge bg-warning py-1 mx-1 text-capitalize fs-5">Popular</span>
          </div> -->
          <h6 class="">By: {{ createdUser }}</h6>
          <div class="d-flex align-items-center my-3">
            <span class="badge bg-warning py-1 mx-1 text-capitalize fs-5" v-if="isCollected">Collected</span>
            <span class="badge bg-info py-1 mx-1 text-capitalize fs-5" v-for="(hashtag, key) in tags" :key="key">{{ hashtag }}</span>
          </div>
          <p class="mt-3 line-break">{{ content.replace(/\n/g, "\n") }}</p>
          <div class="row my-3">
            <img :src="imageURL" class="img-fluid rounded col-12 col-md-4" loading="lazy" />
            <div class="col-12 col-md-8">
              <h2 class="mt-3 mb-2">Collection Details</h2>
              <!-- Latitude : {{ lat }}, longitude {{ long }} -->
              <p class="fs-5">Contact Details: {{ contact }}</p>
              <p class="fs-5">Address: {{ address }}</p>
            </div>
          </div>
          <GMapMap :center="center" :zoom="18" map-type-id="terrain" style="width: 100%; height: 300px" ref="mapRef">
            <GMapMarker :position="center" />
          </GMapMap>
          <div class="row mx-3 my-3 justify-content-end" v-if="isOwner">
            <div class="btn-group" role="group" aria-label="Posts Actions">
              <button type="button" class="btn btn-primary" @click="handleUpdatePost" v-if="!isCollected">Mark as
                Collected</button>
              <button type="button" class="btn btn-primary" v-if="isCollected" disabled>Already
                Collected</button>
              <!-- <router-link :to="{ path: '/posts/edit/' + id }" class="btn btn-secondary">Edit Post</router-link> -->
              <button type="button" class="btn btn-danger" @click="handleDeletePost">Delete
                Post</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
/*eslint-disable no-undef*/
import { ref as dbRef, onValue, update, remove } from 'firebase/database'
import { useFirebaseAuth, useDatabase, useFirebaseStorage } from 'vuefire'
import { ref as storageRef, getDownloadURL } from 'firebase/storage'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { toast } from 'vue3-toastify'
import router from '@/router'

// import { useGeoLocation } from '@/components/useGeolocation'
// import { Loader } from '@googlemaps/js-api-loader'

const auth = useFirebaseAuth()
const db = useDatabase()
const storage = useFirebaseStorage()
const route = useRoute()
const id = route.params.id
const title = ref('')
const content = ref('')
const createdUser = ref('')
const tags = ref('')
const contact = ref('')
const lat = ref(0)
const long = ref(0)
const imageURL = ref('')
const isOwner = ref(false)
const isCollected = ref(false)
const timeStamp = ref('')
const center = ref({
  lat: 0,
  lng: 0
})
const address = ref('')
var markers = []

const handleDeletePost = () => {
  if (confirm('Are you sure you want to delete this post?')) {
    router.push({ name: 'posts.own' })
    // deleteObject(storageRef(storage, imageURL.value))
    // .then(() => {
    remove(dbRef(db, '/posts/' + id))
    toast('Post Deleted Successfully', {
      autoClose: 5000,
      type: 'success'
    })
  }
  // .catch((error) => {
  //   console.log(error)
  //   toast('Error Deleting Post', {
  //     autoClose: 5000,
  //     type: 'error'
  //   })
  // })
  // }
}

const handleUpdatePost = () => {
  console.log('Updating Post')
  try {
    update(dbRef(db, 'posts/' + id), {
      collectionStatus: true
    })
    toast('Post Marked as Collected', {
      autoClose: 5000,
      type: 'success'
    })
    router.push({ name: 'posts.own' })
  } catch (error) {
    console.log(error)
    toast('Error Updating Post', {
      autoClose: 5000,
      type: 'error'
    })
  }
}

console.log("AAAA")

onValue(dbRef(db, '/posts/' + id), (snapshot) => {
  if (snapshot.val() == null) {
    router.push({ name: 'posts.own' })
    toast('Post Does Not Exist', {
      autoClose: 5000,
      type: 'error'
    })
    return;
  }
  console.log("BBBB:", snapshot.val())
  title.value = snapshot.val().title
  content.value = snapshot.val().content
  createdUser.value = snapshot.val().userName
  if (snapshot.val().tags != null) {
    tags.value = snapshot.val().tags
  }
  lat.value = snapshot.val().lat
  long.value = snapshot.val().long
  contact.value = snapshot.val().contact
  timeStamp.value = snapshot.val().timeStamp
  center.value = {
    lat: lat.value,
    lng: long.value
  }
  address.value = snapshot.val().address
  getDownloadURL(storageRef(storage, snapshot.val().foodImage)).then((url) => {
    imageURL.value = url
  })
  markers.push([title.value, lat.value, long.value])
  if (auth.currentUser && snapshot.val().userID == auth.currentUser.uid) {
    isOwner.value = true
  } else {
    isOwner.value = false
  }
  if (snapshot.val().collectionStatus == true) {
    isCollected.value = true
  } else {
    isCollected.value = false
  }
})

const previousPage = () => {
  // let previousPage = sessionStorage.getItem('cameFrom')
  router.go(-1)
}
onMounted(async () => {
  //   await loader.load()
  //   console.log('centering map on coords')
  //   while (currPos.value.lat == 0 && currPos.value.lng == 0) {
  //     console.log('Awaiting Coords')
  //     await sleep(500)
  //   }
  //   console.log('Centering Lat: ' + currPos.value.lat)
  //   console.log('Centering Lng: ' + currPos.value.lng)



  // Main Map Settings
  // const map = new google.maps.Map(mapDiv.value, {
  //   center: currPos.value /* centre the map */,
  //   zoom: 16 /* how zoomed in is the map */
  // })

  // const icon = {
  //   url: 'https://maps.gstatic.com/mapfiles/markers2/measle_blue.png', // url
  //   scaledSize: new google.maps.Size(14, 14) // scaled size
  // }

  // const infowindow = new google.maps.InfoWindow()
  // const geocoder = new google.maps.Geocoder()
  // geocoder
  //   .geocode({ location: currPos.value })
  //   .then((response) => {
  //     if (response.results[0]) {
  //       new google.maps.Marker({
  //         position: currPos.value,
  //         map: map,
  //         icon: icon
  //       })

  //       infowindow.setContent(response.results[0].formatted_address)
  //     } else {
  //       window.alert('No results found')
  //     }
  //   })
  //   .catch((e) => window.alert('Geocoder failed due to: ' + e))

  // Other Collection Areas Within 5KM Range

  // const infowindow2 = new google.maps.InfoWindow()

  // for (var i = 0; i < markers.length; i++) {
  //   var position = new google.maps.LatLng(markers[i][1], markers[i][2])
  //   var marker2 = new google.maps.Marker({
  //     position: position,
  //     map: map,
  //     animation: google.maps.Animation.DROP,
  //     title: markers[i][0]
  //   })

  //   google.maps.event.addListener(
  //     marker2,
  //     'click',
  //     (function (marker2, i) {
  //       return function () {
  //         var content = markers[i][0] + '<br/>' + markers[i][1] + ',' + markers[i][2]
  //         infowindow2.setContent(content)
  //         infowindow2.open(map, marker2)
  //       }
  //     })(marker2, i)
  //   )
  // }

  // function createCenterControl(map) {
  //   const controlButton = document.createElement('button')

  //   // Set CSS for the control.
  //   controlButton.style.backgroundColor = '#fff'
  //   controlButton.style.border = '2px solid #fff'
  //   controlButton.style.borderRadius = '3px'
  //   controlButton.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)'
  //   controlButton.style.color = 'rgb(25,25,25)'
  //   controlButton.style.cursor = 'pointer'
  //   controlButton.style.fontFamily = 'Roboto,Arial,sans-serif'
  //   controlButton.style.fontSize = '16px'
  //   controlButton.style.lineHeight = '38px'
  //   controlButton.style.margin = '8px 0 22px'
  //   controlButton.style.padding = '0 10px'
  //   controlButton.style.textAlign = 'center'

  //   controlButton.textContent = 'Center Map'
  //   controlButton.title = 'Click to recenter the map'
  //   controlButton.type = 'button'

  //   // Setup the click event listeners: simply set the map to Chicago.
  //   controlButton.addEventListener('click', () => {
  //     map.setCenter(currPos.value)
  //     map.setZoom(16)
  //   })

  //   return controlButton
  // }

  // const centerControlDiv = document.createElement('div')
  // // Create the control.
  // const centerControl = createCenterControl(map)
  // // Append the control to the DIV.
  // centerControlDiv.appendChild(centerControl)

  // map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv)
})
</script>

<style>
.line-break {
  white-space: pre-line;
}
</style>