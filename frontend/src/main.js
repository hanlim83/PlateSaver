import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import materialKit from "./material-kit";

const app = createApp(App);
app.use(createPinia());
app.use(materialKit);
createApp(App).use(router).mount("#app");