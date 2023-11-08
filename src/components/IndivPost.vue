<style scoped>
p {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

<template>
  <!--    <div class="card">
        <div class="card-body p-3">
            <img :src="`${foodImage}`" :alt="id" class="img-fluid rounded" loading="lazy" />
            <div class="my-2">
                <span class="text-primary pt-3 ml-1">{{ timeStamp }}</span>
            </div>
            <router-link :to="{ path: '/recipe/view/' + id }" class="my-3 h5">{{ title }}</router-link>
            <div class="row my-2 justify-content-center">
                <span class="col-12 me-3">{{ userID }}</span>
                <span class="col-4 badge bg-info mx-1 my-1 text-capitalize" v-for="(hashtag, key) in tags" :key="key">{{ hashtag }}</span>

            </div>
            <p class="pt-2">{{ content }}</p>-->
  <!--<router-link :to="{ path: '/posts/view/' + id }" class="btn btn-primary">Read More</router-link>-->
  <!--</div>
    </div>-->
  <b-card :img-src="foodImageURL" class="img-fluid rounded" style="height:700px" loading="lazy">
    <b-card-text class="p-3">
      <div class="my-2">
        <span class="text-primary pt-3 ml-1">{{ timeStamp }}</span>
      </div>
      <router-link :to="{ path: '/posts/readPost/' + id }" class="my-3 h5">{{ title }}</router-link>
      <div class="me-3">{{ 'by ' + displayName }}</div>
      <div class="d-flex align-items-center my-2">
        <span class="badge bg-warning mx-1 text-capitalize" v-if="isCollected">Collected</span>
        <span class="badge bg-info mx-1 text-capitalize" v-for="(hashtag, key) in tags" :key="key">{{ hashtag }}</span>
      </div>
      <p class="pt-2 line-break">{{ content.replace(/\n/g, "\n") }}</p>
    </b-card-text>
    <div class="d-grid d-flex justify-content-end">
      <router-link :to="{ path: '/posts/read/' + id }" class="btn btn-primary btn-sm">Read More</router-link>
    </div>
  </b-card>
</template>
<script setup>
import { useDatabase, useFirebaseStorage } from 'vuefire'
import { ref as dbRef, onValue } from 'firebase/database'
import { ref as storageRef, getDownloadURL } from 'firebase/storage'
import { ref, defineProps } from 'vue'
const props = defineProps({
  id: { type: String, default: '' },
  foodImage: { type: String, default: '' },
  timeStamp: { type: String, default: '' },
  userID: { type: String, default: '' },
  title: { type: String, default: '' },
  content: { type: String, default: '' },
  tags: { type: Array, default: () => [] },
  cameFrom: { type: String, default: '' },
  isCollected: { type: Boolean, default: false }
})
console.log(props.foo)

const db = useDatabase()
const storage = useFirebaseStorage()
const displayName = ref('')
const foodImageURL = ref('')

onValue(dbRef(db, '/users/' + props.userID), (snapshot) => {
  displayName.value = snapshot.val().firstName + ' ' + snapshot.val().lastName
  console.log(displayName.value)
})
getDownloadURL(storageRef(storage, props.foodImage)).then((url) => {
  foodImageURL.value = url
  console.log(foodImageURL.value)
})
</script>

<style scoped>
.line-break {
  white-space: pre-line;
}
</style>