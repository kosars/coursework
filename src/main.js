import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex';


import App from './components/App.vue'
import ProductInfo from './components/ProductInfo.vue'
import ProductsList from './components/ProductsList.vue'
import Cart from './components/Cart.vue'
import Login from './components/Login.vue'
import MonsterCreator from './components/MonsterCreator.vue'
import CharacterCreator from './components/CharacterCreator.vue'


import store from './store.js'

const routes = [
    { path: '/', component: ProductsList,  meta: { requiresAuth: true } },
    { path: '/product/:id', component: ProductInfo,  meta: { requiresAuth: true } },
    { path: '/cart', component: Cart,  meta: { requiresAuth: true } },
    { path: '/login', component: Login },
    { path: '/mcreator', component: MonsterCreator,  meta: { requiresAuth: true } },
    { path: '/ccreator', component: CharacterCreator,  meta: { requiresAuth: true } },
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // этот путь требует авторизации, проверяем залогинен ли
      // пользователь, и если нет, перенаправляем на страницу логина
      if (store.getters.getCurrUser == null) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    } else {
      next() // всегда так или иначе нужно вызвать next()!
    }
  })

Vue.use(VueRouter)
Vue.use(Vuex);

new Vue({
    render: h => h(App),
    el: '#app',
    router,
    store,
})
