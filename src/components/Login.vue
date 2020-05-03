<template>
    <div class="text-center login-menu">
        <form class="form-signin"  @submit.prevent="Authorize(username)">
            <img class="mb-4" src="https://game-icons.net/icons/ffffff/000000/1x1/delapouite/dice-twenty-faces-twenty.svg" alt="" width="72" height="72">
            <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
            <label for="inputUsername" class="sr-only">Username</label>
            <input type="text" id="inputUsername" class="form-control" placeholder="Username" v-model="username" required autofocus>
            <!-- <label for="inputPassword" class="sr-only">Password</label>
            <input type="password" id="inputPassword" class="form-control" placeholder="Password" required> -->
            <!-- <div class="checkbox mb-3">
                <label>
                <input type="checkbox" value="remember-me"> Remember me
                </label>
            </div> -->
            <br>
            <button class="btn btn-lg btn-dark btn-block" type="submit">Sign in</button>
            <p class="mt-5 mb-3 text-muted">&copy; 2020</p>
        </form>
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
<style>
html,
body {
  height: 100%;
}

.login-menu {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>