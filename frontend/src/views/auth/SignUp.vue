<template>
  <section class="login-content">
    <div class="row m-0 align-items-center bg-white vh-100">
      <div class="col-md-6 d-md-block d-none bg-primary p-0 vh-100 overflow-hidden">
        <img src="@/assets/login1.jpeg" class="img-fluid gradient-main animated-scaleX" alt="images" loading="lazy" />
      </div>
      <div class="col-md-6">
        <div class="row justify-content-center">
          <div class="col-md-10">
            <div class="card card-transparent auth-card shadow-none d-flex justify-content-center mb-0">
              <div class="card-body">
                <router-link to="/" class="navbar-brand d-flex align-items-center mb-3 text-primary">
                  <brand-logo></brand-logo>
                </router-link>
                <h2 class="mb-2 text-center">Sign Up</h2>
                <p class="text-center">Create your <brand-name></brand-name> account.</p>
                <form @submit.prevent="handleSignUp">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label for="first-name" class="form-label">First Name</label>
                        <input v-model="fName" type="text" class="form-control" id="first-name" placeholder=" " />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label for="last-name" class="form-label">Last Name</label>
                        <input v-model="lName" type="text" class="form-control" id="last-name" placeholder=" " />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label for="email" class="form-label">Email</label>
                        <input v-model="emailAddress" type="email" class="form-control" id="email" placeholder=" " />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label for="password" class="form-label">Password</label>
                        <input v-model="password" type="password" class="form-control" id="password" placeholder=" " />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label for="confirm-password" class="form-label">Confirm Password</label>
                        <input v-model="cfmPassword" type="password" class="form-control" id="confirm-password" placeholder=" " />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label for="age" class="form-label">Age</label>
                        <input v-model="age" type="number" class="form-control" id="age" placeholder=" " />
                      </div>
                    </div>
                    <div class="col-lg-12 d-flex justify-content-center">
                      <div class="form-check mb-3">
                        <input type="checkbox" class="form-check-input" id="customCheck1" />
                        <label class="form-check-label" for="customCheck1">I agree with the terms of use</label>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-center">
                    <button type="submit" class="btn btn-primary">Sign Up</button>
                  </div>
                  <p class="mt-3 text-center">Already have an Account <a href="/auth/login" class="text-underline">Sign In</a></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { ref as dbRef, set } from 'firebase/database'
import { useFirebaseAuth, useDatabase } from 'vuefire'
import { ref } from 'vue'
import router from '@/router'

const auth = useFirebaseAuth()
const fName = ref('')
const lName = ref('')
const emailAddress = ref('')
const password = ref('')
const cfmPassword = ref('')
const age = ref('')
const db = useDatabase()

const handleSignUp = () => {
  createUserWithEmailAndPassword(auth, emailAddress.value, password.value).then((userCredential) => {
    let newUser = userCredential.user
    updateProfile(newUser, { displayName: fName.value + ' ' + lName.value })
    set(dbRef(db, 'users/' + newUser.uid), {
      firstName: fName.value,
      lastName: lName.value,
      emailAddress: emailAddress.value,
      age: age.value
    })
    router.push('/auth/verify')
  })
}
</script>

<style lang="scss" scoped></style>
