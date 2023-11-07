<template>
  <section class="login-content">
    <div class="row m-0 align-items-center bg-white vh-100">
      <div class="col-md-6 d-md-block d-none bg-primary p-0 vh-100 overflow-hidden">
        <img src="@/assets/login1.jpeg" class="img-fluid gradient-main animated-scaleX" alt="images" loading="lazy" />
      </div>
      <div class="col-md-6 p-0">
        <div class="card card-transparent auth-card shadow-none d-flex justify-content-center mb-0">
          <div class="card-body">
            <router-link to="/" class="navbar-brand d-flex align-items-center mb-3 text-primary">
              <brand-logo></brand-logo>
              <h4 class="logo-title ms-3 mb-0"><brand-name></brand-name></h4>
            </router-link>
            <h2 class="mb-2">Reset Password</h2>
            <p>Enter your email address and we'll send you an email with instructions to reset your password.</p>
            <form @submit.prevent="handleReset">
              <div class="row">
                <div class="col-lg-12">
                  <div class="floating-label form-group">
                    <label for="email" class="form-label">Email</label>
                    <input v-model="emailAddress" type="email" class="form-control" id="email" aria-describedby="email" placeholder=" " />
                  </div>
                </div>
              </div>
              <button type="submit" class="btn btn-primary">Reset Password</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { sendPasswordResetEmail } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'

const auth = useFirebaseAuth()
const emailAddress = ref('')

const handleReset = () => {
  sendPasswordResetEmail(auth, emailAddress.value)
    .then(() => {
      toast('Password Reset Email Sent!', {
        autoClose: 5000,
        type: 'success'
      })
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
        case 'auth/user-not-found':
          errorMessage = 'User not found'
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
