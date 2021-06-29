import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
// import echarts from 'vue-echarts'
import echarts from "echarts";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import '@/styles/element-variables.scss'

import App from './App'
import store from './store'
import router from './router'
import '@/icons' // icon
import '@/permission' // permission control

// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
