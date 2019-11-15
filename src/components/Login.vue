<template>
    <div>
       <h3>LOGIN MENU</h3>
       <input type='text' v-model='login' placeholder="Enter name">
       <button v-on:click='Authorize(login)' v-show="login != null">SIGN IN</button>
    </div>
</template>
<script>
import store from '../store.js'

    
    export default {
        data: function() {
            return {
                login: null,
            };
        },
        mounted: function() {
            this.login = this.$store.getters.getCurrUser
        },
        methods:{
            Authorize: function(value) {
                this.$store.commit('setUser',value)
                this.$router.push('/')
            }
        }
        

    }
</script>
