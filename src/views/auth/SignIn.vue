<script setup>
import { signInWithEmailAndPassword, signOut, sendEmailVerification, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useFirebaseAuth, useCurrentUser, useDatabase } from 'vuefire'
import { ref as dbRef, onValue, set } from 'firebase/database'
import { ref } from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import { toast } from 'vue3-toastify'

const auth = useFirebaseAuth()
const emailAddress = ref('')
const password = ref('')
const user = useCurrentUser()
const route = useRoute()
const googleAuthProvider = new GoogleAuthProvider()
const db = useDatabase()

if (user && route.query.redirect) {
  console.log(user.value)
  router.push(route.query.redirect)
} else if (user.value != null) {
  console.log(user.value)
  router.push({
    name: 'home',
    query: {
      state: 'login'
    }
  })
}

const handleLogin = () => {
  signInWithEmailAndPassword(auth, emailAddress.value, password.value)
    .then((userCredential) => {
      if (!userCredential.user.emailVerified) {
        sendEmailVerification(userCredential.user)
        signOut(auth)
        toast('You must verify your email first before you are able to login. Check your email inbox', {
          autoClose: 10000,
          type: 'info'
        })
      } else if (route.query.redirect != null) {
        router.push(route.query.redirect)
      } else {
        router.push({
          name: 'home',
          query: {
            state: 'login'
          }
        })
      }
    })
    .catch((error) => {
      let errorMessage = ''
      switch (error.code) {
        case 'auth/invalid-login-credentials':
          errorMessage = 'Invalid credentials'
          break
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address'
          break
        case 'auth/user-disabled':
          errorMessage = 'User account disabled'
          break
        case 'auth/user-not-found':
          errorMessage = 'User not found'
          break
        case 'auth/wrong-password':
          errorMessage = 'Invalid password'
          break
        default:
          errorMessage = 'An error occurred'
          break
      }
      console.log(error.code, error.message)
      toast(errorMessage, {
        autoClose: 5000,
        type: 'error'
      })
    })
}

const handleGoogleLogin = () => {
  signInWithPopup(auth, googleAuthProvider)
    .then((result) => {
      onValue(
        dbRef(db, '/users/' + result.user.uid),
        (snapshot) => {
          if (snapshot.val() == null) {
            set(dbRef(db, 'users/' + result.user.uid), {
              id: result.user.uid,
              firstName: result.user.displayName.split(' ')[0],
              lastName: result.user.displayName.split(' ')[1],
              emailAddress: result.user.email,
              phoneNumber: result.user.phoneNumber,
              role: 'user',
              photoPath: null,
              createdTimestamp: Date.now(),
              updatedTimestamp: Date.now()
            })
          }
        },
        {
          onlyOnce: true
        }
      )
      router.push({
        name: 'home',
        query: {
          state: 'login'
        }
      })
    })
    .catch((error) => {
      let errorMessage = ''
      switch (error.code) {
        case 'auth/cancelled-popup-request':
          errorMessage = 'Google Sign-in Cancelled'
          break
        default:
          errorMessage = 'An error occurred'
          break
      }
      console.log(error.code, error.message)
      toast(errorMessage, {
        autoClose: 5000,
        type: 'error'
      })
    })
}

toast.clearAll()
</script>
<template>
  <section class="login-content">
    <b-row class="m-0 align-items-center bg-white h-100">
      <b-col md="6">
        <b-row class="justify-content-center">
          <b-col md="10">
            <b-card class="card-transparent shadow-none d-flex justify-content-center mb-0 auth-card iq-auth-form">
              <router-link to="/" class="navbar-brand d-flex align-items-center mb-3 text-primary">
                <brand-logo></brand-logo>
                <h4 class="logo-title ms-3 mb-0"><brand-name></brand-name></h4>
              </router-link>
              <h2 class="mb-2 text-center">Sign In</h2>
              <p class="text-center">Login to stay connected.</p>
              <form @submit.prevent="handleLogin">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label for="email" class="form-label">Email</label>
                      <input v-model="emailAddress" type="email" class="form-control" id="email" aria-describedby="email" placeholder=" " required />
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label for="password" class="form-label">Password</label>
                      <input v-model="password" type="password" class="form-control" id="password" aria-describedby="password" placeholder=" " required />
                    </div>
                  </div>
                  <div class="col-lg-12 d-flex justify-content-between">
                    <a href="/auth/reset-password">Forgot Password?</a>
                  </div>
                </div>
                <div class="d-flex justify-content-center">
                  <button type="submit" class="btn btn-primary">Sign In</button>
                </div>
                <p class="text-center my-3">or sign in with another account?</p>
                <div class="d-flex justify-content-center">
                  <ul class="list-group list-group-horizontal list-group-flush">
                    <li class="list-group-item border-0 pb-0" @click="handleGoogleLogin">
                      <a><img src="@/assets/images/brands/gm.svg" alt="gm" loading="lazy" /></a>
                    </li>
                  </ul>
                </div>
                <p class="mt-3 text-center">Don’t have an account? <a href="/auth/register" class="text-underline">Click here to sign up.</a></p>
              </form>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
      <div class="col-md-6 d-md-block d-none bg-primary p-0 vh-100 overflow-hidden">
        <img src="@/assets/login2.jpeg" class="img-fluid gradient-main animated-scaleX" alt="images" loading="lazy" />
      </div>
    </b-row>
  </section>
</template>
<style lang="scss" scoped></style>
