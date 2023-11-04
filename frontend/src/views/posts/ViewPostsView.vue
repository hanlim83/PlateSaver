<script setup>
import { useDatabaseList, useDatabase } from 'vuefire'
import { ref as dbRef } from 'firebase/database'
import IndivPost from '@/components/IndivPost.vue'

const db = useDatabase()
const allposts = useDatabaseList(dbRef(db, 'Posts'))
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
  <div class="row" data-masonry='{"percentPosition": true }'>
    <div class="inner-box">
      <div class="container">
        <b-card-group columns>
          <IndivPost v-for="(post, ind) in allposts" :key="ind" :id="ind" :foodImage="post.foodImage" :timeStamp="post.timeStamp" :title="post.title" :userID="post.userID" :content="post.content" :tags="post.tags" />
        </b-card-group>
      </div>
    </div>
  </div>
</template>
