<template>

<div>
  <b-card-group deck>
    <template v-for="(post, index) in allposts" :key="index">
      <b-card  v-if="post.status" 
        :title="post.title"
        style="min-width: 20rem;"
        class="mb-2" 
        :img-src= "post.foodImage" 
        img-top
        :sub-title="`by ${getUserName(post)}`"> <!--idk about the food image-->


        <b-card-text>{{ post.content }}</b-card-text>
        <b-card-text>{{ post.location }}</b-card-text>
        
        <b-button href="#" variant="primary">View details</b-button>
        <template #footer>
          <small class="text-muted">Posted on: {{ post.timeStamp }}</small>
          <br/>
          <small class="text-muted">Posted on: {{ post.tag }}</small>
        </template>

      </b-card>
    </template>
    
</b-card-group>
</div>
</template>
<script>
const API_URL = "http://localhost:4000/";
  import axios from "axios";
  import { ref as dbRef } from 'firebase/database';
  import { useDatabase, useDatabaseObject } from 'vuefire';

  const db = useDatabase();
  
  
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
	    status:"",
      allposts:[]
      };
  },
  components: {},
  methods: {
    async getPosts() {
      let response = await axios.get(API_URL + "posts");
      this.allposts = response.data.data;
      console.log("Posts: ", this.allposts);
    },
    async getUserName(post){
      var userExtendedData = useDatabaseObject(dbRef(db,'users', post.userid));
      return userExtendedData.username;
    },
  },
};

</script>