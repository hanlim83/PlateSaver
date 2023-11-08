@@ -0,0 +1,174 @@
<template>
  <b-row>
    <b-col>
      <b-card no-body class="my-4 mx-2">
        <b-card-header class="d-flex justify-content-between">
          <div class="header-title">
            <b-card-title>Create Recipe</b-card-title>
          </div>
        </b-card-header>
        <b-card-body>
          <b-form id="form-wizard1" class="text-center mt-3">
            <ul id="top-tab-list" class="p-0 row list-inline">
              <li :class="`${currentindex == 1 ? 'active' : ''} ${currentindex > 1 ? 'done active' : ''} col-lg-3 col-md-6 mb-2 text-start `" id="details">
                <a @click="changeTab(1)">
                  <div class="iq-icon me-3">
                    <icon-component type="outlined" icon-name="document" :size="iconSize" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"> </path>
                  </div>
                  <span>Details</span>
                </a>
              </li>
              <li :class="`${currentindex == 2 ? 'active' : ''} ${currentindex > 2 ? 'done active' : ''} col-lg-3 col-md-6 mb-2 text-start `" id="ingredients">
                <a @click="changeTab(2)">
                  <div class="iq-icon me-3">
                    <icon-component type="outlined" icon-name="cart" :size="iconSize" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"> </path>
                  </div>
                  <span class="dark-wizard">Ingredients</span>
                </a>
              </li>
              <li :class="`${currentindex == 3 ? 'active' : ''} ${currentindex > 3 ? 'done active' : ''} col-lg-3 col-md-6 mb-2 text-start `" id="directions">
                <a @click="changeTab(3)">
                  <div class="iq-icon me-3">
                    <icon-component type="outlined" icon-name="controller" :size="iconSize" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"> </path>
                  </div>
                  <span class="dark-wizard">Directions</span>
                </a>
              </li>
              <li :class="`${currentindex == 4 ? 'active' : ''} ${currentindex > 4 ? 'done' : ''} col-lg-3 col-md-6 mb-2 text-start`" id="nutrition">
                <a @click="changeTab(4)">
                  <div class="iq-icon me-3">
                    <icon-component type="outlined" icon-name="adjustment" :size="iconSize" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"> </path>
                  </div>
                  <span class="dark-wizard">Nutritional Facts</span>
                </a>
              </li>
            </ul>

            <!-- Step 1: Details -->
            <div :class="`${currentindex == 1 ? 'show' : 'd-none'}`">
              <div class="form-card text-start">
                <b-row>
                  <div class="col-7">
                    <h3 class="mb-4">Details</h3>
                  </div>
                </b-row>
                <b-row>
                  <b-col md="6">
                    <b-form-group label="Recipe Name:">
                      <b-form-input type="text" id="recipename" class="form-control" :class="{ 'is-invalid': v$.details.name.$error }" placeholder="e.g. Leftover Chicken Croquettes" v-model="v$.details.name.$model" />
                      <div v-if="v$.details.name.$error" class="text-danger">Recipe name is required.</div>
                    </b-form-group>
                  </b-col>
                  <b-col md="6" class="order-1 order-md-3">
                    <b-form-group label="Description: ">
                      <b-form-textarea id="description" placeholder="e.g. This easy recipe using leftover chicken is amazing." :class="{ 'is-invalid': v$.details.description.$error }" rows="5" max-rows="12" v-model="v$.details.description.$model"></b-form-textarea>
                      <div v-if="v$.details.description.$error" class="text-danger">Description is required</div>
                    </b-form-group>
                  </b-col>
                  <b-col md="6" class="order-2">
                    <b-form-group label="Prep Time:">
                      <b-form-input type="text" id='preptime' class="form-control" name="preptime" :class="{ 'is-invalid': v$.details.preptime.$error }" placeholder="e.g. 15 minutes" v-model="v$.details.preptime.$model" />
                      <div v-if="v$.details.preptime.$error" class="text-danger">Preptime is required</div>
                    </b-form-group>
                  </b-col>
                  <b-col md="6" class="order-4">
                    <b-form-group label="Cooking Time:">
                      <b-form-input type="text" id="cookingtime" class="form-control" :class="{ 'is-invalid': v$.details.preptime.$error }" name="cooktime" placeholder="e.g. 20 minutes" v-model="v$.details.cooktime.$model" />
                      <div v-if="v$.details.cooktime.$error" class="text-danger">Cooktime is required</div>
                    </b-form-group>
                  </b-col>
                  <b-col md="6" class="order-4">
                    <div class="form-group">
                      <label class="form-label">Servings: </label>
                      <b-form-input type="text" id="servings" class="form-control" name="servings" :class="{ 'is-invalid': v$.details.servings.$error }" placeholder="e.g. 3 pax" v-model="v$.details.servings.$model" />
                      <div v-if="v$.details.servings.$error" class="text-danger">Servings is required</div>
                    </div>
                  </b-col>
                  <b-col md="6" class="order-last">
                    <div class="form-group">
                      <label class="form-label">Upload a photo:</label>
                      <input type="file" id="photo" class="form-control" name="pic" accept="image/*" @change="uploadImage" ref="image" :class="{ 'is-invalid': v$.details.files.$error }" />
                      <div v-if="v$.details.files.$error" class="text-danger">A photo is required</div>
                    </div>
                  </b-col>
                </b-row>
              </div>

              <b-button id="nextbutton" class="btn btn-primary next action-button float-end" @click="changeTab(2)" value="Next">Next</b-button>
            </div>

            <!-- Step 2: Ingredients -->
            <div :class="`${currentindex == 2 ? 'show' : 'd-none'}`">
              <div class="form-card text-start">
                <b-row>
                  <div class="col-7">
                    <h3 class="mb-4">Ingredients</h3>
                  </div>
                </b-row>
                <b-row>
                  <b-form-group>
                    <label>Enter one ingredient per line. Include the quantity (i.e. cups, tablespoons) and any special preparation (i.e. sifted, softened, chopped).</label>
                  </b-form-group>
                  <b-col md="12" v-for="(value, key) in ingredients" :key="key">
                    <b-form-group>
                      <b-form-input :id="'ingredient'+ key" type="text" class="form-control" :placeholder="'e.g. ' + ingredientPlaceHolder[key % 5]" v-model="ingredients[key]" />
                    </b-form-group>
                  </b-col>

                  <b-col md="6" class="order-last">
                    <b-button class="btn btn-info" @click="addIngredient()">Add Row</b-button>
                  </b-col>
                </b-row>
              </div>

              <b-button class="btn btn-primary next action-button float-end" @click="changeTab(3)" value="Next">Next</b-button>
              <b-button @click="changeTab(1)" class="btn btn-dark previous action-button-previous float-end me-1" value="Previous">Previous</b-button>
            </div>

            <!-- Step 3: Directions -->
            <div id="payment" :class="`${currentindex == 3 ? 'show' : 'd-none'}`">
              <div class="form-card text-start">
                <b-row>
                  <div class="col-7">
                    <h3 class="mb-4">Directions</h3>
                  </div>
                </b-row>
                <b-row>
                  <b-form-group>
                    <label>Explain how to make your recipe, including oven temperatures, baking or cooking times, and pan sizes, etc.</label>
                  </b-form-group>
                  <b-col md="12" v-for="(value, key) in directions" :key="key">
                    <b-form-group>
                      <b-form-input :id="'direction'+ key" type="text" class="form-control" :placeholder="'e.g. ' + directionPlaceHolders[key % directionPlaceHolders.length]" v-model="directions[key]" />
                    </b-form-group>
                  </b-col>

                  <b-col md="6" class="order-last">
                    <b-button id="adddirection" class="btn btn-info" @click="addDirections()">Add Row</b-button>
                  </b-col>
                </b-row>
              </div>

              <b-button class="btn btn-primary next action-button float-end" @click="changeTab(4)" value="Next">Next</b-button>
              <b-button @click="changeTab(2)" class="btn btn-dark previous action-button-previous float-end me-1" value="Previous">Previous</b-button>
            </div>

            <!-- Step 4: Nutritional Facts -->
            <div id="nutrition" :class="`${currentindex == 4 ? 'show' : 'd-none'}`">
              <div class="form-card text-start">
                <b-row>
                  <div class="col-7">
                    <h3 class="mb-4">Nutritional Facts</h3>
                  </div>
                </b-row>
                <b-row>
                  <b-col md="6">
                    <b-form-group label="Calories:">
                      <b-form-input id="calories" type="text" class="form-control" name="calroies" placeholder="e.g. 228 kcal" v-model="v$.nutritionDetails.calories.$model" :class="{ 'is-invalid': v$.nutritionDetails.calories.$error }" />
                      <div v-if="v$.nutritionDetails.calories.$error" class="text-danger">Calories is required</div>
                    </b-form-group>
                  </b-col>
                  <b-col md="6">
                    <b-form-group label="Carbohydrates:">
                      <b-form-input id="carbs" type="text" class="form-control" name="carbs" placeholder="e.g. 22g" v-model="v$.nutritionDetails.carbohydrates.$model" :class="{ 'is-invalid': v$.nutritionDetails.carbohydrates.$error }" />
                      <div v-if="v$.nutritionDetails.carbohydrates.$error" class="text-danger">Carbohydrates is required</div>
                    </b-form-group>
                  </b-col>
                  <b-col md="6">
                    <b-form-group label="Fat:">
                      <b-form-input id="fat" type="text" class="form-control" name="fat" placeholder="e.g. 14g" v-model="v$.nutritionDetails.fat.$model" :class="{ 'is-invalid': v$.nutritionDetails.fat.$error }" />
                      <div v-if="v$.nutritionDetails.fat.$error" class="text-danger">Fat is required</div>
                    </b-form-group>
                  </b-col>
                  <b-col md="6">
                    <b-form-group label="Protein:">
                      <b-form-input id="protein" type="text" class="form-control" name="protein" placeholder="e.g. 10g" v-model="v$.nutritionDetails.protein.$model" :class="{ 'is-invalid': v$.nutritionDetails.protein.$error }" />
                      <div v-if="v$.nutritionDetails.protein.$error" class="text-danger">Protein is required</div>
                    </b-form-group>
                  </b-col>
                  <b-col md="6">
                    <b-form-group label="Sodium:">
                      <b-form-input id="sodium" type="text" class="form-control" name="sodium" placeholder="e.g. 368mg" v-model="v$.nutritionDetails.sodium.$model" :class="{ 'is-invalid': v$.nutritionDetails.sodium.$error }" />
                      <div v-if="v$.nutritionDetails.sodium.$error" class="text-danger">Sodium is required</div>
                    </b-form-group>
                  </b-col>
                  <b-col md="6">
                    <b-form-group label="Cholesterol:">
                      <b-form-input id="cholesterol" type="text" class="form-control" name="cholestrol" placeholder="e.g. 0mg" v-model="v$.nutritionDetails.cholestrol.$model" :class="{ 'is-invalid': v$.nutritionDetails.cholestrol.$error }" />
                      <div v-if="v$.nutritionDetails.cholestrol.$error" class="text-danger">Cholesterol is required</div>
                    </b-form-group>
                  </b-col>
                </b-row>
              </div>

              <b-button id="submitrecipe" class="btn btn-success me-1 float-end" value="Previous" @click="createRecipe()">Submit</b-button>
              <b-button @click="changeTab(3)" class="btn btn-dark previous action-button-previous float-end me-1" value="Previous">Previous</b-button>
            </div>
          </b-form>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import IconComponent from '@/components/icons/IconComponent.vue'
import { useFirebaseAuth, useFirebaseStorage, useDatabase } from 'vuefire'
import { ref as storageRef, uploadBytes } from 'firebase/storage'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { toast } from 'vue3-toastify'
import { ref as dbRef, push, update } from 'firebase/database'

const auth = useFirebaseAuth()
const storage = useFirebaseStorage()

export default {
  name: 'CreateRecipeView',
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      iconSize: 25,
      currentindex: 1,
      //Page 1
      details: {
        name: '',
        description: '',
        preptime: '',
        cooktime: '',
        servings: '',
        files: []
      },
      //Page 2
      ingredients: ['', '', ''],
      ingredientPlaceHolder: ['2 cups flour sifted', '1/2 tablespoons butter, softened', '1 cup sugar', '1/2 teaspoon salt', '4 cups milk'],
      //Page 3
      directions: ['', '', ''],
      directionPlaceHolders: ['Preheat oven to 175 degrees C).', 'Grease and flour a 9x9 inch pan or line a muffin pan with paper liners.', 'In a medium bowl, cream together the sugar and butter.', 'Beat in the eggs, one at a time, then stir in the vanilla.', 'Combine flour and baking powder, add to the creamed mixture and mix well.'],
      //Page 4
      nutritionDetails: {
        calories: '',
        carbohydrates: '',
        fat: '',
        protein: '',
        sodium: '',
        cholestrol: ''
      }
    }
  },
  async created() {
    //Receive imported recipe from session storage
    let importedData = JSON.parse(sessionStorage.getItem('importedRecipe'))
    if (importedData) {
      this.details.name = importedData.name
      this.details.servings = importedData.yield
      this.ingredients = importedData.ingredientLines
      this.nutritionDetails.calories = importedData.calories.toFixed() + ' kcal'
      this.nutritionDetails.carbohydrates = importedData.totalNutrients.CHOCDF.quantity.toFixed() + ' ' + importedData.totalNutrients.CHOCDF.unit
      this.nutritionDetails.fat = importedData.totalNutrients.FAT.quantity.toFixed() + ' ' + importedData.totalNutrients.FAT.unit
      this.nutritionDetails.protein = importedData.totalNutrients.PROCNT.quantity.toFixed() + ' ' + importedData.totalNutrients.PROCNT.unit
      this.nutritionDetails.sodium = importedData.totalNutrients.NA.quantity.toFixed() + ' ' + importedData.totalNutrients.NA.unit
      this.nutritionDetails.cholestrol = importedData.totalNutrients.CHOLE.quantity.toFixed() + ' ' + importedData.totalNutrients.CHOLE.unit

      //Image
      //Cannot fix because of CORS issue
      sessionStorage.removeItem('importedRecipe')
    }
  },
  components: {
    IconComponent
  },
  validations() {
    return {
      details: {
        name: { required, $lazy: true },
        preptime: { required, $lazy: true },
        cooktime: { required, $lazy: true },
        servings: { required, $lazy: true },
        description: { required, $lazy: true },
        files: { required, $lazy: true }
      },
      nutritionDetails: {
        calories: { required, $lazy: true },
        carbohydrates: { required, $lazy: true },
        fat: { required, $lazy: true },
        protein: { required, $lazy: true },
        sodium: { required, $lazy: true },
        cholestrol: { required, $lazy: true }
      }
    }
  },
  methods: {
    async changeTab(val) {
      this.currentindex = val
    },
    addIngredient() {
      this.ingredients.push('')
    },
    addDirections() {
      this.directions.push('')
    },
    async createRecipe() {
      //validate form
      if (!(await this.v$.details.$validate())) {
        toast('Details not complete', {
          autoClose: 5000,
          type: 'error'
        })
        this.changeTab(1)
        return
      }
      if (!(await this.v$.nutritionDetails.$validate())) {
        toast('Nutritional Details not complete', {
          autoClose: 5000,
          type: 'error'
        })
        this.changeTab(4)
        return
      }

      //get current date
      let current = new Date()
      let dateNow = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`

      let data = {
        name: this.details.name,
        description: this.details.description,
        preptime: this.details.preptime,
        cooktime: this.details.cooktime,
        servings: this.details.servings,
        ingredients: this.ingredients,
        directions: this.directions,
        nutritionDetails: this.nutritionDetails,
        date_created: dateNow,
        username: auth.currentuser.displayName
        //username: "Selena Oleksandr Dmytrovych Yaroslav Yevhenovych Kovalenko"// Hardcode username for selenium
      }

      //Remove empty strings from arrays
      data.ingredients = data.ingredients.filter(function (el) {
        return el != ''
      })
      data.directions = data.directions.filter(function (el) {
        return el != ''
      })

      const db = useDatabase()
      push(dbRef(db, '/recipes'), data).then((res) => {
        let id = res.key
        //Upload image
        let imagePath = 'recipes/' + id + '/' + this.details.files[0].name
        let newFileRef = storageRef(storage, imagePath)
        uploadBytes(newFileRef, this.details.files[0]).then(async () => {
          //Send Image Path to db
          update(dbRef(db, '/recipes/' + id), { imagePath: imagePath }).then(() => {
            this.$router.push({ name: 'recipe.viewDetails', params: { id: id } })
          })
        })
      })
    },
    uploadImage(event) {
      this.details.files = event.target.files
      // console.log("Files: ", this.details.files);
    }
  }
}
</script>
