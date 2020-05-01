<template>
    <div>
       <!-- <h3>LOGIN MENU</h3>
       <input type='text' v-model='login' placeholder="Enter name">
       <button v-on:click='Authorize(login)' v-show="login != null">SIGN IN</button> -->
       <div class="container">
            <div class="container d-flex justify-content-center pt">
                <div class="col-12 col-lg-6">
                    <div>
                        <h3 class="centered">Sign in</h3>
                        <form @submit.prevent="Authorize(username)">
                            <div class="form-group row d-flex justify-content-center">
                                <input type="text" class="form-control col-6" v-model="username"
                                    placeholder="Enter username here">
                                <input type="submit" value="Join" class="btn btn-sm btn-info ml-1">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
       </div>
    </div>
</template>
<script>
import store from '../store.js'
import io from 'socket.io-client';   

    export default {
        data: function() {
            return {
                //login: null,
                username: null,
            };
        },
        mounted: function() {
            //this.login = this.$store.getters.getCurrUser;
            this.username = this.$store.getters.getCurrUser;
        },
        methods:{
            Authorize: function(value) {
                this.$store.commit('setUser',value);
                this.$router.push('/');
            },
        }
        

    }
</script>
