import { createRouter, createWebHashHistory} from "vue-router";
import HomeView from "../views/HomeView.vue";
import CreateUserView from "../views/CreateUserView.vue";
import RegisterView from "../views/RegisterView.vue";

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
    path: "/RegisterView",
    name: "RegisterView",
    component: RegisterView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
