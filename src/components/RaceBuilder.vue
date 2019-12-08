<template>  
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <h3 class="text-center">Dungeons & Dragons Race Builder</h3>
                </div>
                <div class="w-100"></div>
                <!--Name-->
                <div class="col-12 col-md-3">
                    <p>Name</p>
                    <input  class="form-control" type="text" v-model="newRace.name" required>
                </div>
                <!--Source-->
                <div class="col-12 col-md-3">
                    <p>Source</p>
                    <input  class="form-control" type="text" v-model="newRace.source" required>
                </div>
                <!--Block-->
                <div class="col-12 col-md-6 d-flex flex-row">
                    <!--Size-->
                    <div class="col">
                        <p>Size</p>
                        <select class="form-control" type="number" v-model="newRace.size">
                            <option>small</option>
                            <option>medium</option>
                            <option>large</option>
                        </select>
                    </div>
                    <!--Speed-->
                    <div class="col">
                        <p>Speed in ft</p>
                        <select class="form-control" type="number" v-model="newRace.speed">
                            <option>0</option>
                            <option>5</option>
                            <option>10</option>
                            <option>15</option>
                            <option>20</option>
                            <option>25</option>
                            <option>30</option>
                            <option>35</option>
                            <option>40</option>
                            <option>45</option>
                            <option>50</option>
                        </select>
                    </div>
                    <!--Darkvision-->
                    <div class="col">
                        <p>Darkvision in ft</p>
                        <select class="form-control" type="number" v-model="newRace.nightVision">
                            <option>0</option>
                            <option>60</option>
                            <option>120</option>
                        </select>
                    </div>
                </div>
                <div class="w-100"></div>
                <!--Abilities-->
                <div class="col-12 col-md-6">
                    <h5>Ability Score Increases: ({{points}}) points left</h5>
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-2 text-center">
                                <div><p>STR</p></div>
                                <button class="btn" v-on:click="abilitiesIncrease('STR',true)">
                                    <h3>+</h3>
                                </button>
                                <div>
                                    <h3>{{newRace.abilitiesBonus.STR}}</h3>
                                </div>
                                <button class="btn" v-on:click="abilitiesIncrease('STR',false)">
                                    <h3>-</h3>
                                </button>
                            </div>
                            <div class="col-2 text-center">
                                <div><p>DEX</p></div>
                                <button class="btn" v-on:click="abilitiesIncrease('DEX',true)">
                                    <h3>+</h3>
                                </button>
                                <div>
                                    <h3>{{newRace.abilitiesBonus.DEX}}</h3>
                                </div>
                                <button class="btn" v-on:click="abilitiesIncrease('DEX',false)">
                                    <h3>-</h3>
                                </button>
                            </div>
                            <div class="col-2 text-center">
                                <div><p>CON</p></div>
                                <button class="btn" v-on:click="abilitiesIncrease('CON',true)">
                                    <h3>+</h3>
                                </button>
                                <div>
                                    <h3>{{newRace.abilitiesBonus.CON}}</h3>
                                </div>
                                <button class="btn" v-on:click="abilitiesIncrease('CON',false)">
                                    <h3>-</h3>
                                </button>
                            </div>
                            <div class="col-2 text-center">
                                <div><p>INT</p></div>
                                <button class="btn" v-on:click="abilitiesIncrease('INT',true)">
                                    <h3>+</h3>
                                </button>
                                <div>
                                    <h3>{{newRace.abilitiesBonus.INT}}</h3>
                                </div>
                                <button class="btn" v-on:click="abilitiesIncrease('INT',false)">
                                    <h3>-</h3>
                                </button>
                            </div>
                            <div class="col-2 text-center">
                                <div><p>WIS</p></div>
                                <button class="btn" v-on:click="abilitiesIncrease('WIS',true)">
                                    <h3>+</h3>
                                </button>
                                <div>
                                    <h3>{{newRace.abilitiesBonus.WIS}}</h3>
                                </div>
                                <button class="btn" v-on:click="abilitiesIncrease('WIS',false)">
                                    <h3>-</h3>
                                </button>
                            </div>
                            <div class="col-2 text-center">
                                <div><p>CHR</p></div>
                                <button class="btn" v-on:click="abilitiesIncrease('CHR',true)">
                                    <h3>+</h3>
                                </button>
                                <div>
                                    <h3>{{newRace.abilitiesBonus.CHR}}</h3>
                                </div>
                                <button class="btn" v-on:click="abilitiesIncrease('CHR',false)">
                                    <h3>-</h3>
                                </button>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <!--Skills-->
                <div class="col-12 col-md-6">
                    <h5>Skill Proficiency (choose one)</h5>
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-2" v-for="(item) in newRace.skills" v-bind:key="item.id" v-show="!skillChoosed || item.value">
                                <p><input type="checkbox" v-model="item.value"><br> {{item.skillName}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- damageResistance -->
                <div class="col-6">
                     <p>Damage Resistance from</p>
                     <div class="container-fluid">
                        <div class="row">
                            <select class="form-control" type="text" v-model="newRace.damageResistance">
                                <option v-for="item in options.resistance" v-bind:key="item.id">{{item}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <!-- damageImmunity -->
                <div class="col-6">
                     <p>Damage Immunity from</p>
                     <div class="container-fluid">
                        <div class="row">
                            <select class="form-control" type="text" v-model="newRace.damageImmunity">
                                <option v-for="item in options.resistance" v-bind:key="item.id">{{item}}</option>
                            </select>
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
                            <div class="col-4 col-md-2" v-for="(item,index) in newRace.weaponProf" v-bind:key="item.id">
                                <p class="d-flex flex-row">
                                    <select class="form-control" type="text" v-model="newRace.weaponProf[index].name">
                                        <option v-for="item in options.weapons" v-bind:key="item.id">{{item}}</option>
                                    </select>
                                    <button class="btn btn-danger" v-on:click="deleteWeapon(index)">X</button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <!--Armor-->
                <div class="col-12">
                     <p>Armor Proficiency</p>
                     <div class="container-fluid">
                        <div class="row">
                            <div class="col-2">
                                <button class="btn btn-primary" v-on:click="addArmor()">Add</button>
                                
                            </div>
                            <div class="col-4 col-md-2" v-for="(item,index) in newRace.armorProf" v-bind:key="item.id">
                                <p class="d-flex flex-row">
                                     <select class="form-control" type="text" v-model="newRace.armorProf[index].name">
                                        <option v-for="item in options.armor" v-bind:key="item.id">{{item}}</option>
                                    </select>
                                    <button class="btn btn-danger" v-on:click="deleteArmor(index)">X</button>
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
                            <div class="col-4 col-md-2" v-for="(item,index) in newRace.toolProf" v-bind:key="item.id">
                                <p class="d-flex flex-row">
                                     <select class="form-control" type="text" v-model="newRace.toolProf[index].name">
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
                            <div class="col-4 col-md-2" v-for="(item,index) in newRace.languages" v-bind:key="item.id">
                                <p class="d-flex flex-row">
                                    <input class="form-control" type="text" v-model="newRace.languages[index].name">
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
                                    <div class="col-12" v-for="(item,index) in newRace.traits" v-bind:key="item.id">
                                        <div class="col-12 text-center">
                                            <h5>Trait {{index + 1}}</h5>
                                        </div>
                                        <div class="col-12 d-flex d-row">
                                            <div class="col-2">
                                                <h5>Name</h5>
                                            </div>
                                            <div class="col-10 col-md-4 d-flex d-row">
                                                <input class="form-control" type="text" v-model="newRace.traits[index].name">
                                                <button class="btn btn-danger" v-on:click="deleteTrait(index)">X</button>
                                            </div>
                                        </div>
                                        <div class="col-12 d-flex d-row">
                                            <div class="col-2">
                                                <h5>Description</h5>
                                            </div>
                                            <div class="col-10">
                                                <input class="form-control" type="text" v-model="newRace.traits[index].description">
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
                    <input  class="form-control" type="text" v-model="newRace.image">
                </div>
                <!--Description-->
                <div class="col-12">
                    <p>Description</p>
                    <textarea  class="form-control" type="text" v-model="newRace.descriprion" rows="6"></textarea>
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
    import rBuilderData from '../data/rBuilderData.js'
    import Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'

    Vue.use(VueAxios,axios)
    export default {
        data: function() {
            return{
                options: [],
                points:2,
                skillPoints:2,
                newRace:{
                   'name': '',
                    'subraceIds':[],
                    'abilitiesBonus':{
                        'STR':0,
                        'CON':0,
                        'DEX':0,
                        'INT':0,
                        'WIS':0,
                        'CHR':0,
                    },
                    'speed':30,
                    'nightVision':0,
                    'damageResistance':'',
                    'damageImmunity':'',
                    'weaponProf':[],
                    'armorProf':[],
                    'toolProf':[],
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
                    'features': '',
                    //other
                    'traits':[],
                    'descriprion':'',
                    'maxAge':0,
                    'minHeight':0,
                    'maxHeight':0,
                    'size':'medium',
                    'image':'',
                }
            }
        },
        mounted: function(){
            this.options = rBuilderData;
           
        },
        computed:{
          skillChoosed: function(){ 
            for(var i=0;i< this.newRace.skills.length; i++){
                if(this.newRace.skills[i].value) return true;
            }
            return false  
          },
        },
        methods: {
            abilitiesIncrease: function(ab,way){
                    switch (ab) {
                        case 'STR':{
                            if(way && this.points > 0 && this.newRace.abilitiesBonus.STR < 2){
                                this.points--;
                                this.newRace.abilitiesBonus.STR++;
                            }
                            else if(!way && this.newRace.abilitiesBonus.STR > -2){
                                this.points++;
                                this.newRace.abilitiesBonus.STR--;
                            }
                        }break;
                        case 'DEX':{
                            if(way && this.points > 0 && this.newRace.abilitiesBonus.DEX < 2){
                                this.points--;
                                this.newRace.abilitiesBonus.DEX++;
                            }
                            else if(!way && this.newRace.abilitiesBonus.DEX > -2){
                                this.points++;
                                this.newRace.abilitiesBonus.DEX--;
                            }
                        }break;
                        case 'CON':{
                            if(way && this.points > 0 && this.newRace.abilitiesBonus.CON < 2){
                                this.points--;
                                this.newRace.abilitiesBonus.CON++;
                            }
                            else if(!way && this.newRace.abilitiesBonus.CON > -2){
                                this.points++;
                                this.newRace.abilitiesBonus.CON--;
                            }
                        }break;
                        case 'INT':{
                            if(way && this.points > 0 && this.newRace.abilitiesBonus.INT < 2){
                                this.points--;
                                this.newRace.abilitiesBonus.INT++;
                            }
                            else if(!way && this.newRace.abilitiesBonus.INT > -2){
                                this.points++;
                                this.newRace.abilitiesBonus.INT--;
                            }
                        }break;
                        case 'WIS':{
                            if(way && this.points > 0 && this.newRace.abilitiesBonus.WIS < 2){
                                this.points--;
                                this.newRace.abilitiesBonus.WIS++;
                            }
                            else if(!way && this.newRace.abilitiesBonus.WIS > -2){
                                this.points++;
                                this.newRace.abilitiesBonus.WIS--;
                            }
                        }break;
                        case 'CHR':{
                            if(way && this.points > 0 && this.newRace.abilitiesBonus.CHR < 2){
                                this.points--;
                                this.newRace.abilitiesBonus.CHR++;
                            }
                            else if(!way && this.newRace.abilitiesBonus.CHR > -2){
                                this.points++;
                                this.newRace.abilitiesBonus.CHR--;
                            }
                        }break;
                    default:
                        break;
                }
            },
            addLang: function(){
                if(this.newRace.languages.length < 11) this.newRace.languages.push({'name':''});
            },
            deleteLang: function (index) {
                this.newRace.languages.splice(index, 1);
            },
            addWeapon: function(){
                if(this.newRace.weaponProf.length < 4) this.newRace.weaponProf.push({'name':''});
            },
            deleteWeapon: function (index) {
                this.newRace.weaponProf.splice(index, 1);
            },
            addArmor: function(){
                if(this.newRace.armorProf.length < 4) this.newRace.armorProf.push({'name':''});
            },
            deleteArmor: function (index) {
                this.newRace.armorProf.splice(index, 1);
            },
            addTool: function(){
                if(this.newRace.toolProf.length < 4) this.newRace.toolProf.push({'name':''});
            },
            deleteTool: function (index) {
                this.newRace.toolProf.splice(index, 1);
            },
            addTrait: function(){
                if(this.newRace.traits.length < 12) this.newRace.traits.push({'name':'','description':''});
            },
            deleteTrait: function (index) {
                this.newRace.traits.splice(index, 1);
            },
            finishCreation: function(){
                Vue.axios.post("http://localhost:3000/races",{
                    'name': this.newRace.name,
                    'subraceIds': this.newRace.subraceIds,
                    'abilitiesBonus':{
                        'STR': this.newRace.abilitiesBonus.STR,
                        'CON': this.newRace.abilitiesBonus.CON,
                        'DEX': this.newRace.abilitiesBonus.DEX,
                        'INT': this.newRace.abilitiesBonus.INT,
                        'WIS': this.newRace.abilitiesBonus.WIS,
                        'CHR': this.newRace.abilitiesBonus.CHR,
                    },
                    'speed': this.newRace.speed,
                    'nightVision': this.newRace.nightVision,
                    'damageResistance': this.newRace.damageResistance,
                    'damageImmunity': this.newRace.damageImmunity,
                    
                    'weaponProf': this.newRace.weaponProf,
                    'armorProf': this.newRace.armorProf,
                    'toolProf': this.newRace.toolProf,
                    'languages': this.newRace.languages,

                    'skills': this.newRace.skills,
                    'descriprion': this.newRace.descriprion,
                    'traits': this.newRace.traits,

                    'size': this.newRace.size,
                    'image': this.newRace.image,
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
