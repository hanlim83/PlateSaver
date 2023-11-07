<!--<style>
input[type=text], input[type=file] {
  border:1px solid black;
}

</style>-->

<template>
  <b-row>
    <b-col>
      <b-card no-body class="my-4 mx-2">
        <b-card-header class="d-flex justify-content-between">
          <div class="header-title">
            <b-card-title>Share your food with others</b-card-title>
          </div>
        </b-card-header>
        <b-card-body>
          <div class="create-post">
            <div class="card text-bg-dark">
              <img src="@/assets/fried_rice_banner.png" />
              <div class="card-img-overlay">
                <div
                  class="card-title display-5 text-left align-middle text-dark fw-bold w-50 h-100 overflow-auto text-capitalize">
                  {{ v$.title.$model }}
                </div>
              </div>
            </div>
            <div class="form-card text-start">
              <b-row>
                <b-col md="12">
                  <b-form-group label="Title:">
                    <b-form-input type="text" class="form-control" :class="{ 'is-invalid': v$.title.$error }"
                      placeholder="e.g. Leftover catering from party" v-model="v$.title.$model" />
                    <div v-if="v$.title.$error" class="text-danger">Title is required.</div>
                  </b-form-group>
                </b-col>
                <b-col md="12" class="">
                  <b-form-group label="Description:">
                    <b-form-textarea id="description" placeholder="Be specific on what is available and the quantity"
                      :class="{ 'is-invalid': v$.description.$error }" rows="5" max-rows="12"
                      v-model="v$.description.$model"></b-form-textarea>
                    <div v-if="v$.description.$error" class="text-danger">Description is required</div>
                  </b-form-group>
                </b-col>

                <b-col md="4" class="">
                  <b-form-group label="Contact:">
                    <b-form-input type="text" class="form-control" name="contact"
                      :class="{ 'is-invalid': v$.contact.$error }" placeholder="e.g. Telegram @MonkeyKingLuffy"
                      v-model="v$.contact.$model" />
                    <div v-if="v$.contact.$error" class="text-danger">Contact is required</div>
                  </b-form-group>
                </b-col>
                <b-col md="4" class="">
                  <div class="form-group">
                    <label class="form-label">Upload a photo:</label>
                    <input type="file" class="form-control" name="pic" accept="image/*" @change="uploadImage" ref="image"
                      :class="{ 'is-invalid': v$.files.$error }" />
                    <div v-if="v$.files.$error" class="text-danger">A photo is required</div>
                  </div>
                </b-col>
                <b-col md="12">
                  <b-form-group label="Collection Location:">
                    Latitude : {{ latitude }}, longitude {{ longitude }}
                    <div ref="mapDiv" style="width: 100%; height: 25vh"></div>
                  </b-form-group>
                </b-col>
                <!----
                <b-col md="6" class="order-4">
                  <div class="form-group">
                    <label class="form-label">Servings: </label>
                    <b-form-input type="text" class="form-control" name="servings"
                      :class="{ 'is-invalid': v$.details.servings.$error }" placeholder="e.g. 3 pax"
                      v-model="v$.details.servings.$model" />
                    <div v-if="v$.details.servings.$error" class="text-danger">Servings is required</div>
                  </div>
                </b-col>
              -->
              </b-row>
              <button type="submit" class="btn btn-primary" @click="handleAddingPost">Submit</button>

            </div>

            <!-- <form @submit.prevent="handleAddingPost">
              <div class="row g-3">
                <div class="col"></div>
                <div class="col-4 mb-3">
                  <label for="title" class="form-label">Title:</label>
                  <input type="text" class="form-control text-center" v-model="title" placeholder="Title" id="title"
                    required />
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
                  <label class="form-label mb-0" for="customFile">Upload An Image:</label>
                  <button type="button" class="form-control" id="customFile"
                    @click="open({ accept: 'image/*', multiple: false })">Choose Image</button>
                </div>

                <div class="col-4 mb-3">
                  <label for="Tags" class="form-label mb-0">Hashtags:</label>
                  <input type="text" class="form-control" id="food" v-model="tags" required />
                </div>
               <div class="col-4 mb-3">
                  <h4>Your Position</h4>
                  Latitude : {{ currPos.lat.toFixed(2) }}, longitude {{ currPos.lng.toFixed(2) }}
                </div>
                <div ref="mapDiv" style="width: 100%; height: 25vh"></div>
                <div class="col"></div>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form> -->
          </div>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
/*eslint-disable no-undef*/
import { ref as dbRef, push } from 'firebase/database'
import { useFirebaseAuth, useDatabase, useFirebaseStorage } from 'vuefire'
import { ref as storageRef, uploadBytes } from 'firebase/storage'
import router from '@/router'
import { toast } from 'vue3-toastify'
// import { useFileDialog } from '@vueuse/core'
// import { useGeoLocation } from '@/components/useGeolocation'
import { Loader } from '@googlemaps/js-api-loader'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

const auth = useFirebaseAuth()
const storage = useFirebaseStorage()
const db = useDatabase()

const GOOGLE_MAPS_API_KEY = 'AIzaSyBHv4JD1OQx8TgqAgiing9nRP6HM72zAB4'

export default {
  name: 'CreatePostView',
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      title: '',
      description: '',
      tags: '',
      contact: '',
      location: '',
      files: '',
      currentCoords: {},
      latitude: 0,
      longitude: 0,
      mapDiv: {}
    }
  },
  validations() {
    return {
      title: { required },
      description: { required },
      tags: { required },
      contact: { required },
      location: { required },
      files: { required }
    }
  },
  computed: {
    currPos() {
      console.log("Current Coords: ", this.currentCoords.coords)
      return {}
    }
  },
  async mounted() {
    console.log("GETTING LOCATION");
    const success = (position) => {
      console.log("REACHED HERE")
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;

      // Do something with the position
      let loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY })
      loader.load()
      console.log('centering map on coords')

      const map = new google.maps.Map(this.mapDiv.value, {
        center: {
          lat: this.latitude,
          lng: this.longitude
        } /* centre the map */,
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
    };

    const error = (err) => {
      console.log(err)
    };

    // This will open permission popup
    navigator.geolocation.getCurrentPosition(success, error);
  },

  methds: {
    async handleAddingPost() {
      console.log('Adding Post')
      try {
        //validate form
        console.log("description Errors: ", v$.description)
        console.log("Files Errors: ", v$.files)
        if (!(await v$.value.$validate())) {
          toast('Invalid Fields', {
            autoClose: 5000,
            type: 'error'
          })
          return
        }

        //get current date
        let current = new Date()
        let dateNow = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`

        let imagePath = 'posts/' + id + '/' + v$.files[0].name

        let data = {
          title: v$.title,
          content: v$.descripiton,
          tags: v$.tags.split('#').slice(1),
          contact: v$.contact,
          foodImage: imagePath,
          userID: auth.currentUser.uid,
          userName: auth.currentUser.displayName,
          timeStamp: dateNow,
          location: location.value,
          collectionStatus: false,
          lat: currPos.value.lat,
          long: currPos.value.lng
        }

        push(dbRef(db, '/posts'), data).then((res) => {
          let id = res.key
          let newFileRef = storageRef(storage, imagePath)
          uploadBytes(newFileRef, v$.files[0]).then(async () => {
            //Send Image Path to db
            update(dbRef(db, '/posts/' + id), { imagePath: imagePath }).then(() => {
              // this.$router.push({ name: 'recipe.viewDetails', params: { id: id } })
            })
          })
        })

        toast('Post Created Successfully', {
          autoClose: 5000,
          type: 'success'
        })
        setTimeout(() => {
          router.push({ name: 'posts.myPosts' })
        }, 6000)
      } catch (error) {
        console.log("ERROR: ", error)
        toast('An Error Occurred', {
          autoClose: 5000,
          type: 'error'
        })
      }
    },
    uploadImage(event) {
      v$.files = event.target.files
      console.log("Files: ", v$.files)
    }

  }
}




// watch(files, (newFile) => {
//   console.log(newFile)
//   if (newFile.length == 1) {
//     console.log(newFile[0])
//     let newPostPicRef = storageRef(storage, 'posts-media/' + id + '/' + newFile[0].name)
//     uploadBytes(newPostPicRef, newFile[0])
//       .then((snapshot) => {
//         console.log(snapshot)
//         imagePath = snapshot.ref.fullPath
//         toast('Image Updated Successfully', {
//           autoClose: 5000,
//           type: 'info'
//         })
//       })
//       .catch((error) => {
//         console.log(error)
//         toast('Image not uploaded', {
//           autoClose: 5000,
//           type: 'warning'
//         })
//       })
//   }
// })




// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms))
// }

</script>
