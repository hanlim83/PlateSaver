<template>
    <b-row>
        <div class="inner-box">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4" v-for="(value, key) in recipes" :key="key">
                        <RecipeOne :id="key" :recipeImage="require('@/assets/images/avatars/01.png')"
                            :recipeDate="value.date_created" :recipeTitle="value.name" recipeAuthor="Jiawei"
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