<template>
    <!-- <div>
        <div class="product" v-for="(item) in items" v-bind:key="item._id">
            <div>
                <h4 class="product-title">
                    <router-link v-bind:to="'/chars/'+item._id">
                        {{ item.name }} {{ item.class.name }}
                    </router-link>
                    <button v-on:click="deleteChar(item._id)">delete</button>
                </h4>
            </div>
        </div>
    </div> -->
    <div>
        <table class="table table-striped">
            <thead class="thead-dark">
                <tr>
                <th scope="col">Name</th>
                <th scope="col">Race</th>
                <th scope="col">Class</th>
                <th scope="col">Level</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item) in items" v-bind:key="item._id">
                <td>
                    <router-link v-bind:to="'/chars/'+item._id">
                        {{ item.name }}
                    </router-link>
                </td>
                <td>{{ item.race.name }}</td>
                <td>{{ item.class.name }}</td>
                <td>{{ item.level }}</td>
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


    Vue.use(VueAxios,axios)
    export default {
        data: function () {
            return {
                items: [],
            };
        },
        mounted: function(){
            Vue.axios.get("http://localhost:3000/chars/").then((response) =>{
                console.log(response.data)
                this.items = response.data;
            }, (reject) =>{
                console.log(id)
            })
        },
        computed: {

        },
        methods: {
            deleteChar: function(id){
                Vue.axios.delete("http://localhost:3000/chars/"+id).then(response => {
                    this.items = this.items.filter(Element => {
                        return Element._id != id;
                    });
                });
            }
        }
    }
</script>
