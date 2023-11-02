<template>
  <div class="home">
    <h1>Welcome to Your Vue.js App</h1>
   
    <div class = "outerlayer">
      <img src="@/assets/frontpage.jpeg" style="width: 100%" />
      <div class = "h1 word text-responsive">Number Of Unsung Heroes To Date</div>
      <div class = "box" style = "left : 10%;">0</div>
      <div class = "box" style = "left : 20%;">0</div>
      <div class = "box" style = "left : 30%;">0</div>
      <div class = "box" style = "left : 40%;">0</div>
      <div class = "box" style = "left : 50%;">0</div>
      <div class = "box" style = "left : 60%;">0</div>
      <div class = "box" style = "left : 70%;">0</div>
      <div class = "box" style = "left : 80%;">0</div>
    
    </div>
  </div>

</template>
<script setup>
import { useRoute } from 'vue-router'
import { toast } from 'vue3-toastify'
const route = useRoute()

if (route.query.state != null && route.query.state === 'logout') {
  toast('Logged Out Successfully', {
    autoClose: 5000,
    type: 'success'
  })
} else if (route.query.state != null && route.query.state === 'login') {
  toast('Logged In Successfully', {
    autoClose: 5000,
    type: 'success'
  })
} else if (route.query.state != null && route.query.state === 'verified') {
  toast('Email Verified Successfully', {
    autoClose: 5000,
    type: 'success'
  })
}
</script>
