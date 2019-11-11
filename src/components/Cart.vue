<template>
    <div>
        <router-link to="/">FUCK, GO BACK</router-link>
        <h2>CART</h2>
        <p>owner : {{username}}<button v-on:click="logOut()" >Log Out</button></p>
        <div v-for="(item,index) in cart" v-bind:key="item.id">
            <p> 
                {{index}}.
                {{item.item}} 
                ${{(item.price * item.count) | twoSymbAfterDot}} 
                <button v-on:click="productInc(index)">+</button>
                <button v-on:click="productDec(index)">-</button> 
                {{item.count}}
            </p>
        </div>
    </div>
</template>
<script>
import store from '../store.js'

    
    export default {
        data: function() {
            return {
                cart: [],
                username:''
            };
        },
        mounted: function() {
            this.cart = this.$store.getters.getCart
            this.username = this.$store.getters.getCurrUser
        },
        filters:{
            twoSymbAfterDot : function(value){
                return Math.floor(value*100)/100
            }
        },
        methods:{
            productInc: function(index){
                this.$store.commit('countInc',index)
            },
            productDec: function(index){
                this.$store.commit('countDec',index)
            },
            logOut: function() {
                this.$store.commit('logOut')
                this.$router.push({ path: '/login' })
            },
        }
    }
</script>
