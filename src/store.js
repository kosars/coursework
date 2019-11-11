import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
    plugins: [createPersistedState()],
   state: {
        products: [],
        currUser:null,
   },
   mutations: {
       addInCart: (state,product) => state.products.push(product),
       setUser: (state,name) => state.currUser = name,
       logOut: (state) =>state.currUser = null,
       countInc: (state,item) => state.products[item].count++,
       countDec: (state,item) => state.products[item].count--,
       
   },
   getters: {
       getCart: (state) =>
       {
           return state.products
       },
       getCurrUser: (state) =>
       {
           return state.currUser
       }
   }
 })
 export default store;
