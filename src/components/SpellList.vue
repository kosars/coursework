<template>
    <div>
        <!-- <button class="btn btn-danger" v-on:click="deleteAllSpells()">delete all spells</button> -->
          <table class="table table-hover"  v-for="(item,index) in spells" v-bind:key="item._id">
            <thead class="thead-dark" v-on:click="$set(show, index, !show[index])">
                <tr>
                <th scope="col">Level {{index}}</th>
                <th scope="col">Spell</th>
                <th scope="col">School</th>
                <th scope="col">Casting Time</th>
                <th scope="col">Duration</th>
                <th scope="col">Range</th>
                <th>Actions</th>
                </tr>
            </thead>
            <!-- <transition name="smooth"> -->
                <tbody v-show="show[index]">
                    <tr v-for="(item) in item" v-bind:key="item._id">
                        <td>{{item.lvl}}</td>
                        <td>
                            <router-link v-bind:to="'/spells/'+item._id" v-if="item.ritual">
                                {{ item.name }} (Ritual)
                            </router-link>
                            <router-link v-bind:to="'/spells/'+item._id" v-if="!item.ritual">
                                {{ item.name }}
                            </router-link>
                        </td>
                        <td>{{item.school}}</td>
                        <td>{{item.castingTime}}</td>
                        <td>{{item.duration}}</td>
                        <td>{{item.range}}</td>
                        <td>
                            <button class="btn btn-primary" v-on:click="deleteSpell(item._id, item.lvl)">delete</button>
                        </td>
                    </tr>
                </tbody>
            <!-- </transition> -->
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
                show:[false,false,false,false,false,false,false,false,false,false],//массив флагов, для показа списка  спеллов
                showSpells: [
                    [],//level0
                    [],//level1
                    [],//level2
                    [],//level3
                    [],//level4
                    [],//level5
                    [],//level6
                    [],//level7
                    [],//level8
                    [],//level9
                ],//массив флагов, для показа конкретного спелла, разделённый по уровню
                spells: [
                    [],//level0
                    [],//level1
                    [],//level2
                    [],//level3
                    [],//level4
                    [],//level5
                    [],//level6
                    [],//level7
                    [],//level8
                    [],//level9
                ],//массив со спеллами, разделёнными по уровню
            };
        },
        mounted: function(){
            Vue.axios.get("http://localhost:3000/spells/").then((response) =>{
                console.log(response.data)
                response.data.forEach(element => {
                    
                    console.log("element.lvl")
                    //разделение заклинаний по уровню
                    this.spells[element.lvl].push(element);
                    this.showSpells[element.lvl].push(false);
                });
            }, (reject) =>{
                console.log(id)
            })
        },
        computed: {

        },
        methods: {
            deleteSpell: function(id,index){
                Vue.axios.delete("http://localhost:3000/spells/"+id).then(response => {
                    this.items = this.spells[index].filter(Element => {
                        return Element._id != id;
                    });
                });
            },
            deleteAllSpells: function(){
                this.spells.forEach(element => {
                    element.forEach(spell => {
                        Vue.axios.delete("http://localhost:3000/spells/"+spell._id);
                    })
                }).then(() => {alert("Done")});
            },
            showTable: function(t){
                for (let i = 0; i < this.show.length; i++) {
                    const element = this.show[i]
                    if(element == t){
                        this.show[i] = !(element)
                    }
                    
                }
            },
        }
    }
</script>
