<template>
  <div class="card">
    <div class="card-body p-3" style="height:600px">
      <div style="height:300px">
        <img :src="`${recipeImage}`" :alt="id" class="img-fluid rounded h-100" loading="lazy" />
      </div>
      <div class="my-2">
        <span class="text-primary pt-3 ml-1">{{ recipeDate }}</span>
      </div>
      <router-link :to="{ path: '/recipe/view/' + id }" class="my-3 h5">{{ recipeTitle }}</router-link>
      <div class="d-flex align-items-center my-2">
        <span class="me-3">{{ recipeAuthor }}</span>
        <!-- <span class="badge bg-info mx-1 text-capitalize">Delicious</span> -->
        <span class="badge bg-warning mx-1 text-capitalize" v-if="commentsNo > 2">Popular</span>
        <span class="badge bg-info mx-1 text-capitalize" v-if="parseInt(calories.slice(0,-4)) < 300">Healthy</span>
      </div>
      <p class="pt-2">{{ recipeDescription }}</p>
      <router-link :to="{ path: '/recipe/view/' + id }" class="btn btn-primary">Read More</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: String, default: '' },
    recipeImage: { type: String, default: '' },
    recipeDate: { type: String, default: '' },
    recipeAuthor: { type: String, default: '' },
    recipeTitle: { type: String, default: '' },
    recipeDescription: { type: String, default: '' },
    calories: { type: String, default: '' },
    commentsNo: { type: Number, default: 0 }
  }
}
</script>

<style scoped>
p {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>