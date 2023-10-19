import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "../views/HomeView.vue";
import CreateUserView from "../views/CreateUserView.vue";
import CreatePostView from "../views/CreatePostView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/createUser",
    name: "createUser",
    component: CreateUserView,
  },
  {
    path: "/createPost",
    name: "createPost",
    component: CreatePostView,
  }
];

const router = createRouter({
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  history: createWebHistory(process.env.BASE_URL),
  base: process.env.BASE_URL,
  routes
})

export default router
