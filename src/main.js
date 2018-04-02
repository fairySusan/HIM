// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill' 
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import mintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import fastclick from 'fastclick'
import './assets/less/common.less'
import './assets/less/var.less'
import 'common/js/rem'

fastclick.attach(document.body);
Vue.config.productionTip = false

Vue.use(mintUI);
/* eslint-disable no-new */
new Vue({
  router,
  store
}).$mount('#app')
