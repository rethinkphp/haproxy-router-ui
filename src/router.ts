import VueRouter from 'vue-router'
import Dashboard from "./views/Dashboard.vue";
import EditService from "./views/EditService.vue";
import Domains from "./views/Domains.vue";
import EditDomain from "./views/EditDomain.vue";

let router = new VueRouter({
  mode: 'history',
  routes: [
    {path: '/', component: Dashboard, name: 'home'},
    {path: '/services/new', component: EditService, name: 'service.new'},
    {path: '/services/:id', component: EditService, name: 'service.edit'},
    {path: '/domains', component: Domains, name: 'domains'},
    {path: '/domains/new', component: EditDomain, name: 'domain.new'},
    {path: '/domains/:id', component: EditDomain, name: 'domain.edit'},
  ] 
})

export default router