import Vue from 'vue';
import Router from 'vue-router';
import List from './pages/list.vue';

Vue.use(Router);

const routes = [
    {
        path: '*',
        component: List
    }
];

export default new Router({
    mode: 'history',
    routes: routes
});