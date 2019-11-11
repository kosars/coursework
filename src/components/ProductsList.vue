<template>
    <div class="products">
        <router-link to="/cart/">GO TO CART</router-link>
        <form class="searchbar" v-show="this.$store.getters.getCurrUser == this.admin">
            <input placeholder="Поиск" v-model="search">
            <input type="submit"  class="btn">
        </form>
        <div class="product" v-for="(item) in filteredItems" v-bind:key="item.id">
            <div class="product-image">
                <img v-bind:src="item.src">
            </div>
            <div>
                <h4 class="product-title">
                    <router-link v-bind:to="'/product/' + item.id">
                        {{ item.item }}
                    </router-link>
                </h4>
                <label>${{item.price}}</label>
                <button class="btn" v-on:click="addToCart(item)">Add to cart</button>  
            </div>
        </div>
    </div>
</template>
<script>
    import products from '../data/products.js'
    import store from '../store.js'
    export default {
        data: function () {
            return {
                items: [],
                search: '',
                admin:'fffff',
                searchResult: []
            };
        },
        mounted: function(){
            this.items = products;
        },
        computed: {
            filteredItems: function() {
                console.log(this);
                if (!this.search) {
                    return this.items;
                }
                return this.items.filter(element => {
                    return element.item.toUpperCase().includes(this.search.toUpperCase());
                });
            },
        },
        methods: {
            addToCart: function(value){
                alert(value + " WAS ADDED")
                this.$store.commit('addInCart',value)
                localStorage.setItem('cart', this.$store.getters.getCart)
            }
        }
    }
</script>
