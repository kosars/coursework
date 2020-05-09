<template>
    <div>
        <table class="table table-striped">
            <thead class="thead-dark">
                <tr>
                <th scope="col">Background</th>
                <th scope="col">Description</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item) in items" v-bind:key="item._id">
                <td>
                    <router-link v-bind:to="'/backgrounds/'+item._id">
                        {{ item.name }}
                    </router-link>
                </td>
                <td>{{ item.descriprion }}</td>
                <td><button class="btn btn-primary" v-on:click="deleteRace(item._id)">delete</button></td>
                
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    import Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    // Race from './Race.vue'


    Vue.use(VueAxios,axios)
    export default {
        //components:{ Race },
        data: function () {
            return {
                items: [],
            };
        },
        mounted: function(){
            Vue.axios.get("http://localhost:3000/backgrounds/").then((response) =>{
                console.log(response.data)
                this.items = response.data;
            }, (reject) =>{
                console.log(id)
            })
        },
        computed: {

        },
        methods: {
            deleteRace: function(id){
                Vue.axios.delete("http://localhost:3000/backgrounds/"+id).then(response => {
                    this.items = this.items.filter(Element => {
                        return Element._id != id;
                    });
                });
            }
        }
    }
</script>
