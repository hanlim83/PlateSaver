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
              <h2 class="mb-2 text-center">Set New Password</h2>
              <p class="text-center">Let's get back into your <brand-name></brand-name> account</p>
              <form @submit.prevent="handlePassword">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="col-lg-12">
                      <div class="form-group">
                        <label for="newPassword" class="form-label">New Password</label>
                        <input v-model="newPassword" type="password" class="form-control" id="newPassword" aria-describedby="newPassword" placeholder=" " required />
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="form-group">
                        <label for="cfmPassword" class="form-label">Confirm New Password</label>
                        <input v-model="cfmPassword" type="password" class="form-control" id="cfmPassword" aria-describedby="cfmPassword" placeholder=" " required />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-center">
                  <button type="submit" class="btn btn-primary">Set New Password</button>
                </div>
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

<script setup>
import { confirmPasswordReset } from 'firebase/auth'
import { useFirebaseAuth, useCurrentUser } from 'vuefire'
import { ref } from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import { toast } from 'vue3-toastify'

const auth = useFirebaseAuth()
const newPassword = ref('')
const cfmPassword = ref('')
const user = useCurrentUser()
const route = useRoute()

if (route.query.oobCode == undefined) {
  router.push('/auth/token')
} else if (!user) {
  router.push({ name: 'home' })
}

const handlePassword = () => {
  if (newPassword.value !== cfmPassword.value) {
    toast('Passwords do not match', {
      autoClose: 4000,
      type: 'error'
    })
    return
  }
  confirmPasswordReset(auth, route.query.oobCode, newPassword.value)
    .then(() => {
      toast('Password reset successfully', {
        autoClose: 5000,
        type: 'success'
      })
      setTimeout(() => {
        router.push('/auth/login')
      }, 5000)
    })
    .catch((error) => {
      let errorMessage = ''
      switch (error.code) {
        case 'auth/expired-action-code':
          errorMessage = 'Email code has expired'
          break
        case 'auth/invalid-action-code':
          errorMessage = 'Email code is invalid'
          break
        case 'auth/user-disabled':
          errorMessage = 'Your account has been disabled'
          break
        case 'auth/user-not-found':
          errorMessage = 'Your Account cannot be not found'
          break
        case 'auth/weak-password':
          errorMessage = 'Please choose a stronger password'
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

<style lang="scss" scoped></style>
