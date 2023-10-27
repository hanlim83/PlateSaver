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
  <b-row>
      <div class="inner-box">
          <div class="container">
              <div class="row">
                  <div class="col-lg-4" v-for="(value, key) in allposts" :key="key">
                      <IndivPost :id="key" :foodImage="require('@/assets/images/avatars/01.png')"
                          :timeStamp="value.timeStamp" :title="value.title" userID="Jiawei"
                          :content="value.content" />
                  </div>
              </div>
          </div>
      </div>
  </b-row>

  
</template>


<script>
import { API_URL } from "@/config";
import IndivPost from '@/components/IndivPost.vue';
import axios from 'axios';

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
  created() {
      this.getPosts();
  },
  components: {
      IndivPost
  },
  methods: {
    async getPosts() {
      let response = await axios.get(API_URL + 'posts')
      this.allposts = response.data.data
      console.log('Posts: ', this.allposts)
      
    }
  }
}
</script>

<!--
<template>
  <b-row>
      <div class="inner-box">
          <div class="container">
              <div class="row">
                  <div class="col-lg-4" v-for="(value, key) in recipes" :key="key">
                      <RecipeOne :id="key" :recipeImage="require('@/assets/images/avatars/01.png')"
                          recipeDate="December 26, 2022" :recipeTitle="value.name" recipeAuthor="Jiawei"
                          :recipeDescription="value.description" />
                  </div>
              </div>
          </div>
      </div>
  </b-row>

  
</template>

<script>
import axios from "axios";
import { API_URL } from "@/config";
import RecipeOne from '@/components/RecipeOne.vue'

export default {
  name: "ViewRecipeView",
  data() {
      return {
          recipes: []
      };
  },
  created() {
      this.getRecipes();
  },
  components: {
      RecipeOne
  },
  methods: {
      async getRecipes() {
          let response = await axios.get(API_URL + "recipes");
          this.recipes = response.data.data;
          console.log("recipes: ", this.recipes);
          //get keys from array
          console.log(Object.keys(this.recipes)[0]);
      },
  }
};


</script>
-->