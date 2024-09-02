import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import zhCn from "element-plus/lib/locale/lang/zh-cn";//国际化
import zhCn from "element-plus/dist/locale/zh-cn.mjs"
import { createPinia } from 'pinia'
// main.ts
// import "tailwindcss/tailwind.css"
import "./tailwind.scss"; 
import {
    setDomFontSize
} from './utils/dom.ts'
setDomFontSize()


const app = createApp(App);
const pinia = createPinia()
import 'animate.css';

app.use(ElementPlus, { locale: zhCn }).use(pinia).use(router).mount('#app')

//全局注册图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
