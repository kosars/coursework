<template>
    <div>
        <h5 class="text-centered">Spells List</h5>
        <div class="container-fluid" v-for="(item,index) in spells" v-bind:key="item._id">
            <div class="row">
                <div class="col-12"><h5 class="text-centered">Level {{index}}</h5></div>
                <div class="col-2" v-for="(item) in item" v-bind:key="item._id">
                    <router-link v-bind:to="'/spells/'+item._id">
                        {{ item.name }}
                    </router-link>
                    <button v-on:click="deleteSpell(item._id)">delete</button>
                </div>
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
                spells: [
                    [],//level0
                    [],//level1
                    [],//level2
                    [],//level3
                    [],//level4
                    // [],//level5
                    // [],//level6
                    // [],//level7
                    // [],//level8
                    // [],//level9
                ],
            };
        },
        mounted: function(){
            Vue.axios.get("http://localhost:3000/spells/").then((response) =>{
                console.log(response.data)
                response.data.forEach(element => {
                    
                    console.log("element.lvl")
                    this.spells[element.lvl].push(element);
                });
            }, (reject) =>{
                console.log(id)
            })
        },
        computed: {

        },
        methods: {
            deleteSpell: function(id){
                Vue.axios.delete("http://localhost:3000/spells/"+id).then(response => {
                    this.items = this.spells.filter(Element => {
                        return Element._id != id;
                    });
                });
            }
        }
    }
</script>
