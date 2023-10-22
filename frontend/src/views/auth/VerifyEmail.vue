<template>
  <section class="login-content">
    <b-row class="m-0 align-items-center bg-white vh-100">
      <b-col md="6 p-0">
        <b-card class="card-transparent auth-card shadow-none d-flex justify-content-center mb-0">
          <router-link to="/" class="navbar-brand d-flex align-items-center mb-3 text-primary">
            <brand-logo></brand-logo>
            <h4 class="logo-title ms-3 mb-0"><brand-name></brand-name></h4>
          </router-link>
          <h2 class="mt-3 mb-0">Success !</h2>
          <p class="cnf-mail mb-1">A email has been sent to {{ user.email }} Please check for an email to verify your account.</p>
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

<script setup>
import { sendEmailVerification } from 'firebase/auth'
import { useCurrentUser, useFirebaseAuth } from 'vuefire'
import router from '@/router'
const user = useCurrentUser()
const auth = useFirebaseAuth()

if (user.emailVerified) {
  router.push('/')
} else {
  sendEmailVerification(auth.currentUser)
}
</script>

<style lang="scss" scoped></style>
