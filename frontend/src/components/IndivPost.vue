<template>
    <div class="card">
        <div class="card-body p-3">
            <img :src="`${foodImage}`" :alt="id" class="img-fluid rounded" loading="lazy" />
            <div class="my-2">
                <span class="text-primary pt-3 ml-1">{{ timeStamp }}</span>
            </div>
            <router-link :to="{ path: '/recipe/view/' + id }" class="my-3 h5">{{ title }}</router-link>
            <div class="d-flex align-items-center my-2">
                <span class="me-3">{{ userID }}</span>
                <span class="badge bg-info mx-1 text-capitalize">Delicious</span>
                <span class="badge bg-warning mx-1 text-capitalize">Popular</span>

            </div>
            <p class="pt-2">{{ content }}</p>
            <router-link :to="{ path: '/recipe/view/' + id }" class="btn btn-primary">Read More</router-link>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        id: { type: String, default: '' },
        foodImage: { type: String, default: '' },
        timeStamp: { type: String, default: '' },
        userID: { type: String, default: '' },
        title: { type: String, default: '' },
        content: { type: String, default: '' }
    }
}
</script>
  