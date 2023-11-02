@@ -0,0 +1,62 @@
<template>
    <b-modal scrollable size="xl" v-model="modalShow" title="Import Recipe Details" ok-title="Import" @ok="onImport()">
        <RecipePopUp :recipeImage="currentRecipe.image" :recipeName="currentRecipe.label"
            :recipeIngredients="currentRecipe.ingredientLines" :recipeSourceURL="currentRecipe.url"
            :recipeShareURL="currentRecipe.shareAs" :recipeCuisineType="currentRecipe.cuisineType"
            :recipeDishType="currentRecipe.dishType" :recipeCalories="currentRecipe.calories"
            :recipeNutrition="currentRecipe.totalNutrients" :recipeServings="currentRecipe.yield"
            :recipeSource="currentRecipe.source">
        </RecipePopUp>
        <template #modal-footer="{test}">
            <!-- <button v-b-modal.modal-close_visit class="btn btn-danger btn-sm m-1">Close</button>
            <button v-b-modal.modal-close_visit class="btn btn-success btn-sm m-1">AA</button> -->
            <b-button size="sm" variant="outline-secondary" @click="test('forget')">AAA</b-button>

        </template>

    </b-modal>

    <div>
        <h1>Search Edaman Recipe</h1>

        <b-row class="my-4 px-5">
            <div class="input-group cols-4">
                <span class="input-group-text" id="search-input">
                    <icon-component type="outlined" :size="18" icon-name="search"></icon-component>
                </span>
                <input type="search" class="form-control" placeholder="Search..." v-model="searchInput" />
                <b-button variant="primary" @click="getEdamaneRecipes()">
                    <span class="ms-1">Search</span>
                </b-button>
            </div>
        </b-row>

        <b-row class="row-cols-1 row-cols-md-2 row-cols-lg-4 mb-3 text-center">
            <div v-for="(item, index) in recipeData" v-bind:key="index">
                <b-col>
                    <b-card class="mb-4 rounded-3" :header="item.recipe.label">
                        <img :src="item.recipe.images.THUMBNAIL.url" class="card-img-top">
                        <b-card-text class="text-capitalize my-2">By {{ item.recipe.source }}</b-card-text>
                        <div class="my-2">
                            <span class="badge bg-info mx-1 text-capitalize">{{ item.recipe.dishType[0] }}</span>
                            <span class="badge bg-warning mx-1 text-capitalize">{{ item.recipe.cuisineType[0] }}</span>
                        </div>
                        <!-- <h6 class="card-title mt-2">{{ item.recipe.label }}</h6> -->
                        <b-button class="btn btn-primary" @click="displayRecipeDetails(index)">View Details</b-button>
                    </b-card>
                </b-col>
            </div>
        </b-row>
    </div>
</template>

<script>
import axios from "axios";
import { API_URL } from "@/config";
import RecipePopUp from '@/components/RecipePopUp.vue'

export default {
    name: "AdminSearchView",
    data() {
        return {
            searchInput: "chicken",
            recipeData: [],
            currentRecipe: {},
            imgURL: "",
            modalShow: false,
            selectedIndex: -1,
        };
    },
    components: {
        RecipePopUp
    },
    methods: {
        async getEdamaneRecipes() {
            let response = await axios.get(API_URL + "edamane/search", { params: { query: this.searchInput } });
            this.recipeData = response.data.data;
        },
        displayRecipeDetails(index) {
            this.currentRecipe = this.recipeData[index].recipe;
            this.modalShow = false;
            this.modalShow = true;
        },
        onImport(){
            let data = {
                name : this.currentRecipe.label,
                image : this.currentRecipe.image,
                ingredientLines : this.currentRecipe.ingredientLines,
                url : this.currentRecipe.url,
                shareAs : this.currentRecipe.shareAs,
                cuisineType : this.currentRecipe.cuisineType,
                dishType : this.currentRecipe.dishType,
                calories : this.currentRecipe.calories,
                totalNutrients : this.currentRecipe.totalNutrients,
                yield : this.currentRecipe.yield,
                source : this.currentRecipe.source,
            };
            sessionStorage.setItem("importedRecipe", JSON.stringify(data));
            this.$router.push({ name: "recipe.create" });
        }
    },
};

</script>

<style>
.modal-backdrop {
    z-Index: -1;
}
</style>