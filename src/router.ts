import VueRouter from 'vue-router'
import Dashboard from "./views/Dashboard.vue";

let router = new VueRouter({
  routes: [
    {path: '/', component: Dashboard},
  ] 
})

export default router