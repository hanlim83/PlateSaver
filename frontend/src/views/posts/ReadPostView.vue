<template>
    <div class="row">
        <div class="col-xl-8 col-md-10 mx-auto">
            <div class="card mt-4">
                <div class="card-body p-6">
                    <p class="text-primary pt-3">{{ recipe.date_created }}</p>
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
                <h3 class="my-3 ">Comments({{ commentsNo }})</h3>
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
                            <b-form-input type="text" class="form-control " name="comement-name"
                                placeholder="e.g. Mokkie Mok" v-model="comment.name" />
                        </b-form-group>
                    </b-col>
                    <b-col md="6" class="">
                        <b-form-group label="Email: ">
                            <b-form-input type="text" class="form-control" name="comment-email"
                                placeholder="e.g. hungryman@email.com" v-model="comment.email" />
                        </b-form-group>
                    </b-col>
                    <b-col md="12">
                        <b-form-group label="Comment: ">
                            <b-form-textarea id="comment-text" placeholder="e.g. This was delicious!" rows="2" max-rows="12"
                                v-model="comment.text"></b-form-textarea>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-button class="btn-primary" @click="createComment()">Submit</b-button>
            </b-card>
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
            id: this.$route.params.id,
            commentsNo: 0,
            recipe: "",
            comment: {
                name: "",
                email: "",
                text: ""
            },
        };
    },
    async created() {
        await this.getRecipe();
    },
    components: {
    },
    methods: {
        async getRecipe() {
            let url = API_URL + "recipe/" + this.id;
            let response = await axios.get(url);
            this.recipe = response.data.data;
            if (typeof this.recipe.comments != "undefined") {
                this.commentsNo = Object.keys(this.recipe.comments).length;
            }
        },
        async createComment() {
            //get current date
            let current = new Date();
            let dateNow = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

            let data = {
                comment: {
                    name: this.comment.name,
                    email: this.comment.email,
                    text: this.comment.text,
                    date: dateNow,
                },
                recipeId: this.id
            };

            let response = await axios.post(API_URL + "recipe/comment", data);
            console.log("response: ", response);

            //Update new comments
            await this.getRecipe();

        }
    }
};


</script>