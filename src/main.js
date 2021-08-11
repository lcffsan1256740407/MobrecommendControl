// 正常的导入两件套
import Vue from 'vue'
import App from './App.vue'

// 导入路由
import VueRouter from "vue-router"
Vue.use(VueRouter)
import router from "./router"

// 导入Vant移动端框架
import Vant from "vant"
import 'vant/lib/index.css'
Vue.use(Vant)



new Vue({
  el:"#demo",
  render: h => h(App),
  router,
})