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
  <div class = "row">
      <div class = "h1 newHeader" style = "color: #3a57e8;text-align : center; padding-bottom : 20px;font-size : 225%;letter-spacing : 5px;"><img src="@/assets/recipebook.png" style="width: 50px" />&nbsp; My Recipes &nbsp;<img src="@/assets/recipebook.png" style="width: 50px" /></div>
  </div>
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
