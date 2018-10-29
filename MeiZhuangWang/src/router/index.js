import Vue from 'vue'
import Router from 'vue-router'
import index from './../view/index.vue'
import cart from './../view/cart.vue'
import address from './../view/address.vue'
import pay from './../view/PAY'
import success from './../view/success'
import BMS from './../BMS/admin'
import BmsLogin from './../BMS/admin-Login'

Vue.use(Router);

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    },
    {
      path: '/address',
      name: 'address',
      component: address
    },
    {
      path: '/pay',
      name: 'pay',
      component: pay
    },
    {
      path: '/success',
      name: 'success',
      component: success
    },
    {
      path: '/BMS',
      name: 'BMS',
      component: BMS
    },
    {
      path: '/BmsLogin',
      name: 'BmsLogin',
      component: BmsLogin
    }
  ]
})
