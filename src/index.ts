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
                <ul class="navbar">
                    <li>
                        <router-link to="/" active-class="active" exact>Services</router-link>
                    </li> 
                    <li>
                        <router-link to="/domains" active-class="active" exact>Domains</router-link>
                    </li> 
                    <li>
                        <a href="/haproxy_stats" target="_blink">Stats</a>
                    </li> 
                </ul>
            </div>
        </header>
        <main>
            <router-view></router-view>
        </main>
    </div>
    `
});
