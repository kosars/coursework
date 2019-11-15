<template>
    <div class="products">
        <p>Welcome, {{username}}! <button v-on:click="logOut()" >Log Out</button></p>
        <p>fliters: {{num | twoSymbAfterDot}}</p>
        <button class="btn">
            <router-link to="/mcreator/">
                Monster Creator
            </router-link>
        </button> 
        <button class="btn">
            <router-link to="/ccreator/">
                Character Creator
            </router-link>
        </button>
        <button class="btn">
            <router-link to="/clist/">
                Character List
            </router-link>
        </button>  
        <button class="btn">
            <router-link to="/dice/">
                Dice Roller
            </router-link>
        </button> 
    </div>
</template>
<script>
    import store from '../store.js'

    export default {
        data: function () {
            return {
                username:'',
                num: 14.144,
            };
        },
        mounted: function(){
            this.username = this.$store.getters.getCurrUser
        },
        computed: {

        },
        filters:{
            twoSymbAfterDot : function(value){
                return Math.floor(value*100)/100
            }
        },
        methods: {
           logOut: function() {
                this.$store.commit('logOut')
                this.$router.push({ path: '/login' })
            },
        },
    }
</script>
