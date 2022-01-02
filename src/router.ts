import { createRouter, createWebHistory } from "vue-router";
import List from "./pages/list.vue";

const routes = [
    {
        path: '/',
        component: List
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;