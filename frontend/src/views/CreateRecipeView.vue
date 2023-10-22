@@ -0,0 +1,174 @@
<template>
    <b-row>
        <b-col sm="12">
            <b-card no-body class="my-4 mx-2">
                <b-card-header class="d-flex justify-content-between">
                    <div class="header-title">
                        <b-card-title>Create Recipe</b-card-title>
                    </div>
                </b-card-header>
                <b-card-body>
                    <b-form id="form-wizard1" class="text-center mt-3">
                        <ul id="top-tab-list" class="p-0 row list-inline">
                            <li :class="`${currentindex == 1 ? 'active' : ''} ${currentindex > 1 ? 'done active' : ''} col-lg-3 col-md-6 mb-2 text-start `"
                                id="details">
                                <a @click="changeTab(1)">
                                    <div class="iq-icon me-3">
                                        <icon-component type="outlined" icon-name="document" :size="iconSize" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z">
                                        </path>
                                    </div>
                                    <span>Details</span>
                                </a>
                            </li>
                            <li :class="`${currentindex == 2 ? 'active' : ''} ${currentindex > 2 ? 'done active' : ''} col-lg-3 col-md-6 mb-2 text-start `"
                                id="ingredients">
                                <a @click="changeTab(2)">
                                    <div class="iq-icon me-3">
                                        <icon-component type="outlined" icon-name="cart" :size="iconSize" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z">
                                        </path>
                                    </div>
                                    <span class="dark-wizard">Ingredients</span>
                                </a>
                            </li>
                            <li :class="`${currentindex == 3 ? 'active' : ''} ${currentindex > 3 ? 'done active' : ''} col-lg-3 col-md-6 mb-2 text-start `"
                                id="directions">
                                <a @click="changeTab(3)">
                                    <div class="iq-icon me-3">
                                        <icon-component type="outlined" icon-name="controller" :size="iconSize" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z">
                                        </path>
                                    </div>
                                    <span class="dark-wizard">Directions</span>
                                </a>
                            </li>
                            <li :class="`${currentindex == 4 ? 'active' : ''} ${currentindex > 4 ? 'done' : ''} col-lg-3 col-md-6 mb-2 text-start `"
                                id="nutrition">
                                <a @click="changeTab(4)">
                                    <div class="iq-icon me-3">
                                        <icon-component type="outlined" icon-name="adjustment" :size="iconSize" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z">
                                        </path>
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
                                            <b-form-input type="text" class="form-control" name="name"
                                                placeholder="e.g. Leftover Chicken Croquettes" v-model="name" />
                                        </b-form-group>
                                    </b-col>
                                    <b-col md="6" class="order-1 order-md-3">
                                        <b-form-group label="Description: ">
                                            <b-form-textarea id="description"
                                                placeholder="e.g. This easy recipe using leftover chicken is amazing."
                                                rows="5" max-rows="12" v-model="description"></b-form-textarea>
                                        </b-form-group>
                                    </b-col>
                                    <b-col md="6" class="order-2">
                                        <b-form-group label="Prep Time:">
                                            <b-form-input type="text" class="form-control" name="preptime"
                                                placeholder="e.g. 15 minutes" v-model="preptime" />
                                        </b-form-group>
                                    </b-col>
                                    <b-col md="6" class="order-4">
                                        <b-form-group label="Cooking Time:">
                                            <b-form-input type="text" class="form-control" name="cooktime"
                                                placeholder="e.g. 20 minutes" v-model="cooktime" />
                                        </b-form-group>
                                    </b-col>
                                    <b-col md="6" class="order-last">
                                        <div class="form-group">
                                            <label class="form-label">Choose a photo:</label>
                                            <input type="file" class="form-control" name="pic" accept="image/*" />
                                        </div>
                                    </b-col>
                                </b-row>
                            </div>

                            <b-button class="btn btn-primary next action-button float-end" @click="changeTab(2)"
                                value="Next">Next</b-button>
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
                                        <label>Enter one ingredient per line. Include the quantity (i.e. cups, tablespoons)
                                            and any special preparation (i.e. sifted, softened, chopped).</label>
                                    </b-form-group>
                                    <b-col md="12" v-for="(value, key) in ingredients" :key="key">
                                        <b-form-group>
                                            <b-form-input type="text" class="form-control"
                                                :placeholder="'e.g. ' + ingredientPlaceHolder[key % 5]"
                                                v-model="ingredients[key]" />
                                        </b-form-group>
                                    </b-col>

                                    <b-col md="6" class="order-last">
                                        <b-button class="btn btn-info" @click="addIngredient()">Add Row</b-button>
                                    </b-col>
                                </b-row>
                            </div>

                            <b-button class="btn btn-primary next action-button float-end" @click="changeTab(3)"
                                value="Next">Next</b-button>
                            <b-button @click="changeTab(1)"
                                class="btn btn-dark previous action-button-previous float-end me-1"
                                value="Previous">Previous</b-button>
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
                                        <label>Explain how to make your recipe, including oven temperatures, baking or
                                            cooking times, and pan sizes, etc.</label>
                                    </b-form-group>
                                    <b-col md="12" v-for="(value, key) in directions" :key="key">
                                        <b-form-group>
                                            <b-form-input type="text" class="form-control"
                                                :placeholder="'e.g. ' + directionPlaceHolders[key % directionPlaceHolders.length]"
                                                v-model="directions[key]" />
                                        </b-form-group>
                                    </b-col>

                                    <b-col md="6" class="order-last">
                                        <b-button class="btn btn-info" @click="addDirections()">Add Row</b-button>
                                    </b-col>
                                </b-row>
                            </div>

                            <b-button class="btn btn-primary next action-button float-end" @click="changeTab(4)"
                                value="Next">Next</b-button>
                            <b-button @click="changeTab(2)"
                                class="btn btn-dark previous action-button-previous float-end me-1"
                                value="Previous">Previous</b-button>

                        </div>

                        <!-- Step 4: Nutritional Facts -->
                        <div id="confirm" :class="`${currentindex == 4 ? 'show' : 'd-none'}`">
                            <b-button class="btn btn-success me-1 float-end" value="Previous">Submit</b-button>
                            <b-button @click="changeTab(3)"
                                class="btn btn-dark previous action-button-previous float-end me-1"
                                value="Previous">Previous</b-button>

                        </div>
                    </b-form>



                </b-card-body>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
// import axios from "axios";
// import { API_URL } from "../config";
import IconComponent from '@/components/icons/IconComponent.vue'

export default {
    name: "CreateRecipeView",
    data() {
        return {
            iconSize: 25,
            currentindex: 3,
            //Page 1
            name: "",
            description: "",
            preptime: "",
            cooktime: "",
            //Page 2
            ingredients: ["", "", ""],
            ingredientPlaceHolder: ["2 cups flour sifted",
                "1/2 tablespoons butter, softened",
                "1 cup sugar",
                "1/2 teaspoon salt",
                "4 cups milk"],
            //Page 3
            directions: ["", "", ""],
            directionPlaceHolders: [
                "Preheat oven to 175 degrees C).",
                "Grease and flour a 9x9 inch pan or line a muffin pan with paper liners.",
                "In a medium bowl, cream together the sugar and butter.",
                "Beat in the eggs, one at a time, then stir in the vanilla.",
                "Combine flour and baking powder, add to the creamed mixture and mix well.",],
            //Page 4
            nutritionDetails: ["", "", ""],

        };
    },
    components: {
        IconComponent
    },
    methods: {
        changeTab(val) {
            this.currentindex = val;
        },
        addIngredient() {
            this.ingredients.push("");
        },
        addDirections(){
            this.directions.push("");
            console.log(this.directions);
        }
    },
};

</script>