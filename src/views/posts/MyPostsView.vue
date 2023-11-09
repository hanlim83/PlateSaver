<script setup>
import { useFirebaseAuth, useDatabaseList, useDatabase } from 'vuefire'
import { ref as dbRef } from 'firebase/database'
import IndivPost from '@/components/IndivPost.vue'
import { computed, reactive, onMounted } from 'vue'
import moment from 'moment'

const auth = useFirebaseAuth()
const db = useDatabase()
const allposts = useDatabaseList(dbRef(db, 'posts'))

let currentLocation = reactive({
  latitude: 0,
  longitude: 0,
  sortType: "Distance from me"
});

function distance(lat1, lon1, lat2, lon2, unit) {
  if ((lat1 == lat2) && (lon1 == lon2)) {
    return 0;
  }
  else {
    var radlat1 = Math.PI * lat1 / 180;
    var radlat2 = Math.PI * lat2 / 180;
    var theta = lon1 - lon2;
    var radtheta = Math.PI * theta / 180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") { dist = dist * 1.609344 }
    if (unit == "N") { dist = dist * 0.8684 }
    return dist;
  }
}

const myposts = computed(() => {
  let currentLatitude = currentLocation.latitude
  let currentLongitude = currentLocation.longitude
  let postsToDisplay = allposts.value.filter((item) => item.userID == auth.currentUser.uid)

  for (let post of postsToDisplay) {
    if (currentLatitude == 0 && currentLongitude == 0) {
      post["distance"] = "Cannot get your location"
    } else {
      let dist = distance(currentLatitude, currentLongitude, post.lat, post.long, "K")
      post["dist"] = dist
      post["distance"] = dist.toFixed(2) + " km away"
    }
  }

  let sortType = currentLocation.sortType
  if (currentLocation.sortType == "Distance from me") {
    sortType = "distance"
  } else if (currentLocation.sortType == "Date Created") {
    sortType = "datePosted"
  }

  postsToDisplay = postsToDisplay.sort((a, b) => {
    if (sortType == "distance") {
      if (a.dist < b.dist) {
        return -1
      } else {
        return 1
      }
    } else if (sortType == "datePosted") {
      let date1 = moment(a.timeStamp, "DD-MM-YYY")
      let date2 = moment(b.timeStamp, "DD-MM-YYY")
      if (date1 < date2) {
        return -1
      } else {
        return 1
      }
    } else {
      return 0
    }
  })

  return postsToDisplay
})

const sortDropDown = (event) => {
  currentLocation.sortType = event.target.innerText
}

onMounted(() => {
  const success = (position) => {
    currentLocation.latitude = position.coords.latitude;
    currentLocation.longitude = position.coords.longitude;
  }
  const error = (err) => {
    console.log(err)
  };

  navigator.geolocation.getCurrentPosition(success, error);
})

</script>
<template>
  <div class = "row">
      <div class = "h1 newHeader" style = "color: #3a57e8;text-align : center; padding-bottom : 20px;font-size : 225%;letter-spacing : 5px;"><img src="@/assets/mypost.png" style="width: 50px" />&nbsp; My Posts &nbsp;<img src="@/assets/mypost.png" style="width: 50px" /></div>
  </div>
  <div class="row" data-masonry='{"percentPosition": true }'>
    <div class="inner-box">
      <div class="container">
        <b-row class="my-4">
          <b-col class="">
            <div class="dropdown">
              <label for="dropdown" class="me-2">Sort by:</label>
              <button class="btn btn-info dropdown-toggle text-capitalize" type="button" id="dropdownMenuButton1"
                data-bs-toggle="dropdown" aria-expanded="false">
                {{ currentLocation.sortType }}
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" @click="sortDropDown">Distance from me</a></li>
                <li><a class="dropdown-item" @click="sortDropDown">Date Created</a></li>
              </ul>
            </div>
          </b-col>
        </b-row>

        <div class="row">
          <div class="col-md-6 col-lg-4" v-for="(post, ind) in myposts" :key="ind">
            <IndivPost :id="post.id" :foodImage="post.foodImage" :timeStamp="post.timeStamp" :title="post.title"
              :userID="post.userID" :content="post.content" :tags="post.tags" :is-collected="post.collectionStatus" 
              :distance="post.distance" :address="post.address" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
