<script setup>
import { useFirebaseAuth, useDatabaseList, useDatabase } from 'vuefire'
import { ref as dbRef } from 'firebase/database'
import IndivPost from '@/components/IndivPost.vue'
import { computed } from 'vue'

const auth = useFirebaseAuth()
const db = useDatabase()
const allposts = useDatabaseList(dbRef(db, 'Posts'))
const myposts = computed(() => {
  console.log(myposts)
  return allposts.value.filter((item) => item.userID == auth.currentUser.uid)
})
</script>
<template>
  <div class="row" data-masonry='{"percentPosition": true }'>
    <div class="inner-box">
      <div class="container">
        <b-card-group columns>
          <IndivPost v-for="(post, ind) in myposts" :key="ind" :id="post.id" :foodImage="post.foodImage" :timeStamp="post.timeStamp" :title="post.title" :userID="post.userID" :content="post.content" :tags="post.tags" />
        </b-card-group>
      </div>
    </div>
  </div>
</template>
