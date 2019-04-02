import Vue from 'vue'
import router from './router/index'
import resource from 'vue-resource'
import store from './vuexDate/startValus'
import Supplier from './Supplier'
Vue.use(resource)
new Vue({
  router,
  store,
  render: h => h(Supplier)
}).$mount('#app')
