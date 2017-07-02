import VueRouter from 'vue-router'
import Dashboard from "./views/Dashboard.vue";
import EditService from "./views/EditService.vue";

let router = new VueRouter({
  mode: 'history',
  routes: [
    {path: '/', component: Dashboard, name: 'home'},
    {path: '/services/new', component: EditService, name: 'service.new'},
    {path: '/services/:id', component: EditService, name: 'service.edit'},
  ] 
})

export default router