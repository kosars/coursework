<template>  
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <h3 class="text-center">Dungeons & Dragons Character Creator</h3>
                </div>
                <div class="w-100"></div>
                <!--Name-->
                <div class="col-3">
                    <p>Name</p>
                    <input  class="form-control" type="text" v-model="newChar.name" required>
                </div>
                <!--Player's Name-->
                <div class="col-3">
                    <p>Player's Name</p>
                    <input  class="form-control" type="text" v-model="newChar.descriprion.player" required>
                </div>
                <!--Level-->
                <div class="col-3">
                    <p>Level</p>
                    <input  class="form-control" type="number" v-model="newChar.level" min="1" max="30" required>
                </div>
                <!--Expirience-->
                <div class="col-3">
                    <p>Expirience</p>
                    <input  class="form-control" type="number" v-model="newChar.xp" min="0" required>
                </div>
                <div class="w-100"></div>
                <!--Race-->
                <div class="col-3">
                    <p>Race</p>
                    <select class="form-control" v-model="newChar.race">
                        <option v-for="(item) in options.races" v-bind:key="item.id">{{item}}</option>
                    </select>
                </div>
                <!--Class-->
                <div class="col-3">
                    <p>Class</p>
                    <select class="form-control" v-model="newChar.class">
                        <option v-for="(item) in options.classes" v-bind:key="item.id">{{item}}</option>
                    </select>
                </div>
                <!--Backgrounds-->
                <div class="col-3">
                    <p>Background</p>
                    <select class="form-control" v-model="newChar.background">
                        <option v-for="(item) in options.backgrounds" v-bind:key="item.id">{{item}}</option>
                    </select>
                </div>
                <!--Aligment-->
                <div class="col-3">
                    <p>Aligment</p>
                    <select class="form-control" v-model="newChar.aligment">
                        <option v-for="(item) in options.aligments" v-bind:key="item.id">{{item}}</option>
                    </select>
                </div>
                <div class="w-100"></div>
                <!--Abilities-->
                <div class="col-6">
                    <h5>Abilities</h5>
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-2" v-for="(item, index) in newChar.abilities" v-bind:key="item.id">
                                <p class="text-center">{{item.name}}</p>
                                <h3 class="text-center">{{item.value}}</h3>
                                <p class="text-center">
                                    <button v-on:click="abilitieChange(index,'<')"><</button>
                                    <button v-on:click="abilitieChange(index,'>')">></button>
                                </p>
                                <p class="text-center">mod</p>
                                <p class="text-center">{{item.mod}}</p>
                            </div>
                        </div>
                    </div>
                    <p><button class="btn btn-primary" v-on:click="RollAbilities()">Roll</button> Total: {{totalAbilities}}</p>
                </div>
                <!--Saving Throws-->
                <div class="col-6">
                    <h5>Saving Throws</h5>
                    <div class="container-fluid">
                        <div class="row">
                            <!-- <div class="col-2" v-for="(item) in newChar.saveThrows" v-bind:key="item.id">
                                <p><input type="checkbox" v-model="item.learned"> {{item.name}}</p>
                                <h3>{{throwStr}}</h3>
                            </div> -->
                            <div class="col-2">
                                <p>
                                    <input type="checkbox" v-model="newChar.saveThrows[0].learned" disabled> 
                                    {{newChar.saveThrows[0].name}}
                                </p>
                                <h3>{{throwStr}}</h3>
                            </div>
                            <div class="col-2">
                                <p>
                                    <input type="checkbox" v-model="newChar.saveThrows[1].learned" disabled> 
                                    {{newChar.saveThrows[1].name}}
                                </p>
                                <h3>{{throwCon}}</h3>
                            </div>
                            <div class="col-2">
                                <p>
                                    <input type="checkbox" v-model="newChar.saveThrows[2].learned" disabled> 
                                    {{newChar.saveThrows[2].name}}
                                </p>
                                <h3>{{throwDex}}</h3>
                            </div>
                            <div class="col-2">
                                <p>
                                    <input type="checkbox" v-model="newChar.saveThrows[3].learned" disabled> 
                                    {{newChar.saveThrows[3].name}}
                                </p>
                                <h3>{{throwInt}}</h3>
                            </div>
                            <div class="col-2">
                                <p>
                                    <input type="checkbox" v-model="newChar.saveThrows[4].learned" disabled> 
                                    {{newChar.saveThrows[4].name}}
                                </p>
                                <h3>{{throwWis}}</h3>
                            </div>
                            <div class="col-2">
                                <p>
                                    <input type="checkbox" v-model="newChar.saveThrows[5].learned" disabled> 
                                    {{newChar.saveThrows[5].name}}
                                </p>
                                <h3>{{throwChr}}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <!--Readonly Block-->
                <div class="col-1">
                    <h5> </h5>
                    <!--ProfBonus-->
                    <p>ProfBonus</p>
                    <input readonly class="form-control" type="text" v-model="newChar.profBonus">
                    <!--ArmorClass-->
                    <p>Armor Class</p>
                    <input readonly class="form-control" type="text" v-model="newChar.armor">
                    <!--Iniciative-->
                    <p>Iniciative</p>
                    <input readonly class="form-control" type="text" v-model="newChar.abilities[2].mod">
                    <p>Passive Perception</p>
                    <input readonly class="form-control" type="text" v-model="newChar.passiveWis">
                    <!--Speed-->
                    <p>Speed in ft</p>
                    <input class="form-control" type="number" v-model="newChar.speed" min="0" max="100" step="5" >
                </div>
                <!--HP-->
                <div class="col-2">
                    <h5>HP</h5>
                    <div class="container">
                        <div class="row">
                            <div class="col-7">
                                <p>Die Counts</p>
                                <input class="form-control" type="number" v-model="newChar.hp.dieCounts" min="1" max="20">
                            </div>
                            <div class="col-5">
                                <p>Die</p>
                                <select class="form-control" v-model="newChar.hp.die">
                                    <option v-for="(item) in options.dieList" v-bind:key="item.id">{{item}}</option>
                                </select>
                            </div>
                            <div class="col">
                                <p>MaxHP</p>
                                <input class="form-control" type="number" v-model="newChar.hp.max" min="0" max="17" value="0" readonly>
                            </div>
                        </div>
                    </div>
                </div>
                <!--Skills-->
                <div class="col">
                    <h5>Skills</h5>
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-2" v-for="(item) in newChar.skills" v-bind:key="item.id">
                                <p><input type="checkbox" v-model="item.learned"> {{item.name}}</p>
                                <p>({{item.depended}})</p>
                                <input class="form-control" type="number" v-model="item.value" readonly>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-100"></div>
                <!--Languages-->
                <div class="col-12">
                    <p>Languages</p>
                    <input  class="form-control" type="text" v-model="newChar.languages" required>
                </div>
                <!--Sex-->
                <div class="col-1">
                    <p>Sex</p>
                    <select  class="form-control" type="text" v-model="newChar.descriprion.sex" required>
                        <option>Man</option>
                        <option>Woman</option>
                        <option>None of that</option>
                    </select>
                </div>
                <!--Age-->
                <div class="col-1">
                    <p>Age</p>
                    <input  class="form-control" type="number" v-model="newChar.descriprion.age" min="1" max="1000" required>
                </div>
                <!--Height-->
                <div class="col-1">
                    <p>Height</p>
                    <input  class="form-control" type="number" v-model="newChar.descriprion.height" min="1" max="1000" required>
                </div>
                <!--Weight-->
                <div class="col-1">
                    <p>Weight</p>
                    <input  class="form-control" type="number" v-model="newChar.descriprion.weight" min="1" max="1000" required>
                </div>
                <!--Description-->
                <div class="col-12">
                    <p>Description / Backstory</p>
                    <textarea  class="form-control" type="text" v-model="newChar.descriprion.backstory" rows="6"></textarea>
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
    import mCreatorData from '../data/cCreatorData.js'

    Vue.use(VueAxios,axios)
    export default {
        data: function() {
            return{
                options: [],
                newChar:{
                    name:'',class: '', level:1, race: '', background:'', aligment:'', 
                    xp:0, armor:0, speed:30, profBonus:2,
                    abilities: [
                        {'name' : 'STR','value' : 8,'mod' : 0},
                        {'name' : 'CON','value' : 8,'mod' : 0},
                        {'name' : 'DEX','value' : 8,'mod' : 0},
                        {'name' : 'INT','value' : 8,'mod' : 0},
                        {'name' : 'WIS','value' : 8,'mod' : 0},
                        {'name' : 'CHR','value' : 8,'mod' : 0},
                    ],
                    saveThrows: [
                        {'name' : 'STR','learned' : false},
                        {'name' : 'CON','learned' : false},
                        {'name' : 'DEX','learned' : false},
                        {'name' : 'INT','learned' : false},
                        {'name' : 'WIS','learned' : false},
                        {'name' : 'CHR','learned' : false},
                    ],
                    skills: [
                        {'name' : 'Athletics', 'depended':'STR','value' : 0,'learned' : false},
                        {'name' : 'Acrobatics', 'depended':'DEX','value' : 0,'learned' : false},
                        {'name' : 'Sleight of Hand', 'depended':'DEX','value' : 0,'learned' : false},
                        {'name' : 'Stealth', 'depended':'DEX','value' : 0,'learned' : false},
                        {'name' : 'Arcana', 'depended':'INT','value' : 0,'learned' : false},
                        {'name' : 'History', 'depended':'INT','value' : 0,'learned' : false},
                        {'name' : 'Investigation', 'depended':'INT','value' : 0,'learned' : false},
                        {'name' : 'Nature', 'depended':'INT','value' : 0,'learned' : false},
                        {'name' : 'Religion', 'depended':'INT','value' : 0,'learned' : false},
                        {'name' : 'Animal Handling', 'depended':'WIS','value' : 0,'learned' : false},
                        {'name' : 'Insight', 'depended':'WIS','value' : 0,'learned' : false},
                        {'name' : 'Medicine', 'depended':'WIS','value' : 0,'learned' : false},
                        {'name' : 'Perception', 'depended':'WIS','value' : 0,'learned' : false},
                        {'name' : 'Survival', 'depended':'WIS','value' : 0,'learned' : false},
                        {'name' : 'Deception', 'depended':'CHR','value' : 0,'learned' : false},
                        {'name' : 'Intimidation', 'depended':'CHR','value' : 0,'learned' : false},
                        {'name' : 'Performance', 'depended':'CHR','value' : 0,'learned' : false},
                        {'name' : 'Persuation', 'depended':'CHR','value' : 0,'learned' : false},
                    ],
                    passiveWis:0,
                    hp: {
                        dieCounts:1, die:0, max:0,
                    },
                    languages:[],
                    weaponProf:[],
                    armorProf:[],
                    descriprion:{
                        player:'okay',
                        age:0,
                        sex:'okay',
                        height:0,
                        weight:0,
                        hairColor:'okay',
                        eyeColor:'okay',
                        skinColor:'okay',
                        personalityTrait1:'okay',
                        personalityTrait2:'okay',
                        ideals:'okay',
                        bonds:'okay',
                        flaws:'okay',
                        image:'okay',
                        backstory:'okay',
                    }
                }
            }
        },
        mounted: function(){
            this.options = mCreatorData;
            this.RollAbilities();
        },
        computed:{
            //подсчёт общего значения характеристик персонажа
            totalAbilities: function(){
                var sum = 0;
                for(var i = 0; i< this.newChar.abilities.length; i++)
                   sum += this.newChar.abilities[i].value;
                return sum;
            },
            
            throwStr: function(){
                if(this.newChar.saveThrows[0].learned) 
                return this.newChar.abilities[0].mod + this.newChar.profBonus;
                else return this.newChar.abilities[0].mod;
            },
            throwCon: function(){
                if(this.newChar.saveThrows[1].learned) 
                return this.newChar.abilities[1].mod + this.newChar.profBonus;
                else return this.newChar.abilities[1].mod;
            },
            throwDex: function(){
                if(this.newChar.saveThrows[2].learned) 
                return this.newChar.abilities[2].mod + this.newChar.profBonus;
                else return this.newChar.abilities[2].mod;
            },
            throwInt: function(){
                if(this.newChar.saveThrows[3].learned) 
                return this.newChar.abilities[3].mod + this.newChar.profBonus;
                else return this.newChar.abilities[3].mod;
            },
            throwWis: function(){
                if(this.newChar.saveThrows[4].learned) 
                return this.newChar.abilities[4].mod + this.newChar.profBonus;
                else return this.newChar.abilities[4].mod;
            },
            throwChr: function(){
                if(this.newChar.saveThrows[5].learned) 
                return this.newChar.abilities[5].mod + this.newChar.profBonus;
                else return this.newChar.abilities[5].mod;
            },
            
        },
        methods: {
            RollAbilities: function(){
                for(var i = 0; i< this.newChar.abilities.length; i++){
                    this.newChar.abilities[i].value = this.rollDice(6,0) + this.rollDice(6,0) + this.rollDice(6,0);
                    this.newChar.abilities[i].mod = Math.floor((this.newChar.abilities[i].value - 10)/2);
                } 
            },
            rollDice: function(dice,mod){
                //количество бросков, кость, модификатор
                return Math.floor(Math.random() * Math.floor(dice)) + 1 + parseInt(mod,10)
                //+1 потому что Math.random() возвращает числа в диапазоне [0,max)
            },
            finishCreation: function(){
                Vue.axios.post("http://localhost:3000/chars",{
                    'name': this.newChar.name,
                    'class': this.newChar.class,
                    'race': this.newChar.race,
                    'background': this.newChar.background,
                    'aligment': this.newChar.aligment,
                    'level': this.newChar.level,
                    'xp': this.newChar.xp,
                    'hpDice': this.newChar.hp.die,
                    'armor': this.newChar.armor,
                    'speed': this.newChar.speed,
                    'profBonus': this.newChar.profBonus,
                    //abilities
                    'STR': this.newChar.abilities[0].value,
                    'CON': this.newChar.abilities[1].value,
                    'DEX': this.newChar.abilities[2].value,
                    'INT': this.newChar.abilities[3].value,
                    'WIS': this.newChar.abilities[4].value,
                    'CHR': this.newChar.abilities[5].value,
                    // 'saveThrows': this.newChar.saveThrows,
                    // 'skills': this.newChar.skills,
                    //'languages': this.newChar.languages,
                    // 'weaponProf': this.newChar.weaponProf,
                    // 'armorProf': this.newChar.armorProf,
                    // 'descriprion':this.newChar.descriprion,
                }).then((responce) => {
                    console.log(responce.data)
                    this.$router.push('/')
                })
            },
            abilitieChange:function(i,direction){
                var value, mod;
                value = this.newChar.abilities[i].value;
                mod = this.newChar.abilities[i].mod;
                if(direction == ">"){
                    this.newChar.abilities[i].value = this.newChar.abilities[i+1].value;
                    this.newChar.abilities[i].mod = this.newChar.abilities[i+1].mod;
                    this.newChar.abilities[i+1].value = value;
                    this.newChar.abilities[i+1].mod = mod;
                }
                if(direction == "<"){
                    this.newChar.abilities[i].value = this.newChar.abilities[i-1].value;
                    this.newChar.abilities[i].mod = this.newChar.abilities[i-1].mod;
                    this.newChar.abilities[i-1].value = value;
                    this.newChar.abilities[i-1].mod = mod;
                }
            },
        
        
        },
    }
</script>

<style>
            
</style>
