<template>
  <div class="home">
    <h1>Welcome to PlateSaver</h1>
    <div class="outerlayer">
      <img src="@/assets/frontpage.jpeg" style="width: 100%" />
      <div class="h1 word text-responsive">Number Of Unsung Heroes To Date</div>
      <div class="box" style="left: 10%">{{ tenMillionsPlace }}</div>
      <div class="box" style="left: 20%">{{ millionsPlace }}</div>
      <div class="box" style="left: 30%">{{ hundredThousandsPlace }}</div>
      <div class="box" style="left: 40%">{{ tenThousandsPlace }}</div>
      <div class="box" style="left: 50%">{{ thousandsPlace }}</div>
      <div class="box" style="left: 60%">{{ hundredsPlace }}</div>
      <div class="box" style="left: 70%">{{ tensPlace }}</div>
      <div class="box" style="left: 80%">{{ onesPlace }}</div>
    </div>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import { toast } from 'vue3-toastify'
import { ref } from 'vue'
import { ref as dbRef, onValue } from 'firebase/database'
import { useDatabase } from 'vuefire'
const route = useRoute()
const onesPlace = ref(0)
const tensPlace = ref(0)
const hundredsPlace = ref(0)
const thousandsPlace = ref(0)
const tenThousandsPlace = ref(0)
const hundredThousandsPlace = ref(0)
const millionsPlace = ref(0)
const tenMillionsPlace = ref(0)
const db = useDatabase()
const itemCount = ref(0)

setInterval(() => {
  onesPlace.value = Math.floor(Math.random() * 10)
  tensPlace.value = Math.floor(Math.random() * 10)
  hundredsPlace.value = Math.floor(Math.random() * 10)
  thousandsPlace.value = Math.floor(Math.random() * 10)
  tenThousandsPlace.value = Math.floor(Math.random() * 10)
  hundredThousandsPlace.value = Math.floor(Math.random() * 10)
  millionsPlace.value = Math.floor(Math.random() * 10)
  tenMillionsPlace.value = Math.floor(Math.random() * 10)
}, 1000)

onValue(dbRef(db, '/users/'), (snapshot) => {
  console.log(snapshot.val())
  itemCount.value = Object.keys(snapshot.val()).length
})

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
