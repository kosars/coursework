<template>
    <div class="products">
        <p>Welcome, {{username}}! <button v-on:click="logOut()" >Log Out</button></p>
        <button class="btn">
            <router-link to="/mcreator/">
                Create Monster 
            </router-link>
        </button> 
        <button class="btn">
            <router-link to="/ccreator/">
                Create Character 
            </router-link>
        </button>
        <button class="btn">
            <router-link to="/chars/">
                List Characters
            </router-link>
        </button>  
        <button class="btn">
            <router-link to="/rbuilder/">
                Race Builder
            </router-link>
        </button>  
         <button class="btn">
            <router-link to="/races/">
                List Races
            </router-link>
        </button>  
        <button class="btn">
            <router-link to="/cbuilder/">
                Class Builder
            </router-link>
        </button>  
         <button class="btn">
            <router-link to="/classes/">
                List Classes
            </router-link>
        </button>  
         <button class="btn">
            <router-link to="/sbuilder/">
                Spell Builder
            </router-link>
        </button>  
         <button class="btn">
            <router-link to="/spells/">
                List Spells
            </router-link>
        </button> 
        <button class="btn">
            <router-link to="/dice/">
                Roll a Dice
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
