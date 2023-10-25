@@ -0,0 +1,62 @@
<template>
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
                            <span class="badge bg-info mx-1 text-capitalize">{{ item.recipe.dishType[0]}}</span>
                            <span class="badge bg-warning mx-1 text-capitalize">{{ item.recipe.cuisineType[0] }}</span>
                        </div>
                        <!-- <h6 class="card-title mt-2">{{ item.recipe.label }}</h6> -->
                        <b-button class="btn btn-primary">View Details</b-button>
                    </b-card>
                </b-col>
            </div>

        </b-row>
    </div>
</template>

<script>
import axios from "axios";
import { API_URL } from "@/config";

export default {
    name: "AdminSearchView",
    data() {
        return {
            searchInput: "chicken",
            recipeData: [],
            imgURL: ""
        };
    },
    components: {},
    methods: {
        async getEdamaneRecipes() {
            console.log("Button Clicked");
            let response = await axios.get(API_URL + "edamane/search", { params: { query: this.searchInput } });
            this.recipeData = response.data.data;
            console.log(this.recipeData);
        },
    },
};

</script>