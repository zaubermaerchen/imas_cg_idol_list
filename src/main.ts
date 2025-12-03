import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from '@/App.vue'
import router from '@/router'
import { dependencyProviderPlugin } from '@/plugins/dependencyProviderPlugin.ts'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(dependencyProviderPlugin)
app.mount('#app')
