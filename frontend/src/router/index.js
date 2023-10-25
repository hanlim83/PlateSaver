import { createRouter, createWebHistory } from 'vue-router'

const baseChildRoutes = (prefix) => [
  {
    path: '/',
    name: prefix + 'home',
    meta: { auth: true, name: 'Home', isBanner: false },
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/about',
    name: prefix + 'about',
    meta: { auth: true, name: 'About', isBanner: false },
    component: () => import('@/views/AboutView.vue')
  },
  {
    path: '/createUser',
    name: prefix + 'createUser',
    meta: { auth: true, name: 'create user', isBanner: false },
    component: () => import('@/views/CreateUserView.vue')
  },
  {
    path: '/RegisterView',
    name: prefix + 'RegisterView',
    meta: { auth: true, name: 'register user', isBanner: false },
    component: () => import('@/views/RegisterView.vue')
  }
]

const authChildRoutes = (prefix) => [
  {
    path: 'login',
    name: prefix + '.login',
    meta: { auth: false, name: 'Login' },
    component: () => import('@/views/auth/SignIn.vue')
  },
  {
    path: 'register',
    name: prefix + '.signup',
    meta: { auth: false, name: 'Sign Up' },
    component: () => import('@/views/auth/SignUp.vue')
  },
  {
    path: 'reset-password',
    name: prefix + '.reset-password',
    meta: { auth: false, name: 'Reset Password' },
    component: () => import('@/views/auth/ResetPassword.vue')
  },
  {
    path: 'verify',
    name: prefix + '.verify',
    meta: { auth: false, name: 'Verify Email' },
    component: () => import('@/views/auth/VerifyEmail.vue')
  }
];

const postsChildRoutes = (prefix) => [
  {
    path: "createPost",
    name: prefix + '.createpost',
    meta: { auth: true, name: 'Create Post' },
    component: () => import('@/views/posts/CreatePostView.vue')
  },
  {
    path: "viewPosts",
    name: prefix + '.viewpost',
    meta: { auth: true, name: 'View Post' },
    component: () => import('@/views/posts/ViewPostsView.vue')
  },
]

const recipeChildRoutes = (prefix) => [
  {
    path: "create",
    name: prefix + '.create',
    meta: { auth: false, name: 'Create Recipe' },
    component: () => import('@/views/recipes/CreateRecipeView.vue')
  },
  {
    path: "search",
    name: prefix + '.search',
    meta: { auth: false, name: 'Search Recipe' },
    component: () => import('@/views/recipes/AdminRecipeSearchView.vue')
  },
  {
    path: "view",
    name: prefix + '.view',
    meta: { auth: false, name: 'View Recipe' },
    component: () => import('@/views/recipes/ViewRecipeView.vue')
  },
  {
    path: "view/:id",
    name: prefix + '.viewDetails',
    meta: { auth: false, name: 'View Recipe Details' },
    component: () => import('@/views/recipes/ViewRecipeDetailsView.vue')
  },
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
]

const router = createRouter({
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  history: createWebHistory(process.env.BASE_URL),
  base: process.env.BASE_URL,
  routes
})

export default router
