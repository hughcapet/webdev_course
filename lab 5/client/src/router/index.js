import Vue from 'vue'
import Router from 'vue-router'
import AllDrafts from "../components/AllDrafts";
import Markdown from "../components/Markdown";

import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Router);
Vue.use(BootstrapVue);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'AllDrafts',
            component: AllDrafts
        },
        {
            path: '/new',
            name: 'Markdown',
            component: Markdown
        }
    ]
})
