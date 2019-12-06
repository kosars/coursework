<template>  
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <h3 class="text-center">Dungeons & Dragons Class Builder</h3>
                </div>
                <div class="w-100"></div>
                <!--Name-->
                <div class="col-12 col-md-4">
                    <p>Name</p>
                    <input  class="form-control" type="text" v-model="newClass.name" required>
                </div>
                <!--Source-->
                <div class="col-12 col-md-4">
                    <p>Source</p>
                    <input  class="form-control" type="text" v-model="newClass.source" required>
                </div>
                <!--Selectors-->
                <div class="col-12 col-md-4 d-flex align-items-center">
                    <div class="col-4">
                        <p>Hit Die</p>
                        <select class="form-control" v-model="newClass.hitDie">
                            <option value="6">6</option>
                            <option value="8">8</option>
                            <option value="10">10</option>
                            <option value="12">12</option>
                        </select>
                    </div>
                    <div class="col-4">
                        <p>Spell slots?</p>
                        <input type="checkbox" class="form-control" v-model="newClass.spellcast">
                    </div>
                    <div class="col-4" v-if="newClass.spellcast">
                        <p>Spell Ability</p>
                        <select class="form-control" v-model="newClass.spellcastAbility">
                            <option value="">STR</option>
                            <option value="">DEX</option>
                            <option value="">CON</option>
                            <option value="">INT</option>
                            <option value="">WIS</option>
                            <option value="">CHR</option>
                        </select>
                    </div>
                </div>
                <!--Save Throws-->
                <div class="col-12">
                    <h5>Save Throws</h5>
                    <div class="col-12 d-flex">
                        <div class="col-1 d-flex">
                            <input type="checkbox" v-model="newClass.savingThrows.STR">
                            <p>STR</p>
                        </div>
                        <div class="col-1 d-flex">
                            <input type="checkbox" v-model="newClass.savingThrows.DEX">
                            <p>DEX</p>
                        </div>
                        <div class="col-1 d-flex">
                            <input type="checkbox" v-model="newClass.savingThrows.CON">
                            <p>CON</p>
                        </div>
                        <div class="col-1 d-flex">
                            <input type="checkbox" v-model="newClass.savingThrows.INT">
                            <p>INT</p>
                        </div>
                        <div class="col-1 d-flex">
                            <input type="checkbox" v-model="newClass.savingThrows.WIS">
                            <p>WIS</p>
                        </div>
                        <div class="col-1 d-flex">
                            <input type="checkbox" v-model="newClass.savingThrows.CHR">
                            <p>CHR</p>
                        </div>
                    </div>
                </div>
                <!--Skills-->
                <div class="col-12">
                    <h5>Skill Proficiency</h5>
                    <div class="container-fluid">
                        <div class="row">
                            <div  v-for="(item) in newClass.skills" v-bind:key="item.id">
                                <div class="col d-flex">
                                    <input type="checkbox" v-model="item.value">
                                    <p>  {{item.skillName}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12" v-if="newClass.spellcast"><h5>Spells</h5></div>
                <!--Weapon-->
                <!-- <div class="col-12">
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
                </div> -->
                <!--Armor-->
                <!-- <div class="col-12">
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
                </div> -->
                <!--Tools-->
                <!-- <div class="col-12">
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
                </div> -->
                <!--Traits-->
                <div class="col-12"> 
                     <div class="container-fluid">
                        <div class="row">
                            <div class="col-2">
                                <h5>Traits</h5>
                                <button class="btn btn-primary" v-on:click="addTrait()">Add</button>
                            </div>
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-12" v-for="(item,index) in newClass.traits" v-bind:key="item.id">
                                        <div class="col-12 text-center">
                                            <h5>Trait {{index + 1}}</h5>
                                        </div>
                                        <div class="col-12 d-flex d-row">
                                            <div class="col-2">
                                                <h5>Name</h5>
                                            </div>
                                            <div class="col-10 col-md-4 d-flex d-row">
                                                <input class="form-control" type="text" v-model="newClass.traits[index].name">
                                                <button class="btn btn-danger" v-on:click="deleteTrait(index)">X</button>
                                            </div>
                                        </div>
                                        <div class="col-12 d-flex d-row">
                                            <div class="col-2">
                                                <h5>Description</h5>
                                            </div>
                                            <div class="col-10">
                                                <input class="form-control" type="text" v-model="newClass.traits[index].description">
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
                    <input  class="form-control" type="text" v-model="newClass.image">
                </div>
                <!--Description-->
                <div class="col-12">
                    <p>Description</p>
                    <textarea  class="form-control" type="text" v-model="newClass.descriprion" rows="6"></textarea>
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
    import Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'

    Vue.use(VueAxios,axios)
    export default {
        data: function() {
            return{
                //options: [],
                points:2,
                skillPoints:2,
                newClass:{
                    'name': '',
                    'source':'Homebrew',
                    'hitDie':8,
                    'savingThrows':{
                        'STR':false,
                        'CON':false,
                        'DEX':false,
                        'INT':false,
                        'WIS':false,
                        'CHR':false,
                    },
                    //'abilityIncLevel':[],
                    'spellcast':false,
                    'spellcastAbility':'CHR',
                    //'firstSpellLvl':1,
                    'spells':[],
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
        },
        computed:{
          skillChoosed: function(){ 
            for(var i=0;i< this.newClass.skills.length; i++){
                if(this.newClass.skills[i].value) return true;
            }
            return false  
          },
        },
        methods: {
            addLang: function(){
                if(this.newClass.languages.length < 11) this.newClass.languages.push({'name':''});
            },
            deleteLang: function (index) {
                this.newClass.languages.splice(index, 1);
            },
            addWeapon: function(){
                if(this.newClass.weaponProf.length < 4) this.newClass.weaponProf.push({'name':''});
            },
            deleteWeapon: function (index) {
                this.newClass.weaponProf.splice(index, 1);
            },
            addArmor: function(){
                if(this.newClass.armorProf.length < 4) this.newClass.armorProf.push({'name':''});
            },
            deleteArmor: function (index) {
                this.newClass.armorProf.splice(index, 1);
            },
            addTool: function(){
                if(this.newClass.toolProf.length < 4) this.newClass.toolProf.push({'name':''});
            },
            deleteTool: function (index) {
                this.newClass.toolProf.splice(index, 1);
            },
            addTrait: function(){
                if(this.newClass.traits.length < 12) this.newClass.traits.push({'name':'','description':''});
            },
            deleteTrait: function (index) {
                this.newClass.traits.splice(index, 1);
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
