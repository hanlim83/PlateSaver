<template>
    <div class="row">
        <div class="col-xl-8 col-md-10 mx-auto">
            <div class="card mt-4">
                <div class="card-body p-6">
                    <p class="text-primary pt-3">20th September 2022</p>
                    <h1 class="mt-2 ">{{ recipe.name }}</h1>
                    <div class="d-flex align-items-center my-3">
                        <span class="badge bg-info py-1 mx-1 text-capitalize fs-5">Delicious</span>
                        <span class="badge bg-warning py-1 mx-1 text-capitalize fs-5">Popular</span>
                    </div>
                    <h6 class="">By: Jiawei </h6>
                    <p class="mt-3">{{ recipe.description }}</p>
                    <!-- <img src="@/assets/images/avatars/01.png" :alt="id" class="img-fluid rounded" loading="lazy" /> -->

                    <!-- Details Section -->
                    <div class="card bg-soft-info mt-4 ">
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

                    //Todo card for nutritional info
                    <!-- Nutritional Details Section -->
                    <b-card class="card bg-soft-info mt-4" title="Nutritional Facts">
                        <div class="card-body p-6 pb-1 text-black-50">
                            <div class="row">
                                <div class="col-3" v-for="(value, key) in recipe.nutritionDetails" :key="key">
                                    <label class="fw-bold">{{ key }}</label>
                                    <b-card-text class="">{{ value }}</b-card-text>
                                </div>
        
                            </div>
                        </div>
                    </b-card>
                </div>
            </div>

            <div class="card mt-4">
                <div class="card-body p-6">
                    //Todo add comment section
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { API_URL } from "@/config";

export default {
    name: "ViewRecipeDetailsView",
    data() {
        return {
            recipe: ""
        };
    },
    async created() {
        let id = this.$route.params.id;
        let url = API_URL + "recipe/" + id;
        let response = await axios.get(url);
        this.recipe = response.data.data;
        console.log("recipe: ", this.recipe);
    },
    components: {
    },
    methods: {


    }
};


</script>
