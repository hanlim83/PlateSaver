<template>
  <div>
    
    <b-card-group deck>
      <template v-for="(post, index) in allposts" :key="index">
        <b-card v-if="post.collectionStatus" :title="post.title" style="min-width: 20rem" class="mb-2" :img-src="post.foodImage" img-top>
          <!--idk about the food image-->

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
<script>
const API_URL = 'http://localhost:4000/'
import axios from 'axios'

export default {
  name: 'ViewPostsView',
  data() {
    return {
      title: '',
      foodImage: '',
      content: '',
      userID: '',
      timeStamp: '',
      location: '',
      tags: '',
      collectionStatus: '',
      allposts: []
    }
  },
  components: {},
  methods: {
    async getPosts() {
      let response = await axios.get(API_URL + 'posts')
      this.allposts = response.data.data
      console.log('Posts: ', this.allposts)
    }
  }
}
</script>
