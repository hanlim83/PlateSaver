<script setup>
import { useCurrentUser, useFirebaseAuth, useDatabase, useFirebaseStorage } from 'vuefire'
import { signOut } from 'firebase/auth'
import { ref as dbRef, onValue } from 'firebase/database'
import { ref as storageRef, getDownloadURL } from 'firebase/storage'
import router from '@/router'
import { useRoute } from 'vue-router'
const auth = useFirebaseAuth()
const user = useCurrentUser()
const route = useRoute()
const storage = useFirebaseStorage()
const db = useDatabase()
var userProfilePicPath = 'user-profile-pictures/generic.jpg'
var userProfilePicUrl = ref('https://firebasestorage.googleapis.com/v0/b/is216-project-99edb.appspot.com/o/user-profile-pictures%2Fgeneric.jpg?alt=media')
const handleLogOut = () => {
  signOut(auth)
    .then(() => {
      console.log('logged out')
      router.push({ name: 'home', query: { state: 'logout' } })
    })
    .catch((error) => {
      console.log(error)
    })
}
const handleLogIn = () => {
  console.log(route.path)
  router.push({ name: 'auth.login' })
}

if (auth.currentUser != null) {
  console.log(user)
  onValue(dbRef(db, '/users/' + auth.currentUser.uid), (snapshot) => {
    console.log(snapshot.val())
    if (snapshot.val().photoPath == null) {
      userProfilePicUrl.value = auth.currentUser.photoURL
    } else {
      userProfilePicPath = snapshot.val().photoPath
      console.log(userProfilePicPath)
      getDownloadURL(storageRef(storage, userProfilePicPath))
        .then((url) => {
          console.log(url)
          userProfilePicUrl.value = url
          console.log(userProfilePicUrl)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  })
} else {
  console.log(userProfilePicPath)
  getDownloadURL(storageRef(storage, userProfilePicPath))
    .then((url) => {
      console.log(url)
      userProfilePicUrl.value = url
      console.log(userProfilePicUrl)
    })
    .catch((error) => {
      console.log(error)
    })
}
console.log(userProfilePicUrl)
</script>
<template>
  <nav :class="`nav navbar navbar-expand-xl navbar-light iq-navbar default`">
    <!-- <nav :class="`nav navbar navbar-expand-xl navbar-light iq-navbar ${headerNavbar} ${navbarHide.join('')}`"> -->
    <div class="container-fluid navbar-inner">
      <slot></slot>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon">
          <span class="mt-2 navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="mb-2 navbar-nav ms-auto align-items-center navbar-list mb-lg-0">
          <li v-if="user" class="nav-item dropdown">
            <a class="nav-link py-0 d-flex align-items-center" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img :src="userProfilePicUrl" alt="User-Profile" class="theme-color-default-img img-fluid avatar avatar-50 avatar-rounded" />
              <div class="caption ms-3 d-none d-md-block">
                <h6 class="mb-0 caption-title">{{ user.displayName }}</h6>
              </div>
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
              <li><router-link class="dropdown-item" :to="{ name: 'ProfileView' }">Profile</router-link></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#" @click.stop.prevent="handleLogOut">Logout</a></li>
            </ul>
          </li>
          <li v-else class="nav-item dropdown">
            <a class="nav-link py-0 d-flex align-items-center" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="@/assets/images/avatars/avtar_2.png" alt="User-Profile" class="theme-color-default-img img-fluid avatar avatar-50 avatar-rounded" />
              <div class="caption ms-3 d-none d-md-block">
                <p class="mb-0 caption-sub-title">Guest User</p>
              </div>
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#" @click.stop.prevent="handleLogIn">Login</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
export default {
  components: {},
  props: {
    isGoPro: {
      type: Boolean,
      default: false
    },
    isSearch: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const store = useStore()
    // const headerNavbar = computed(() => store.getters['setting/header_navbar'])
    const headerNavbar = computed(() => 'default')
    const isHidden = ref(false)
    const onscroll = () => {
      const yOffset = document.documentElement.scrollTop
      const navbar = document.querySelector('.navs-sticky')
      if (navbar !== null) {
        if (yOffset >= 100) {
          navbar.classList.add('menu-sticky')
        } else {
          navbar.classList.remove('menu-sticky')
        }
      }
    }
    const carts = computed(() => store.getters.carts)

    onMounted(() => {
      window.addEventListener('scroll', onscroll())
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', onscroll())
    })
    return {
      headerNavbar,
      isHidden,
      carts,
      emit
    }
  }
}
</script>
