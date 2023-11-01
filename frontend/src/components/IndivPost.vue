<style>
p {
    display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
</style>

<template>
<!--    <div class="card">
        <div class="card-body p-3">
            <img :src="`${foodImage}`" :alt="id" class="img-fluid rounded" loading="lazy" />
            <div class="my-2">
                <span class="text-primary pt-3 ml-1">{{ timeStamp }}</span>
            </div>
            <router-link :to="{ path: '/recipe/view/' + id }" class="my-3 h5">{{ title }}</router-link>
            <div class="row my-2 justify-content-center">
                <span class="col-12 me-3">{{ userID }}</span>
                <span class="col-4 badge bg-info mx-1 my-1 text-capitalize" v-for="(hashtag, key) in tags" :key="key">{{ hashtag }}</span>

            </div>
            <p class="pt-2">{{ content }}</p>-->
            <!--<router-link :to="{ path: '/posts/view/' + id }" class="btn btn-primary">Read More</router-link>-->
    <!--</div>
    </div>-->
    <b-card :img-src="`${foodImage}`" class="img-fluid rounded" loading="lazy">
        <b-card-text class="p-3">
            <div class="my-2">
                <span class="text-primary pt-3 ml-1">{{ timeStamp }}</span>
            </div>
            <router-link :to="{ path: '/posts/readPost/' + id }" class="my-3 h5">{{ title }}</router-link>
            <div class="me-3">{{ "by" + userID }}</div>
            <div class="row my-2 justify-content-center">
                
                <span class="col-3 col-md-1 badge bg-info mx-1 my-1 text-capitalize d-inline-block text-truncate" v-for="(hashtag, key) in tags" :key="key">{{ hashtag }}</span>
                
            </div>
            <p class="pt-2">{{ content }}</p>
            
        </b-card-text>
        <div class="d-grid  d-flex justify-content-end">
            <router-link :to="{ path: '/posts/readPost/' + id }" class="btn btn-primary btn-sm">Read More</router-link>
        </div>
        
    </b-card>
</template>
  
<script>
export default {
    props: {
        id: { type: String, default: '' },
        foodImage: { type: String, default: '' },
        timeStamp: { type: String, default: '' },
        userID: { type: String, default: '' },
        title: { type: String, default: '' },
        content: { type: String, default: '' },
        tags: { type: Array, default: () =>[]}
    }
}
</script>
  