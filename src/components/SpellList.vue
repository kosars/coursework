<template>
    <div>
        <div class="product" v-for="(item) in items" v-bind:key="item._id">
            <div>
                <h4 class="product-title">
                    <router-link v-bind:to="'/spells/'+item._id">
                        {{ item.name }}
                    </router-link>
                    <button v-on:click="deleteSpell(item._id)">delete</button>
                </h4>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'


    Vue.use(VueAxios,axios)
    export default {
        data: function () {
            return {
                items: [],
            };
        },
        mounted: function(){
            Vue.axios.get("http://localhost:3000/spells/").then((response) =>{
                console.log(response.data)
                this.items = response.data;
            }, (reject) =>{
                console.log(id)
            })
        },
        computed: {

        },
        methods: {
            deleteSpell: function(id){
                Vue.axios.delete("http://localhost:3000/spells/"+id).then(response => {
                    this.items = this.items.filter(Element => {
                        return Element._id != id;
                    });
                });
            }
        }
    }
</script>
