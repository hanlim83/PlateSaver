<script setup>
import { useRoute } from 'vue-router'
import { toast } from 'vue3-toastify'
import { useDatabaseList, useDatabase } from 'vuefire'
import { ref as dbRef } from 'firebase/database'

const route = useRoute()
const db = useDatabase()
const allusers = useDatabaseList(dbRef(db, 'users'))

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
<template>
  <div class="home">
    <!-- <h1>Welcome to Your Vue.js App</h1> -->

    <div class="outerlayer">
      <img src="@/assets/frontpage.jpeg" style="width: 100%" />
      <div class="h1 word text-responsive">Number Of Unsung Heroes To Date</div>
      <div class="box" style="left: 15%" v-if="allusers.length > 1000">{{ parseInt(allusers.length.toString()[0]) % 10 }}</div>
      <div class="box" style="left: 15%" v-else>0</div>
      <div class="box" style="left: 30%" v-if="allusers.length > 1000">{{ parseInt(allusers.length.toString()[0]) % 10 }}</div>
      <div class="box" style="left: 30%" v-else>0</div>
      <div class="box" style="left: 45%" v-if="allusers.length > 100">{{ parseInt(allusers.length.toString()[0]) % 10 }}</div>
      <div class="box" style="left: 45%" v-else>0</div>
      <div class="box" style="left: 60%" v-if="allusers.length > 10">{{ parseInt(allusers.length.toString()[0]) % 10 }}</div>
      <div class="box" style="left: 60%" v-else>0</div>
      <div class="box" style="left: 75%">{{ allusers.length % 10 }}</div>
    </div>
  </div>
</template>
