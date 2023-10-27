<!--<style>
input[type=text], input[type=file] {
  border:1px solid black;
}

</style>-->

<template>
  <div class="container-xxl display-3 text-center text-primary"><strong>Share your Food With Others!</strong></div>
  <br/>
  <br/>
  <div class="create-post">


    <div class="card text-bg-dark">
      <img src="@/assets/fried_rice_banner.png">
      <div class="card-img-overlay">
        <div class="card-title display-5 text-left align-middle text-dark fw-bold w-50 h-100 overflow-auto text-capitalize">
          {{ title }}
        </div>
      </div>
    </div>
    <br/>
    <form onsubmit="return false">


      <div class="row g-3">
      <div class="col"></div>

      <div class="col-4 mb-3">
        <input type="text" class="form-control text-center" v-model="title" placeholder="Title" id="title"/>
      </div>

      <div class="col"></div>
      </div>


      
      <div class="mb-3">
        <label for="description" class="form-label">Description:</label>
        <textarea class="form-control" id="description" rows="3" v-model="content"></textarea>
      </div>


      <div class="row">
        <div class="col"></div>

        <div class="col-4 mb-3 ">
          <label class="form-label mb-0" for="customFile">Upload An Image:</label>
          <input type="file" class="form-control" id="customFile">
        </div>


        <div class="col-4 mb-3">
          <label for="Tags" class="form-label mb-0">Hashtags:</label>
          <input type="text" class="form-control" id="food" v-model="tags"/>
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
      
    }
  },
  methods: {
    async createPost() {
      // Get the day the post was made
      var today = new Date();
      var now = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
      this.timeStamp=now;
      
      
      let response = await axios.post(API_URL + 'post', {
        title: this.title,
        foodImage: this.foodImage,
        content: this.content,
        userID: this.userID,
        timeStamp: this.timeStamp,
        location: this.location,
        tags: this.tags,
        collectionStatus: this.collectionStatus
      });
      console.log('post: ', this.post)
      console.log('Response: ', response);
    },

  }
}
</script>
