<template>
  <section class="login-content">
    <b-row class="m-0 align-items-center bg-white vh-100">
      <b-col md="6 p-0">
        <b-card class="card-transparent auth-card shadow-none d-flex justify-content-center mb-0">
          <router-link to="/" class="navbar-brand d-flex align-items-center mb-3 text-primary">
            <brand-logo></brand-logo>
            <h4 class="logo-title ms-3 mb-0"><brand-name></brand-name></h4>
          </router-link>
          <h2 class="mt-3 mb-0">Error</h2>
          <p class="cnf-mail mb-1">Your link is invaild, please click on the link sent to your email directly</p>
          <div class="d-inline-block w-100">
            <router-link to="/" class="btn btn-primary mt-3">Back to Home</router-link>
          </div>
        </b-card>
      </b-col>
      <b-col md="6 d-md-block d-none bg-primary p-0 vh-100 overflow-hidden">
        <img src="@/assets/login2.jpeg" class="img-fluid gradient-main animated-scaleX" alt="images" loading="lazy" />
      </b-col>
    </b-row>
  </section>
</template>

<style lang="scss" scoped></style>
<script setup>
import { useFirebaseAuth } from 'vuefire'
import { checkActionCode, verifyPasswordResetCode, applyActionCode } from 'firebase/auth'
import router from '@/router'
import { useRoute } from 'vue-router'

const auth = useFirebaseAuth()
const route = useRoute()
const actionCode = route.query.oobCode
const mode = route.query.mode
console.log(actionCode)
console.log(mode)
if (mode === 'verifyEmail' && actionCode != undefined) {
  checkActionCode(auth, actionCode)
    .then((info) => {
      console.log(info)
      applyActionCode(auth, actionCode).then((info) => {
        console.log(info)
        router.push({
          name: 'home',
          query: {
            state: 'verified'
          }
        })
      })
    })
    .catch((error) => {
      console.log(error)
    })
} else if (mode === 'resetPassword' && actionCode != undefined) {
  verifyPasswordResetCode(auth, actionCode)
    .then((info) => {
      console.log(info)
      router.push({
        name: 'auth.set-password',
        query: {
          oobCode: actionCode
        }
      })
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>
