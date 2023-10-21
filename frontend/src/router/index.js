import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "../views/HomeView.vue";
import NewHomeView from "../views/NewHomeView.vue";
import CreateUserView from "../views/CreateUserView.vue";
import RegisterView from "../views/RegisterView.vue";
import TestView from "../components/partials/FooterComponent.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/newHome",
    name: "newHome",
    component: NewHomeView,
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
    path: "/RegisterView",
    name: "RegisterView",
    component: RegisterView,
  },
  {
    path: "/testView",
    name: "testView",
    component: TestView,
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
