<script setup>
import { useFirebaseAuth, useDatabaseList, useDatabase } from 'vuefire'
import { ref as dbRef } from 'firebase/database'
import IndivPost from '@/components/IndivPost.vue'
import { computed } from 'vue'

const auth = useFirebaseAuth()
const db = useDatabase()
const allposts = useDatabaseList(dbRef(db, 'posts'))
const myposts = computed(() => {
  console.log("POSTS: ", myposts)
  return allposts.value.filter((item) => item.userID == auth.currentUser.uid)
})
</script>
<template>
  <div class="bg"></div>
  <div class="bg bg2"></div>
  <div class="bg bg3"></div>
  <div class="row" data-masonry='{"percentPosition": true }'>
    <div class="inner-box">
      <div class="container">
        <div class="row">
          <div class="col-md-6 col-lg-4" v-for="(post, ind) in myposts" :key="ind">
            <IndivPost :id="post.id" :foodImage="post.foodImage" :timeStamp="post.timeStamp" :title="post.title"
              :userID="post.userID" :content="post.content" :tags="post.tags" :is-collected="post.collectionStatus" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
