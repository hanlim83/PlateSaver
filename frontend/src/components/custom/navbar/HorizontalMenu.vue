<script setup>
import { useFirebaseAuth, useDatabase } from 'vuefire'
import { ref as dbRef, onValue } from 'firebase/database'
import { ref } from 'vue'

const auth = useFirebaseAuth()
const db = useDatabase()
var userRole = ref('')

if (auth.currentUser != null) {
  onValue(dbRef(db, '/users/' + auth.currentUser.uid), (snapshot) => {
    userRole.value = snapshot.val().role
  })
} else {
  userRole.value = ''
}
</script>
<template>
  <!-- Horizontal Menu Start -->
  <nav id="navbar_main" class="mobile-offcanvas hover-nav horizontal-nav mx-md-auto navbar navbar-expand-xl navbar-light">
    <div class="container-fluid">
      <div class="offcanvas-header px-0">
        <div class="navbar-brand ms-0">
          <brand-logo :color="true"></brand-logo>
          <!-- <h4 class="logo-title"><brand-name></brand-name></h4> -->
        </div>
        <button class="btn-close float-end"></button>
      </div>
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'home' }">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'about' }">About</router-link>
        </li>
        <li v-if="userRole == 'admin'" class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"> Admin </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><router-link class="dropdown-item" :to="{ name: 'admin.allusers' }">View Users</router-link></li>
            <li><hr class="dropdown-divider" /></li>
            <li><router-link class="dropdown-item" :to="{ name: 'recipe.search' }">Import Recipes</router-link></li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"> Posts </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider" /></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"> Recipes </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider" /></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- container-fluid.// -->
  </nav>
  <!-- Sidebar Menu End -->
</template>
<style lang="scss" scoped></style>
