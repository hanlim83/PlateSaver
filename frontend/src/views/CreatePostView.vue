<template>
    <div class="container-xxl display-3">Share your Food With Others</div>
    <div class="create-user">
      <form>

        <div class="mb-3">
          <input type="text" class="form-control" value="title" /> 
        </div>

        <div class="mb-3">
          <label for="food" class="form-label">Upload Image Here</label>
          <input type="" class="form-control" id="food" />
        </div>
        <div class="mb-3">
          <label for="food" class="form-label">Description:</label>
          <input type="text" class="form-control" id="food" />
        </div>
        <div class="mb-3">
          <label for="Tags" class="form-label">Tags:</label>
          <input type="text" class="form-control" id="food"  />
        </div>
        <button type="submit" class="btn btn-primary" @click="createPost()">
          Submit
        </button>
      </form>
  
      <br />
      <br />
    </div>
  </template>
  
  <script>
  const API_URL = "http://localhost:4000/";
  import axios from "axios";
  
  export default {
    name: "CreatePostView",
    data() {
      return {
        title:"",
        foodImage:"",
    	content:"",
    	userID:"",
	    timeStamp:"",
	    location:"",
	    tags:"",
	    collectionStatus: true,
        
      };
    },
    methods: {
    async createPost() {
      console.log("post: ", this.post);
      let response = await axios.post(API_URL + "post", {
        title: this.title,
        foodImage: this.foodImage,
        content: this.content,
    	userID: this.userID,
	    timeStamp: this.timeStamp,
	    location: this.location,
	    tags: this.tags,
	    collectionStatus: True,
      });
      console.log("Response: ", response);
    },
  },
  }
   
  </script>
  