<template>
    <div class="card">
        <div class="card-body p-6 card-thumbnail">
            <div class="d-flex align-items-center">
                <!-- <img :src="recipeImage" class="img-fluid flex-column rounded me-5" loading="lazy" /> -->
                <img :src="recipeImage" class="img-fluid object-contain rounded me-0 mb-3 mb-md-0 me-md-3" loading="lazy" />
                <div class="d-flex flex-column justify-content-center">
                    <h3 class="">{{ recipeName }}</h3>
                    <span class="text-muted py-3 ml-1">By: {{ recipeSource }}</span>
                    <div class="d-flex align-items-center my-2">
                        <span class="badge bg-info mx-1 text-capitalize" v-for="(item, key) in recipeDishType" :key="key">{{
                            item }}</span>
                    </div>
                    <div class="d-flex align-items-center my-2">
                        <span class="badge bg-warning mx-1 text-capitalize" v-for="(item, key) in recipeCuisineType"
                            :key="key">{{ item }}</span>
                    </div>
                    <span class="text pt-3 ml-1">View on: <a
                            class="bg-soft-primary ps-3 pe-3 pt-2 pb-2 rounded d-inline-block" :href="recipeShareURL"
                            target="_blank">
                            Edaman</a></span>
                    <span class=" text pt-3 ml-1">View on: <a
                            class="bg-soft-primary ps-3 pe-3 pt-2 pb-2 rounded d-inline-block" :href="recipeSourceURL"
                            target="_blank">{{
                                recipeSource }}</a></span>

                </div>
            </div>
            <!-- Ingredients Section -->
            <h2 class="mt-3 mb-2">Ingredients</h2>
            <div class="">
                <b-form-checkbox v-for="(value, key) in recipeIngredients" :key="key">
                    {{ value }}
                </b-form-checkbox>
            </div>

            <!-- Nutritional Details Section -->
            <b-card class="card bg-soft-info mt-4" title="Nutritional Facts" v-if="recipeNutrition">
                <div class="card-body p-3 pb-1 text-black-50">
                    <div class="row">
                        <b-row class="row-cols-1 row-cols-md-2 row-cols-lg-3 mb-3 text-center">
                            <b-col>
                                <b-card class="mb-4 rounded-3 bg-soft-info text-black-50">
                                    <label class="fw-bolder fs-2">{{ recipeCalories.toFixed() }} kcal</label>
                                    <b-card-text class="text-capitalize">Calories</b-card-text>
                                </b-card>
                            </b-col>
                            <b-col>
                                <b-card class="mb-4 rounded-3 bg-soft-info text-black-50">
                                    <label class="fw-bolder fs-2">{{ recipeNutrition.CHOCDF.quantity.toFixed() }} {{
                                        recipeNutrition.CHOCDF.unit }}</label>
                                    <b-card-text class="text-capitalize">Carbohydrates</b-card-text>
                                </b-card>
                            </b-col>
                            <b-col>
                                <b-card class="mb-4 rounded-3 bg-soft-info text-black-50">
                                    <label class="fw-bolder fs-2">{{ recipeNutrition.CHOLE.quantity.toFixed() }} {{
                                        recipeNutrition.CHOLE.unit }}</label>
                                    <b-card-text class="text-capitalize">Cholestrol</b-card-text>
                                </b-card>
                            </b-col>
                            <b-col>
                                <b-card class="mb-4 rounded-3 bg-soft-info text-black-50">
                                    <label class="fw-bolder fs-2">{{ recipeNutrition.FAT.quantity.toFixed() }} {{
                                        recipeNutrition.FAT.unit }}</label>
                                    <b-card-text class="text-capitalize">Fat</b-card-text>
                                </b-card>
                            </b-col>
                            <b-col>
                                <b-card class="mb-4 rounded-3 bg-soft-info text-black-50">
                                    <label class="fw-bolder fs-2">{{ recipeNutrition.PROCNT.quantity.toFixed() }} {{
                                        recipeNutrition.PROCNT.unit }}</label>
                                    <b-card-text class="text-capitalize">Protein</b-card-text>
                                </b-card>
                            </b-col>
                            <b-col>
                                <b-card class="mb-4 rounded-3 bg-soft-info text-black-50">
                                    <label class="fw-bolder fs-2">{{ recipeNutrition.NA.quantity.toFixed() }} {{
                                        recipeNutrition.NA.unit }}</label>
                                    <b-card-text class="text-capitalize">Sodium</b-card-text>
                                </b-card>
                            </b-col>
                        </b-row>

                    </div>
                </div>
            </b-card>
            <p class="pt-2"></p>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        recipeName: { type: String, default: '' },
        recipeImage: { type: String, default: '' },
        recipeIngredients: { type: Array, default: () => [] },
        recipeSourceURL: { type: String, default: '' },
        recipeShareURL: { type: String, default: '' },
        recipeCuisineType: { type: Array, default: () => [] },
        recipeDishType: { type: Array, default: () => [] },
        recipeCalories: { type: Number, default: 0 },
        recipeNutrition: { type: Object, default: () => { } },
        recipeServings: { type: Number, default: 0 },
        recipeSource: { type: String, default: '' },
        // recipe: { type: Object, default: () => { } },
    },
    methods: {

    }
}
</script>
  