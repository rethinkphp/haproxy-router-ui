import Vue from "vue";
import VueRouter from 'vue-router'
import router from './router'

Vue.use(VueRouter)

let v = new Vue({
    router,
    el: "#app",
    template: `
    <div>
        <header>
            <div class="header-inner">
                <router-link to="/" class="logo">HAProxy Router</router-link>
            </div>
        </header>
        <main>
            <router-view></router-view>
        </main>
    </div>
    `
});
