import Vue from 'vue';
import ElementUI from 'element-ui'
import App from './app.vue';
import router from './router';
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI);

new Vue({
    router,
    el: "#app",
    render: h => h(App)
});