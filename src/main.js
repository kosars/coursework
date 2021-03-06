import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex';
import io from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';


import App from './components/App.vue'
import Login from './components/Login.vue'
import MonsterCreator from './components/MonsterCreator.vue'
import CharacterCreator from './components/CharacterCreator.vue'
import CharacterList from './components/CharacterList.vue'
import MonsterList from './components/MonsterList.vue'
import MainPage from './components/MainPage.vue'
import DiceRoller from './components/DiceRoller.vue'
import Character from './components/Character.vue' 
import RaceBuilder from './components/RaceBuilder.vue'
import RaceList from './components/RaceList.vue'
import Race from './components/Race.vue'
import ClassBuilder from './components/ClassBuilder.vue'
import ClassList from './components/ClassList.vue'
import Class from './components/Class.vue'
import BackgroundBuilder from './components/BackgroundBuilder.vue'
import BackgroundList from './components/BackgroundList.vue'
import Background from './components/Background.vue'
import SpellBuilder from './components/SpellBuilder.vue'
import SpellList from './components/SpellList.vue'
import Spell from './components/Spell.vue'
import store from './store.js'

const routes = [
    { path: '/', component: MainPage,  meta: { requiresAuth: true } },
    { path: '/login', component: Login },
    { path: '/dice', component: DiceRoller },
    //monsters
    { path: '/mcreator', component: MonsterCreator,  meta: { requiresAuth: true } },
    { path: '/mlist', component: MonsterList},
    //chars
    { path: '/ccreator', component: CharacterCreator,  meta: { requiresAuth: true } },
    { path: '/chars', component: CharacterList},
    { path: '/chars/:id', component: Character , props: true},
    //races
    { path: '/rbuilder', component: RaceBuilder,  meta: { requiresAuth: true } },
    { path: '/races', component: RaceList},
    { path: '/races/:id', component: Race , props: true},
    //classes
    { path: '/cbuilder', component: ClassBuilder,  meta: { requiresAuth: true } },
    { path: '/classes', component: ClassList},
    { path: '/classes/:id', component: Class , props: true},
    //backgrounds
    { path: '/bbuilder', component: BackgroundBuilder,  meta: { requiresAuth: true } },
    { path: '/backgrounds', component: BackgroundList},
    { path: '/backgrounds/:id', component: Background , props: true},
    //spells
    { path: '/sbuilder', component: SpellBuilder,  meta: { requiresAuth: true } },
    { path: '/spells', component: SpellList},
    { path: '/spells/:id', component: Spell , props: true},
   
]
///var socket = io('http://localhost:3000');

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
Vue.use(new VueSocketIO({ debug: true, connection: 'http://localhost:3000'})); ///or localhost

new Vue({
    render: h => h(App),
    el: '#app',
    router,
    store,
    //socket
})
