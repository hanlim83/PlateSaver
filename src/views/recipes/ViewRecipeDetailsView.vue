<template>
  <div class="bg"></div>
  <div class="bg bg2"></div>
  <div class="bg bg3"></div>
  <div class="row">
    <div class="col-xl-8 col-md-10 mx-auto">
      <div class="card mt-4">
        <div class="card-body p-6">
          <a @click="backBtn"
            ><icon-component type="outlined" icon-name="arrow-circle-left" />
            Recipes
          </a>
          <p class="text-primary pt-3">{{ recipe.date_created }}</p>
          <h1 class="mt-2">{{ recipe.name }}</h1>
          <div class="d-flex align-items-center my-3">
            <span class="badge bg-info py-1 mx-1 text-capitalize fs-5">Delicious</span>
            <span class="badge bg-warning py-1 mx-1 text-capitalize fs-5">Popular</span>
          </div>
          <h6 class="">By: {{ recipe.username }}</h6>
          <p class="mt-3">{{ recipe.description }}</p>
          <img :src="imageURL" class="img-fluid rounded" loading="lazy" />

          <!-- Details Section -->
          <div class="card bg-soft-info mt-4">
            <div class="card-body p-6 pb-1 text-black-50">
              <div class="row">
                <div class="col-4">
                  <label class="fw-bold">Preparation Time:</label>
                  <b-card-text class="">{{ recipe.preptime }}</b-card-text>
                </div>
                <div class="col-4">
                  <label class="fw-bold">Cooking Time:</label>
                  <p class="">{{ recipe.cooktime }}</p>
                </div>
                <div class="col-4">
                  <label class="fw-bold">Servings:</label>
                  <p class="">{{ recipe.servings }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Ingredients Section -->
          <h2 class="mt-3 mb-2">Ingredients</h2>
          <div class="">
            <b-form-checkbox v-for="(value, key) in recipe.ingredients" :key="key">
              {{ value }}
            </b-form-checkbox>
          </div>

          <!-- Directions Section -->
          <h2 class="mt-3 mb-2">Directions</h2>
          <div class="" v-for="(value, key) in recipe.directions" :key="key">
            <label class="fw-bolder">Step {{ key + 1 }}:</label>
            <p class="">{{ value }}</p>
          </div>

          <!-- Nutritional Details Section -->
          <b-card class="card bg-soft-info mt-4" title="Nutritional Facts">
            <div class="card-body p-3 pb-1 text-black-50">
              <div class="row">
                <b-row class="row-cols-1 row-cols-md-2 row-cols-lg-3 mb-3 text-center">
                  <b-col v-for="(value, key) in recipe.nutritionDetails" :key="key">
                    <b-card class="mb-4 rounded-3 bg-soft-info text-black-50">
                      <!-- <h2 class="">{{ value }}</h2>
                                            <h6 class="my-0 fw-normal mt-3 text-capitalize text-black-50">{{ key }}</h6> -->
                      <label class="fw-bolder fs-2">{{ value }}</label>
                      <b-card-text class="text-capitalize">{{ key }}</b-card-text>
                    </b-card>
                  </b-col>
                </b-row>
              </div>
            </div>
          </b-card>
        </div>
      </div>

      <b-card class="">
        <h3 class="my-3">Comments({{ commentsNo }})</h3>
        <b-card class="shadow-none bg-transparent border mb-3" v-for="(value, key) in recipe.comments" :key="key">
          <h5>{{ value.name }}</h5>
          <small class="text-primary">{{ value.date }}</small>
          <p class="mt-2">{{ value.text }}</p>
        </b-card>

        <b-card class="shadow-none bg-transparent border mb-3" v-if="commentsNo === 0">
          <p class="mt-2 text-center">No comments yet.</p>
        </b-card>
      </b-card>

      <b-card class="">
        <h3 class="mt-3 mb-4">Leave a comment</h3>
        <b-row>
          <b-col md="6">
            <b-form-group label="Name:">
              <b-form-input type="text" class="form-control" name="comement-name" placeholder="e.g. Mokkie Mok" v-model="v$.comment.name.$model" :class="{ 'is-invalid': v$.comment.name.$error }" />
              <div v-if="v$.comment.name.$error" class="text-danger">Name is required</div>
            </b-form-group>
          </b-col>
          <b-col md="6" class="">
            <b-form-group label="Email: ">
              <b-form-input type="text" class="form-control" name="comment-email" placeholder="e.g. hungryman@email.com" v-model="v$.comment.email.$model" :class="{ 'is-invalid': v$.comment.email.$error }" />
              <div v-if="v$.comment.email.$error" class="text-danger">Invalid Email</div>
            </b-form-group>
          </b-col>
          <b-col md="12">
            <b-form-group label="Comment: ">
              <b-form-textarea id="comment-text" placeholder="e.g. This was delicious!" rows="2" max-rows="12" v-model="v$.comment.text.$model" :class="{ 'is-invalid': v$.comment.text.$error }"></b-form-textarea>
              <div v-if="v$.comment.text.$error" class="text-danger">No comment</div>
            </b-form-group>
          </b-col>
        </b-row>
        <b-button class="btn-primary" @click="createComment()">Submit</b-button>
      </b-card>
    </div>
  </div>
</template>

<script>
import { ref as storageRef, getDownloadURL } from 'firebase/storage'
import { useFirebaseAuth, useFirebaseStorage, useDatabaseObject, useDatabase } from 'vuefire'
import { ref as dbRef, push } from 'firebase/database'
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

const storage = useFirebaseStorage()

export default {
  name: 'ViewRecipeDetailsView',
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      id: this.$route.params.id,
      commentsNo: 0,
      recipe: {},
      imageURL: '',
      comment: {
        name: '',
        email: '',
        text: ''
      }
    }
  },
  validations() {
    return {
      comment: {
        name: { required },
        email: { required, email },
        text: { required }
      }
    }
  },
  async created() {
    await this.getRecipe()
    let imagePath
    if (this.recipe.imagePath) {
      imagePath = this.recipe.imagePath
    } else {
      imagePath = 'missing.png'
    }
    getDownloadURL(storageRef(storage, imagePath))
      .then((url) => {
        this.imageURL = url
      })
      .catch((error) => {
        console.log(error)
      })
    let auth = useFirebaseAuth()
    if (auth.currentUser) {
      this.comment.name = auth.currentUser.displayName
      this.comment.email = auth.currentUser.email
    }
  },
  components: {},
  methods: {
    async getRecipe() {
      const db = useDatabase()
      const { data: recipeData, promise: recipePromise } = useDatabaseObject(dbRef(db, 'recipes/' + this.id))
      console.log('AAA:', recipeData)
      await recipePromise.value
      console.log('BBB:', recipeData)
      this.recipe = recipeData
      if (typeof this.recipe.comments != 'undefined') {
        this.commentsNo = Object.keys(this.recipe.comments).length
      }
    },
    async createComment() {
      //validate form
      if (!(await this.v$.comment.$validate())) {
        return
      }

      // get current date
      let current = new Date()
      let dateNow = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`

      let data = {
        name: this.comment.name,
        email: this.comment.email,
        text: this.comment.text,
        date: dateNow
      }
      const db = useDatabase()
      const { promise: commentPromise } = push(dbRef(db, '/recipes/' + this.id + '/comments'), data)
      await commentPromise
      //clear form
      this.comment.name = ''
      this.comment.email = ''
      this.comment.text = ''
      this.v$.$reset()
      //Update new comments
      await this.getRecipe()
    },
    backBtn() {
      this.$router.go(-1)
    }
  }
}
</script>
