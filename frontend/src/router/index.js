import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser } from 'vuefire'

const baseChildRoutes = (prefix) => [
  {
    path: '/',
    name: prefix + 'home',
    meta: { requiresAuth: false, name: 'Home', isBanner: false },
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/about',
    name: prefix + 'about',
    meta: { requiresAuth: false, name: 'About', isBanner: false },
    component: () => import('@/views/AboutView.vue')
  },
  {
    path: '/createUser',
    name: prefix + 'createUser',
    meta: { requiresAuth: false, name: 'create user', isBanner: false },
    component: () => import('@/views/CreateUserView.vue')
  },
  {
    path: '/RegisterView',
    name: prefix + 'RegisterView',
    meta: { requiresAuth: false, name: 'register user', isBanner: false },
    component: () => import('@/views/RegisterView.vue')
  },
  {
    path: '/UserLocationView',
    name: prefix + 'UserLocationView',
    meta: { requiresAuth: false, name: 'User Location View', isBanner: false },
    component: () => import('@/views/UserLocationView.vue')
  },
  {
    path: '/UserLocationViewRadar',
    name: prefix + 'UserLocationViewRadar',
    meta: { requiresAuth: false, name: 'User Location View Radar', isBanner: false },
    component: () => import('@/views/UserLocationViewRadar.vue')
  },
  {
    path: '/profile',
    name: prefix + 'ProfileView',
    meta: { requiresAuth: true, name: 'user profile', isBanner: false },
    component: () => import('@/views/UserProfileView.vue')
  }
]

const authChildRoutes = (prefix) => [
  {
    path: 'login',
    name: prefix + '.login',
    meta: { requiresAuth: false, name: 'Login' },
    component: () => import('@/views/auth/SignIn.vue')
  },
  {
    path: 'register',
    name: prefix + '.signup',
    meta: { requiresAuth: false, name: 'Sign Up' },
    component: () => import('@/views/auth/SignUp.vue')
  },
  {
    path: 'reset-password',
    name: prefix + '.reset-password',
    meta: { requiresAuth: false, name: 'Reset Password' },
    component: () => import('@/views/auth/ResetPassword.vue')
  },
  {
    path: 'verify',
    name: prefix + '.verify',
    meta: { requiresAuth: false, name: 'Verify Email' },
    component: () => import('@/views/auth/VerifyEmail.vue')
  },
  {
    path: 'set-password',
    name: prefix + '.set-password',
    meta: { requiresAuth: false, name: 'Set Password' },
    component: () => import('@/views/auth/SetPassword.vue')
  },
  {
    path: 'token',
    name: prefix + '.token',
    meta: { requiresAuth: false, name: 'Token' },
    component: () => import('@/views/auth/InvalidToken.vue')
  }
]

const postsChildRoutes = (prefix) => [
  {
    path: 'createPost',
    name: prefix + '.createpost',
    meta: { requiresAuth: true, name: 'Create Post' },
    component: () => import('@/views/posts/CreatePostView.vue')
  },
  {
    path: 'viewPosts',
    name: prefix + '.viewpost',
    meta: { requiresAuth: true, name: 'View Post' },
    component: () => import('@/views/posts/ViewPostsView.vue')
  }
]

const recipeChildRoutes = (prefix) => [
  {
    path: 'create',
    name: prefix + '.create',
    meta: { auth: false, name: 'Create Recipe' },
    component: () => import('@/views/recipes/CreateRecipeView.vue')
  },
  {
    path: 'search',
    name: prefix + '.search',
    meta: { auth: false, name: 'Search Recipe' },
    component: () => import('@/views/recipes/AdminRecipeSearchView.vue')
  },
  {
    path: 'view',
    name: prefix + '.view',
    meta: { auth: false, name: 'View Recipe' },
    component: () => import('@/views/recipes/ViewRecipeView.vue')
  },
  {
    path: 'view/:id',
    name: prefix + '.viewDetails',
    meta: { auth: false, name: 'View Recipe Details' },
    component: () => import('@/views/recipes/ViewRecipeDetailsView.vue')
  }
]

const adminChildRoutes = (prefix) => [
  {
    path: 'users',
    name: prefix + '.allusers',
    meta: { auth: true, name: 'View All Users' },
    component: () => import('@/views/admin/ListUsers.vue')
  }
]

const routes = [
  {
    path: '/',
    name: 'landing pages',
    component: () => import('@/layouts/HorizontalLayout.vue'),
    children: baseChildRoutes('')
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/layouts/BlankLayout.vue'),
    children: authChildRoutes('auth')
  },
  {
    path: '/posts',
    name: 'posts',
    component: () => import('@/layouts/HorizontalLayout.vue'),
    children: postsChildRoutes('posts')
  },
  {
    path: '/recipe',
    name: 'recipes',
    component: () => import('@/layouts/HorizontalLayout.vue'),
    children: recipeChildRoutes('recipe')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/layouts/HorizontalLayout.vue'),
    children: adminChildRoutes('admin')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    meta: { requiresAuth: false, name: 'Not Found' },
    components: {
      layout: import('@/layouts/BlankLayout.vue'),
      default: import('@/views/Error404Page.vue')
    }
  }
]

const router = createRouter({
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  history: createWebHistory(process.env.BASE_URL),
  base: process.env.BASE_URL,
  routes
})
router.beforeEach(async (to) => {
  let currentUser = await getCurrentUser()
  if (to.meta.requiresAuth && currentUser == null) {
    return {
      path: '/auth/login',
      query: {
        redirect: to.fullPath
      }
    }
  }
})

export default router
