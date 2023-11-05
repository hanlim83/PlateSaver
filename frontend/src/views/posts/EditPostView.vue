<!-- Using same structure as createpost-->

<template>
    <div class="container-xxl display-3 text-center text-primary"><strong>Edit Your Post</strong></div>
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
          <input type="text" class="form-control text-center" v-model="title"  id="title"/><!--got rid of placeholder, change to previous title value -->
        </div>
  
        <div class="col"></div>
        </div>
  
  
        <div class="row">
            <div class="col-12 col-md-6" id="imgDisplay"><!--<img id="imgDisplay" src='' />-->
                
            </div>

            <div class="col-12 col-md-6 mb-3">
                <label for="description" class="form-label">Description:</label>
                <textarea class="form-control" id="description" rows="3" v-model="content"></textarea>
            </div>

        </div>
              
        
        
        

        <div class="row">
            <div class="col-4 mb-3">
                <label class="form-label mb-0" for="customFile">Contact:</label>
                <input type="text" class="form-control" id="contact" v-model="contact">
            </div>
            
          <div class="col-4 mb-3 ">
            <label class="form-label mb-0" for="customFile">Upload An Image:</label>
            <input type="file" class="form-control" id="customFile"> <!-- @="changeImgDisplay" cant use v-model for files-->
          </div>
  
  
          <div class="col-4 mb-3">
            <label for="Tags" class="form-label mb-0">Hashtags:</label>
            <input type="text" class="form-control" id="food" v-model="tags"/>
          </div>
  
          <div class="col"></div>
        </div>
        <div class="row">
            <div class="col">
                <button type="submit" class="btn btn-primary" @click="createPost()">Confirm Changes</button>
            </div>

            <div class="col"></div>

            <div>
                <button @click="deletePost()">Delete Post</button> <!--probably a <a href> button-->
            </div>

            <div class="col"></div>

            <div class="col">

            </div>
        </div>
      </form>
  
      <br />
      <br />
    </div>
  </template>
  
  <script>
  
  
  const API_URL = 'http://localhost:4000/'
  import axios from 'axios'
  
  export default {
    name: 'EditPostView',
    data() {
      return {
        title: '',
        foodImage: '',
        content: '',
        userID: '',
        timeStamp: '',
        location: '',
        tags: [],
        contact:'',
        collectionStatus: true,
        
      }
    },
    created(){
        this.getPost();// get the specific post by post id
    },
    methods: {
      async editPost() {
        // Get the day the post was made
        var today = new Date();
        var now = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        this.timeStamp=now;
        
        
        let response = await axios.post(API_URL + 'posts', {
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
      //changeImgDisplay(){ //function to change the displayed food image of the post
       /// imgdisplay=document.getElementById('imgDisplay')
        //imgdisplay.src=this.foodImage;
      //}
    }
  }
  </script>
  