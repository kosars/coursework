import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex';


import App from './components/App.vue'
import Login from './components/Login.vue'
import MonsterCreator from './components/MonsterCreator.vue'
import CharacterCreator from './components/CharacterCreator.vue'
import CharacterList from './components/CharacterList.vue'
import MonsterList from './components/MonsterList.vue'
import MainPage from './components/MainPage.vue'
import DiceRoller from './components/DiceRoller.vue'
import Character from './components/Character.vue'


import store from './store.js'

const routes = [
    { path: '/', component: MainPage,  meta: { requiresAuth: true } },
    { path: '/login', component: Login },
    { path: '/mcreator', component: MonsterCreator,  meta: { requiresAuth: true } },
    { path: '/ccreator', component: CharacterCreator,  meta: { requiresAuth: true } },
    { path: '/clist', component: CharacterList},
    { path: '/chars/:id', component: Character , props: true},
    { path: '/mlist', component: MonsterList},
    { path: '/dice', component: DiceRoller },
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
