<template>

</template>
<script>
const API_URL = "http://localhost:4000/";
  import axios from "axios";
  
  export default {
    name: "ViewPostView",
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
    async getPosts() {
      console.log("post: ", this.post);
      let response = await axios.post(API_URL + "post", {
        title: this.title,
        foodImage: this.foodImage,
        content: this.content,
    	userID: this.userID,
	    timeStamp: this.timeStamp,
	    location: this.location,
	    tags: this.tags,
	    collectionStatus: true,
      });
      console.log("Response: ", response);
    },
  },
  }
</script>