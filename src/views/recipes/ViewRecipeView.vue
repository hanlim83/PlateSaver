<template>
  <b-row>
    <div class = "row">
      <div class = "h1 newHeader" style = "color: #3a57e8;text-align : center; padding-bottom : 20px;font-size : 225%;letter-spacing : 5px;"><img src="@/assets/cheficon.png" style="width: 50px" />&nbsp; Recipes &nbsp;<img src="@/assets/cheficon.png" style="width: 50px" /></div>
    </div>
    
    <div class="inner-box">
      <div class="container">
        <div class="row ">
          <div class="col-xl-4 col-lg-6" v-for="(value, key) in recipes" :key="key">
            <RecipeOne :id="value.id" :recipeImage="value.imageURL" :recipeDate="value.date_created" :recipeTitle="value.name" :recipeAuthor="value.username" :recipeDescription="value.description" />
          </div>
        </div>
      </div>
    </div>
  </b-row>
</template>

<script>
import RecipeOne from '@/components/RecipeOne.vue'

import { ref as storageRef, getDownloadURL } from 'firebase/storage'
import { useFirebaseStorage, useDatabaseList, useDatabase } from 'vuefire'
import { ref as dbRef } from 'firebase/database'

const storage = useFirebaseStorage()

export default {
  name: 'ViewRecipeView',
  data() {
    return {
      recipes: []
    }
  },
  async created() {
    await this.getRecipes()

    //Add image paths
    for (let recipe in this.recipes) {
      let imagePath 
      if (this.recipes[recipe].imagePath){
        imagePath = this.recipes[recipe].imagePath
      }else{
        imagePath = 'missing.png'
      }
      getDownloadURL(storageRef(storage, imagePath))
        .then((url) => {
          this.recipes[recipe]['imageURL'] = url
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  components: {
    RecipeOne
  },
  methods: {
    async getRecipes() {
      const db = useDatabase()
      const { data: recipeData, promise: recipePromise } = useDatabaseList(dbRef(db, 'recipes'))
      await recipePromise.value
      this.recipes = recipeData
    }
  }
}
</script>
