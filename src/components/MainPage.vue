<template>
    <div class="products">
        <router-link to="/cart/">GO TO CART</router-link>
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
    export default {
        data: function () {
            return {

            };
        },
        mounted: function(){
            
        },
        computed: {

        },
        methods: {
           
        },
    }
</script>
