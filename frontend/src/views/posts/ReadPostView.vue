<style>
body{
    background-color: #9DA2B5;
}
</style>

<template>
<!-- <div class="p-5 mb-4 bg-light rounded-3 d-block h-100">
      <div class="container-fluid py-5">
        <h1 class="display-3 fw-bold" >{{ post.title }}</h1>
        <div class="row">
            <p class="col-md-8 fs-4">{{ post.content }}</p>
            <img :src="post.foodImage" class="col-md-6 float-md-end mb-3 ms-md-4 img-fluid rounded"/>
        </div>
        
        <p>Contact me at: {{ post.contact }}</p>
        <button class="btn btn-primary btn-lg mt-auto mb-3 " type="button">View Their Profile</button>
      </div>
    </div>-->
<div class="container-fluid py-5">
    <div class="card mb-3" style="max-width: 100%;">
        <div class="row g-0">
            <div class="col-md-12 col-lg-4">
                <img :src="post.foodImage" class="img-fluid rounded-start">
            </div>
            <div class="col-lg-8">
                <div class="card-body">
                    <h5 class="card-title">{{post.title}}</h5>
                    <p class="card-text">{{post.content}} </p>
                    <p class="card-text"><small class="text-body-secondary">{{"Last updated "+post.timeStamp}}</small></p>
                    

                    <div class="row mx-3 justify-content-end">
                        
                            <button class="btn btn-primary col-md-4 col-2"> View Profile </button><!--<a> link here-->
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>   
</template>

<script>
import axios from "axios";
import { API_URL } from "@/config";

export default {
    name: "ReadPostView",
    data() {
        return {
            id: this.$route.params.id,
            post: "",
        };
    },
    async created() {
        await this.getPost();
    },
    components: {
    },
    methods: {
        async getPost() {
            let url = API_URL + "posts/" + this.id;
            let response = await axios.get(url);
            this.post = response.data.data;
        }
    }
};


</script>