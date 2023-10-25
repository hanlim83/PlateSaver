<style>
.centerCropped {
  object-fit: none; /* Do not scale the image */
  object-position: center; /* Center the image within the element */
  height: 100px;
  width: 100%;
}
</style>

<template>
  <div class="container-xxl display-3 text-center text-primary"><strong>Share your Food With Others</strong></div>
  <br/>
  <br/>
  <div class="create-post">
      <div class="flex mx-auto display-2 text-center text-dark fw-bold">
        <img src="@/assets/frontpage.jpeg" class="centerCropped ">
        {{ titleHeaderforPost }}
      </div>
    <br/>
    <form >


      <div class="row g-3">
      <div class="col"></div>

      <div class="col-4 mb-3">
        <input type="text" class="form-control text-center" v-model="titleHeaderforPost" placeholder="Title" id="title"/>
      </div>

      <div class="col"></div>
      </div>


      
      <div class="mb-3">
        <label for="description" class="form-label">Description:</label>
        <textarea class="form-control" id="description" rows="3"></textarea>
      </div>


      <div class="row">
        <div class="col"></div>

        <div class="col-4 mb-3 ">
          <label class="form-label mb-0" for="customFile">Upload An Image:</label>
          <input type="file" class="form-control" id="customFile">
        </div>
        <div class="col-4 mb-3">
          <label for="Tags" class="form-label mb-0">Hashtags:</label>
          <input type="text" class="form-control" id="food" />
        </div>

        <div class="col"></div>
      </div>
        <button type="submit" class="btn btn-primary" @click="createPost()">Submit</button>
      
    </form>

    <br />
    <br />
  </div>
</template>

<script>


const API_URL = 'http://localhost:4000/'
import axios from 'axios'

export default {
  name: 'CreatePostView',
  data() {
    return {
      title: '',
      foodImage: '',
      content: '',
      userID: '',
      timeStamp: '',
      location: '',
      tags: '',
      collectionStatus: true,
      titleHeaderforPost:""
    }
  },
  methods: {
    async createPost() {
      console.log('post: ', this.post)
      let response = await axios.post(API_URL + 'post', {
        title: this.title,
        foodImage: this.foodImage,
        content: this.content,
        userID: this.userID,
        timeStamp: this.timeStamp,
        location: this.location,
        tags: this.tag,
        status: true
      })

      console.log('Response: ', response)
    },

  }
}
</script>
