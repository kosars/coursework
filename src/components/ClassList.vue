<template>
    <div>
         <table class="table table-striped">
            <thead class="thead-dark">
                <tr>
                <th scope="col">Class</th>
                <th scope="col">Hit Die</th>
                <th scope="col">Saving Throws</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item) in items" v-bind:key="item._id">
                <td>
                    <router-link v-bind:to="'/classes/'+item._id">
                        {{ item.name }}
                    </router-link>
                </td>
                <td>1d{{ item.hitDie }}</td>
                <td>
                    <span v-if="item.savingThrows.STR">STR</span>
                    <span v-if="item.savingThrows.DEX">DEX</span>
                    <span v-if="item.savingThrows.CON">CON</span>
                    <span v-if="item.savingThrows.INT">INT</span>
                    <span v-if="item.savingThrows.WIS">WIS</span>
                    <span v-if="item.savingThrows.CHR">CHR</span>   
                </td>
                <td><button class="btn btn-primary" v-on:click="deleteClass(item._id)">delete</button></td>
                
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
            Vue.axios.get("http://localhost:3000/classes/").then((response) =>{
                console.log(response.data)
                this.items = response.data;
            }, (reject) =>{
                console.log(id)
            })
        },
        computed: {

        },
        methods: {
            deleteClass: function(id){
                Vue.axios.delete("http://localhost:3000/classes/"+id).then(response => {
                    this.items = this.items.filter(Element => {
                        return Element._id != id;
                    });
                });
            }
        }
    }
</script>
