<script setup>
import { useDatabaseList, useDatabase } from 'vuefire'
import { ref as dbRef } from 'firebase/database'
import IndivPost from '@/components/IndivPost.vue'
import { computed } from 'vue'

const db = useDatabase()
const allposts = useDatabaseList(dbRef(db, 'posts'))
const uncollectedPosts = computed(() => {
  return allposts.value.filter((item) => item.collectionStatus == false)
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
              :userID="post.userID" :content="post.content" :tags="post.tags" :is-collected="post.collectionStatus"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
