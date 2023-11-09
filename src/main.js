import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

// Library Components
import VueSweetalert2 from 'vue-sweetalert2'
import VueApexCharts from 'vue3-apexcharts'
import BootstrapVue3 from 'bootstrap-vue-3'
import CounterUp from 'vue3-autocounter'
import 'aos/dist/aos.css'

// Custom Components & Directives
import globalComponent from './plugins/global-components'
import globalDirective from './plugins/global-directive'
import globalMixin from './plugins/global-mixin'
require('waypoints/lib/noframework.waypoints.min')

//Toastify
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

//VueFire
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './firebase'

//Google MAPS
import VueGoogleMaps from '@fawmi/vue-google-maps';

const app = createApp(App)
app.use(store).use(router)

//VueFire
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()]
})

// Library Components
app.use(VueSweetalert2)
app.use(VueApexCharts)
app.use(BootstrapVue3)
app.component('counter-up', CounterUp)

// Custom Components & Directives
app.use(globalComponent)
app.use(globalDirective)
app.mixin(globalMixin)

//Toastify

app.use(Vue3Toastify, {
  position: 'top-right',
  duration: 3000,
  dismissible: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
  theme: 'light'
})

//Google MAPS

app.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBHv4JD1OQx8TgqAgiing9nRP6HM72zAB4',
  },
})

app.mount('#app')

export default app
