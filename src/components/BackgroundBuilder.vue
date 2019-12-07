<template>  
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <h3 class="text-center">Dungeons & Dragons Background Builder</h3>
                </div>
                <div class="w-100"></div>
                <!--Name-->
                <div class="col-12 col-md-3">
                    <p>Name</p>
                    <input  class="form-control" type="text" v-model="newBack.name" required>
                </div>
                <!--Source-->
                <div class="col-12 col-md-3">
                    <p>Source</p>
                    <input  class="form-control" type="text" v-model="newBack.source" required>
                </div>
                <!--Skills-->
                <div class="col-12 col-md-6">
                    <h5>Skill Proficiency (choose one)</h5>
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-2" v-for="(item) in newBack.skills" v-bind:key="item.id" v-show="!skillChoosed || item.value">
                                <p><input type="checkbox" v-model="item.value"><br> {{item.skillName}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!--Weapon-->
                <div class="col-12">
                     <p>Weapon Proficiency</p>
                     <div class="container-fluid">
                        <div class="row">
                            <div class="col-2">
                                <button class="btn btn-primary" v-on:click="addWeapon()">Add</button>
                                
                            </div>
                            <div class="col-4 col-md-2" v-for="(item,index) in newBack.weaponProf" v-bind:key="item.id">
                                <p class="d-flex flex-row">
                                    <select class="form-control" type="text" v-model="newBack.weaponProf[index].name">
                                        <option v-for="item in options.weapons" v-bind:key="item.id">{{item}}</option>
                                    </select>
                                    <button class="btn btn-danger" v-on:click="deleteWeapon(index)">X</button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <!--Tools-->
                <div class="col-12">
                     <p>Tool Proficiency</p>
                     <div class="container-fluid">
                        <div class="row">
                            <div class="col-2">
                                <button class="btn btn-primary" v-on:click="addTool()">Add</button>
                                
                            </div>
                            <div class="col-4 col-md-2" v-for="(item,index) in newBack.toolProf" v-bind:key="item.id">
                                <p class="d-flex flex-row">
                                     <select class="form-control" type="text" v-model="newBack.toolProf[index].name">
                                        <option v-for="item in options.tools" v-bind:key="item.id">{{item}}</option>
                                    </select>
                                    <button class="btn btn-danger" v-on:click="deleteTool(index)">X</button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <!--Languages-->
                <div class="col-12">
                     <p>Languages</p>
                     <div class="container-fluid">
                        <div class="row">
                            <div class="col-2">
                                <button class="btn btn-primary" v-on:click="addLang()">Add</button>
                                
                            </div>
                            <div class="col-4 col-md-2" v-for="(item,index) in newBack.languages" v-bind:key="item.id">
                                <p class="d-flex flex-row">
                                    <input class="form-control" type="text" v-model="newBack.languages[index].name">
                                    <button class="btn btn-danger" v-on:click="deleteLang(index)">X</button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <!--Traits-->
                <div class="col-12">
                     
                     <div class="container-fluid">
                        <div class="row">
                            <div class="col-2">
                                <p>Traits</p>
                                <button class="btn btn-primary" v-on:click="addTrait()">Add</button>
                            </div>
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-12" v-for="(item,index) in newBack.traits" v-bind:key="item.id">
                                        <div class="col-12 text-center">
                                            <h5>Trait {{index + 1}}</h5>
                                        </div>
                                        <div class="col-12 d-flex d-row">
                                            <div class="col-2">
                                                <h5>Name</h5>
                                            </div>
                                            <div class="col-10 col-md-4 d-flex d-row">
                                                <input class="form-control" type="text" v-model="newBack.traits[index].name">
                                                <button class="btn btn-danger" v-on:click="deleteTrait(index)">X</button>
                                            </div>
                                        </div>
                                        <div class="col-12 d-flex d-row">
                                            <div class="col-2">
                                                <h5>Description</h5>
                                            </div>
                                            <div class="col-10">
                                                <input class="form-control" type="text" v-model="newBack.traits[index].description">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--Image-->
                <div class="col-12">
                    <p>Image URL</p>
                    <input  class="form-control" type="text" v-model="newBack.image">
                </div>
                <!--Description-->
                <div class="col-12">
                    <p>Description</p>
                    <textarea  class="form-control" type="text" v-model="newBack.descriprion" rows="6"></textarea>
                </div>
                <!--Confirm-->
                <div class="col-12 text-center">
                    <br>
                    <button type="submit" 
                            class="btn btn-primary mb-2"
                            v-on:click="finishCreation()">Finish Creation!</button>
                </div>                                     
            </div>
        </div>
    </div>
</template>

<script>
    import tools from '../data/tools.js'
    import Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'

    Vue.use(VueAxios,axios)
    export default {
        data: function() {
            return{
                tools: [],
                points:2,
                skillPoints:2,
                newBack:{
                    'name': '',
                    'source':'',
                    'proficiencies':{
                        'tools':[],
                        'musical':[],
                        'gaming':[],
                        'other':[],
                    },
                    'startItems':{
                        'gold':0,
                        'clothes':"common",
                        'tools':[],
                        'musical':[],
                        'symbols':[],
                        'other':[],
                    },
                    'languages':[],
                    'skills': [
                        {'skillName' : 'Athletics','value' : false },//str
                        {'skillName' : 'Acrobatics','value' : false },//dex
                        {'skillName' : 'Sleight of Hand','value' : false },//dex
                        {'skillName' : 'Stealth','value' : false },//dex
                        {'skillName' : 'Arcana','value' : false },//int
                        {'skillName' : 'History','value' : false },//int
                        {'skillName' : 'Investigation','value' : false },//int
                        {'skillName' : 'Nature','value' : false },//int
                        {'skillName' : 'Religion','value' : false },//int
                        {'skillName' : 'Animal Handling','value' : false },//wis
                        {'skillName' : 'Insight','value' : false },//wis
                        {'skillName' : 'Medicine','value' : false },//wis
                        {'skillName' : 'Perception','value' : false },//wis
                        {'skillName' : 'Survival','value' : false },//wis
                        {'skillName' : 'Deception','value' : false },//chr
                        {'skillName' : 'Intimidation','value' : false },//chr
                        {'skillName' : 'Performance','value' : false },//chr
                        {'skillName' : 'Persuation','value' : false },//chr
                    ],
                    'traits':[],
                    'descriprion':'',
                    'image':'',
                }
            }
        },
        mounted: function(){
            this.tools = tools;
        },
        computed:{
          skillChoosed: function(){ 
            for(var i=0;i< this.newBack.skills.length; i++){
                if(this.newBack.skills[i].value) return true;
            }
            return false  
          },
        },
        methods: {
            
            addLang: function(){
                if(this.newBack.languages.length < 4) this.newBack.languages.push({'name':''});
            },
            deleteLang: function (index) {
                this.newBack.languages.splice(index, 1);
            },
            addMuse: function(){
                if(this.newBack.proficiencies.musical.length < 4) this.newBack.proficiencies.musical.push({'name':''});
            },
            deleteMuse: function (index) {
                this.newBack.proficiencies.musical.splice(index, 1);
            },
            addItem: function(array){
                if(array.length < 4) array.push({'name':''});
            },
            deleteItem: function (array,index) {
                array.splice(index, 1);
            },
            addTool: function(){
                if(this.newBack.proficiencies.tools.length < 4) this.newBack.proficiencies.tools.push({'name':''});
            },
            deleteTool: function (index) {
                this.newBack.proficiencies.tools.splice(index, 1);
            },
            addTrait: function(){
                if(this.newBack.traits.length < 12) this.newBack.traits.push({'name':'','description':''});
            },
            deleteTrait: function (index) {
                this.newBack.traits.splice(index, 1);
            },
            finishCreation: function(){
                Vue.axios.post("http://localhost:3000/backgrounds",{
                    'name': this.newBack.name,
                    'source': this.newBack.source,
                    'languages': this.newBack.languages,
                    'proficiencies':{
                        'tools':this.newBack.proficiencies.tools,
                        'musical':this.newBack.proficiencies.musical,
                        'gaming':this.newBack.proficiencies.gaming,
                        'other':this.newBack.proficiencies.other,
                    },
                    'startItems':{
                        'gold':this.newBack.startItems.gold,
                        'clothes':this.newBack.startItems.clothes,
                        'tools':this.newBack.startItems.tools,
                        'musical':this.newBack.startItems.musical,
                        'symbols':this.newBack.startItems.symbols,
                        'other':this.newBack.startItems.other,
                    },
                    'skills': this.newBack.skills,
                    'descriprion': this.newBack.descriprion,
                    'traits': this.newBack.traits,
                    'image': this.newBack.image,
                }).then((responce) => {
                    console.log(responce.data)
                    this.$router.push('/')
                })
            },
        },
    }
</script>

<style>
            
</style>
