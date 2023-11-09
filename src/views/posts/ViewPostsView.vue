<script setup>
import { useDatabaseList, useDatabase } from 'vuefire'
import { ref as dbRef } from 'firebase/database'
import IndivPost from '@/components/IndivPost.vue'
import { computed, onMounted, reactive } from 'vue'

const db = useDatabase()
const allposts = useDatabaseList(dbRef(db, 'posts'))

let currentLocation = reactive({
  latitude: 0,
  longitude: 0
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

const uncollectedPosts = computed(() => {
  let currentLatitude = currentLocation.latitude
  let currentLongitude = currentLocation.longitude
  let postsToDisplay = allposts.value.filter((item) => item.collectionStatus == false)

  for (let post of postsToDisplay) {
    if (currentLatitude == 0 && currentLongitude == 0) {
      post["distance"] = "Cannot get your location"
    } else {
      let dist = distance(currentLatitude, currentLongitude, post.lat, post.long, "K")
      post["distance"] = dist.toFixed(2) + " km away"
    }
  }
  return postsToDisplay
})

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
<!--<template>
  <div>
    
    <b-card-group deck>
      <template v-for="(post, index) in allposts" :key="index">
        <b-card v-if="post.collectionStatus" :title="post.title" style="min-width: 20rem" class="mb-2" :img-src="post.foodImage" img-top>
          

          <b-card-text>{{ post.content }}</b-card-text>
          <b-card-text>{{ post.location }}</b-card-text>

          <b-button href="#" variant="primary">View details</b-button>
          <template #footer>
            <small class="text-muted">Posted on: {{ post.timeStamp }}</small>
            <br />
            <small class="text-muted">Tags:{{ post.tags }}</small>
          </template>
        </b-card>
      </template>
    </b-card-group>
  </div>
</template>
-->
<template>
  <div class = "row">
    <div class = "newHeader" style = "color: #3a57e8;text-align : center; padding-bottom : 20px;font-size : 175%;letter-spacing : 1px"><img src="@/assets/lovefood.png" style="width: 45px" />&nbsp;Food Up For Collection&nbsp;<img src="@/assets/lovefood.png" style="width: 45px" /></div>

  </div>


  <div class="row" data-masonry='{"percentPosition": true }'>
    <div class="inner-box">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-xl-4" v-for="(post, ind) in uncollectedPosts" :key="ind">
            <IndivPost :id="post.id" :foodImage="post.foodImage" :timeStamp="post.timeStamp" :title="post.title"
              :userID="post.userID" :content="post.content" :tags="post.tags" :is-collected="post.collectionStatus"
              :address="post.address" :distance="post.distance" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
