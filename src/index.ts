import Vue from "vue";
import VueRouter from 'vue-router'
import router from './router'

Vue.use(VueRouter)

let v = new Vue({
    router,
    el: "#app",
    template: `
    <div>
        <router-view></router-view>
    </div>
    `
});
