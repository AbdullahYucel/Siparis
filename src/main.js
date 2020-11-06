import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'


import Fetching from './components/Fetching'
import Details from './components/Details'

Vue.use(VueRouter)

Vue.config.productionTip = false
const router= new VueRouter({
  routes: [
    {path:'/', component: Fetching},
    {path:'/:order', component: Details}
  ],
  mode:'history'
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
