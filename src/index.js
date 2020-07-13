import Vue from 'vue'
import App from './app.vue'
import less from 'less'
import './assets/styles/global.styl'
Vue.use(less)
// import testTs from './utils/test'
const root = document.createElement('div')
document.body.appendChild(root)
new Vue({
  render: (h) => h(App)
}).$mount(root)
