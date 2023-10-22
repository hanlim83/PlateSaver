import { createRouter, createWebHistory } from 'vue-router'

const baseChildRoutes = (prefix) => [
  {
    path: '',
    name: prefix + 'home',
    meta: { auth: false, name: 'Home', isBanner: false },
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: 'about',
    name: prefix + 'about',
    meta: { auth: false, name: 'About', isBanner: false },
    component: () => import('@/views/AboutView.vue')
  },
  {
    path: 'createUser',
    name: prefix + 'createUser',
    meta: { auth: false, name: 'create user', isBanner: false },
    component: () => import('@/views/CreateUserView.vue')
  },
  {
    path: 'RegisterView',
    name: prefix + 'RegisterView',
    meta: { auth: false, name: 'register user', isBanner: false },
    component: () => import('@/views/RegisterView.vue')
  },
  // {
  //   path: "/testView",
  //   name: prefix + 'TestView',
  //   component: () => import('@/views/components/partials/FooterComponent.vue')
  // }
];

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
    name: prefix + "createPost",
    meta: { auth: true, name: 'create post', isBanner: false },
    component: () => import('@/views/CreatePostView.vue')
  },
  {
    path: "viewPost",
    name: prefix + "viewPost",
    meta: { auth: true, name: 'view post', isBanner: false },
    component: () => import('@/views/ViewPostView.vue')
  }
];

const recipeChildRoutes = (prefix) => [
  {
    path: "create",
    name: prefix + "create",
    meta: { auth: true, name: 'create recipe', isBanner: false },
    component: () => import('@/views/CreateRecipeView.vue'),
  },
];

const routes = [
  {
    path: '/',
    name: 'landing-page',
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
    path: '/post',
    name: 'post',
    children: postsChildRoutes('post')
  },
  {
    path: '/recipe',
    name: 'recipe',
    children: recipeChildRoutes('recipe')
  },
];

const router = createRouter({
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  history: createWebHistory(process.env.BASE_URL),
  base: process.env.BASE_URL,
  routes
})

export default router
