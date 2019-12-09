<template>  
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <h3 class="text-center">Dungeons & Dragons Character Creator</h3>
                </div>
                <div class="w-100"></div>
                <!--Name-->
                <div class="col-6">
                    <p>Name</p>
                    <input  class="form-control" type="text" v-model="newChar.name" required>
                </div>
                <!--Player's Name-->
                <div class="col-6">
                    <p>Player's Name</p>
                    <input  class="form-control" type="text" v-model="newChar.descriprion.player" required>
                </div>
                <div class="w-100"></div>
                <!--Race-->
                <div class="col-3">
                    <p>Race</p>
                    <select class="form-control" v-model="selectedRace" v-on:change="calculateS()">
                        <option v-for="(item) in races" v-bind:key="item.id" v-bind:value="item">{{item.name}}</option>
                    </select>
                </div>
                <!--Class-->
                <div class="col-3">
                    <p>Class</p>
                    <select class="form-control" v-model="selectedClass" v-on:change="calculateS()">
                        <option v-for="(item) in classes" v-bind:key="item.id" v-bind:value="item">{{item.name}}</option>
                    </select>
                </div>
                <!--Backgrounds-->
                <div class="col-3">
                    <p>Background</p>
                    <select class="form-control" v-model="selectedBackground" v-on:change="calculateS()">
                        <option v-for="(item) in backgrounds" v-bind:key="item.id" v-bind:value="item">{{item.name}}</option>
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
                <br>
                <div class="col-12 d-flex justify-content-center" v-if="!created">
                    <button class="btn btn-primary" v-on:click="SayMyName()">Generate!</button>
                </div>
                <div class="col-12 row" v-if="created">
                    <!--Abilities-->
                    <div class="col-6">
                        <h5>Abilities</h5>
                        <div class="container-fluid">
                            <div class="row justify-content-center">
                                <!-- STR -->
                                <div class="col-2">
                                    <p class="text-center">STR</p>
                                    <h3 class="text-center">{{STR}}</h3>
                                    <p class="text-center">
                                        <button v-on:click="abilitieChange('STR','<')"><</button>
                                        <button v-on:click="abilitieChange('STR','>')">></button>
                                    </p>
                                    <p class="text-center">mod</p>
                                    <p class="text-center">{{modSTR}}</p>
                                </div>
                                <!-- DEX -->
                                <div class="col-2">
                                    <p class="text-center">DEX</p>
                                    <h3 class="text-center">{{DEX}}</h3>
                                    <p class="text-center">
                                        <button v-on:click="abilitieChange('DEX','<')"><</button>
                                        <button v-on:click="abilitieChange('DEX','>')">></button>
                                    </p>
                                    <p class="text-center">mod</p>
                                    <p class="text-center">{{modDEX}}</p>
                                </div>
                                <!-- CON -->
                                <div class="col-2">
                                    <p class="text-center">CON</p>
                                    <h3 class="text-center">{{CON}}</h3>
                                    <p class="text-center">
                                        <button v-on:click="abilitieChange('CON','<')"><</button>
                                        <button v-on:click="abilitieChange('CON','>')">></button>
                                    </p>
                                    <p class="text-center">mod</p>
                                    <p class="text-center">{{modCON}}</p>
                                </div>
                                <!-- INT -->
                                <div class="col-2">
                                    <p class="text-center">INT</p>
                                    <h3 class="text-center">{{INT}}</h3>
                                    <p class="text-center">
                                        <button v-on:click="abilitieChange('INT','<')"><</button>
                                        <button v-on:click="abilitieChange('INT','>')">></button>
                                    </p>
                                    <p class="text-center">mod</p>
                                    <p class="text-center">{{modINT}}</p>
                                </div>
                                <!-- WIS -->
                                <div class="col-2">
                                    <p class="text-center">WIS</p>
                                    <h3 class="text-center">{{WIS}}</h3>
                                    <p class="text-center">
                                        <button v-on:click="abilitieChange('WIS','<')"><</button>
                                        <button v-on:click="abilitieChange('WIS','>')">></button>
                                    </p>
                                    <p class="text-center">mod</p>
                                    <p class="text-center">{{modWIS}}</p>
                                </div>
                                <!--CHR -->
                                <div class="col-2">
                                    <p class="text-center">CHR</p>
                                    <h3 class="text-center">{{CHR}}</h3>
                                    <p class="text-center">
                                        <button v-on:click="abilitieChange('CHR','<')"><</button>
                                        <button v-on:click="abilitieChange('CHR','>')">></button>
                                    </p>
                                    <p class="text-center">mod</p>
                                    <p class="text-center">{{modCHR}}</p>
                                </div>
                            </div>
                        </div>
                        <p><button class="btn btn-primary" v-on:click="RollAbilities()">Roll</button> Total: {{totalAbilities}}</p>
                    </div> 
                    <!--SaveThrows-->
                    <div class="col-6">
                        <!--Readonly Block-->
                        <div class="container-fluid">
                            <div class="row">
                                    <!--ProfBonus-->
                                    <div class="col-2">
                                        <p>ProfBonus</p>
                                        <input readonly class="form-control" type="text" v-model="profBonus">
                                    </div>
                                    <!--Iniciative-->
                                    <div class="col-2">
                                        <p>Iniciative</p>
                                        <input readonly class="form-control" type="text" v-model="modDEX">
                                    </div>
                                    <!--Speed-->
                                    <div class="col-2">
                                        <p>HP</p>
                                        <h3>1d{{hpDie}}</h3>
                                    </div>
                                    <!--Passive Perception-->
                                    <div class="col-3">
                                        <p>Passive Perception</p>
                                        <input readonly class="form-control" type="text" v-model="passiveWis">
                                    </div>
                                    <!--Speed-->
                                    <div class="col-3">
                                        <p>Speed in ft</p>
                                        <input class="form-control" type="number" v-model="selectedRace.speed" readonly>
                                    </div>
                            </div>
                        </div>
                        <h5>Save Throws</h5>
                        <div class="container-fluid">
                            <div class="row justify-content-center">
                                <!-- STR -->
                                <div class="col-2">
                                    <p class="text-center">STR</p>
                                    <h3 class="text-center">{{saveStr}}</h3>
                                    <h3 class="text-center" v-if="selectedClass.savingThrows.STR">(+)</h3>
                                </div>
                                <!-- DEX -->
                                <div class="col-2">
                                    <p class="text-center">DEX</p>
                                    <h3 class="text-center">{{saveDex}}</h3>
                                    <h3 class="text-center" v-if="selectedClass.savingThrows.DEX">(+)</h3>
                                </div>
                                <!-- CON -->
                                <div class="col-2">
                                    <p class="text-center">CON</p>
                                    <h3 class="text-center">{{saveCon}}</h3>
                                    <h3 class="text-center" v-if="selectedClass.savingThrows.CON">(+)</h3>
                                </div>
                                <!-- STR -->
                                <div class="col-2">
                                    <p class="text-center">INT</p>
                                    <h3 class="text-center">{{saveInt}}</h3>
                                    <h3 class="text-center" v-if="selectedClass.savingThrows.INT">(+)</h3>
                                </div>
                                <!-- STR -->
                                <div class="col-2">
                                    <p class="text-center">WIS</p>
                                    <h3 class="text-center">{{saveWis}}</h3>
                                    <h3 class="text-center" v-if="selectedClass.savingThrows.WIS">(+)</h3>
                                </div>
                                <!-- STR -->
                                <div class="col-2">
                                    <p class="text-center">CHR</p>
                                    <h3 class="text-center">{{saveChr}}</h3>
                                    <h3 class="text-center" v-if="selectedClass.savingThrows.CHR">(+)</h3>
                                </div>
                            </div>
                        </div>
                    </div> 
                    <!-- Skills -->
                    <div class="col-12">
                        <h3>Skills Proficiency</h3>
                        <div class="container-fluid">
                            <div class="row">
                                <div  class="col-1" v-for="(item) in skillsList" v-bind:key="item.id" v-show="item.value">
                                   <h5> {{item.name}} </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--Profincies-->
                    <div class="col-12">
                        <h3 v-if="selectedRace.weaponProf.length >0">Weapon Profincies</h3>
                        <div class="container-fluid">
                            <div class="row">
                                <div  class="col" v-for="(item) in selectedRace.weaponProf" v-bind:key="item.id">
                                   <h5> {{item.name}} </h5>
                                </div>
                            </div>
                        </div>
                        <h3 v-if="selectedRace.armorProf.length >0">Armor Profincies</h3>
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col" v-for="(item) in selectedRace.armorProf" v-bind:key="item.id">
                                   <h5> {{item.name}} </h5>
                                </div>
                            </div>
                        </div>
                        <h3>Tools Profincies</h3>
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col" v-for="(item) in selectedRace.toolProf" v-bind:key="item.id">
                                   <h5> {{item.name}} </h5>
                                </div>
                                <div class="col" v-for="(item) in selectedBackground.proficiencies.tools" v-bind:key="item.id">
                                   <h5> {{item.name}} </h5>
                                </div>
                                <div class="col" v-for="(item) in selectedBackground.proficiencies.musical" v-bind:key="item.id">
                                   <h5> {{item.name}} </h5>
                                </div>
                                <div class="col" v-for="(item) in selectedBackground.proficiencies.gaming" v-bind:key="item.id">
                                   <h5> {{item.name}} </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--Languages-->
                    <div class="col-12">
                        <h3>Languages</h3>
                        <div class="container-fluid">
                            <div class="row">
                                <div  class="col-1" v-for="(item) in selectedRace.languages" v-bind:key="item.id">
                                   <h5> {{item.name}} </h5>
                                </div>
                                <div class="col-1" v-for="(item) in selectedClass.languages" v-bind:key="item.id">
                                   <h5> {{item.name}} </h5>
                                </div>
                                <div class="col-1" v-for="(item) in selectedBackground.languages" v-bind:key="item.id">
                                   <h5> {{item.name}} </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-100"></div>
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
                races:[],classes:[],backgrounds:[], created:false,
                selectedRace:{},selectedClass:{},selectedBackground:{},
                options: [],
                name:'', level:1, aligment:'', xp:0, armor:0, profBonus:2,
                abilities: {
                    STR:8,DEX:8,CON:8,INT:8,WIS:8,CHR:8,
                },
                skillsList: Array(18),
                newChar:{
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
            this.getDataFromServer();
            this.RollAbilities();
        },
        computed:{
            //подсчёт общего значения характеристик персонажа
            totalAbilities: function(){
                return this.STR + this.DEX + this.CON + this.INT + this.WIS + this.CHR;
            },
            //abilities
            STR(){return this.abilities.STR + this.selectedRace.abilitiesBonus.STR},
            DEX(){return this.abilities.DEX + this.selectedRace.abilitiesBonus.DEX},
            CON(){return this.abilities.CON + this.selectedRace.abilitiesBonus.CON},
            INT(){return this.abilities.INT + this.selectedRace.abilitiesBonus.INT},
            WIS(){return this.abilities.WIS + this.selectedRace.abilitiesBonus.WIS},
            CHR(){return this.abilities.CHR + this.selectedRace.abilitiesBonus.CHR},
            //modifiers
            modSTR(){return Math.floor((this.STR - 10)/2);},
            modDEX(){return Math.floor((this.DEX - 10)/2);},
            modCON(){return Math.floor((this.CON - 10)/2);},
            modINT(){return Math.floor((this.INT - 10)/2);},
            modWIS(){return Math.floor((this.WIS - 10)/2);},
            modCHR(){return Math.floor((this.CHR - 10)/2);},
            //savethrows
            saveStr: function(){
                if(this.selectedClass.savingThrows.STR) 
                return this.modSTR + this.profBonus;
                else return this.modSTR;
            },
            saveCon: function(){
                if(this.selectedClass.savingThrows.CON) 
                return this.modCON + this.profBonus;
                else return this.modCON;
            },
            saveDex: function(){
                 if(this.selectedClass.savingThrows.DEX) 
                return this.modDEX + this.profBonus;
                else return this.modDEX;
            },
            saveInt: function(){
                 if(this.selectedClass.savingThrows.INT) 
                return this.modINT + this.profBonus;
                else return this.modINT;
            },
            saveWis: function(){
                 if(this.selectedClass.savingThrows.WIS) 
                return this.modWIS + this.profBonus;
                else return this.modWIS;
            },
            saveChr: function(){
                 if(this.selectedClass.savingThrows.CHR) 
                return this.modCHR + this.profBonus;
                else return this.modCHR;
            },
            passiveWis(){return 10 + this.modWIS},
            hpDie(){return (this.selectedClass.hitDie)},
            
        },
        methods: {
            RollAbilities: function(){
                    this.abilities.STR = this.rollAb();
                    this.abilities.DEX = this.rollAb();
                    this.abilities.CON = this.rollAb();
                    this.abilities.INT = this.rollAb();
                    this.abilities.WIS = this.rollAb();
                    this.abilities.CHR = this.rollAb();
            },
            rollDice: function(dice,mod){
                //количество бросков, кость, модификатор
                return Math.floor(Math.random() * Math.floor(dice)) + 1 + parseInt(mod,10)
                //+1 потому что Math.random() возвращает числа в диапазоне [0,max)
            },
            rollAb(){return this.rollDice(6,0) + this.rollDice(6,0) + this.rollDice(6,0)},
            calculateS(){
                console.log("Calculated SKills")
                for(var i=0;i<this.selectedRace.skills.length;i++){
                    this.skillsList[i]={
                        'name':this.selectedRace.skills[i].skillName,
                        'value':(this.selectedRace.skills[i].value || this.selectedClass.skills[i].value || this.selectedBackground.skills[i].value)
                    }
                }
                console.log( "skillslist =")
                console.log(this.skillsList)
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
                var value;
                if(direction == "<"){
                    switch (i) {
                        case 'STR':
                            value = this.abilities.CHR;
                            this.abilities.CHR = this.abilities.STR;
                            this.abilities.STR = value;
                            break;
                        case 'DEX':
                            value = this.abilities.STR;
                            this.abilities.STR = this.abilities.DEX;
                            this.abilities.DEX = value;
                            break;
                        case 'CON':
                            value = this.abilities.DEX;
                            this.abilities.DEX = this.abilities.CON;
                            this.abilities.CON = value;
                            break;
                        case 'INT':
                            value = this.abilities.CON;
                            this.abilities.CON = this.abilities.INT;
                            this.abilities.INT = value;
                            break;
                        case 'WIS':
                            value = this.abilities.INT;
                            this.abilities.INT = this.abilities.WIS;
                            this.abilities.WIS = value;
                            break;
                        case 'CHR':
                            value = this.abilities.WIS;
                            this.abilities.WIS = this.abilities.CHR;
                            this.abilities.CHR = value;
                            break;
                        default:
                            break;
                    }
                }
                if(direction == ">"){
                    switch (i) {
                        case 'STR':
                            value = this.abilities.DEX;
                            this.abilities.DEX = this.abilities.STR;
                            this.abilities.STR = value;
                            break;
                        case 'DEX':
                            value = this.abilities.CON;
                            this.abilities.CON = this.abilities.DEX;
                            this.abilities.DEX = value;
                            break;
                        case 'CON':
                            value = this.abilities.INT;
                            this.abilities.INT = this.abilities.CON;
                            this.abilities.CON = value;
                            break;
                        case 'INT':
                            value = this.abilities.WIS;
                            this.abilities.WIS = this.abilities.INT;
                            this.abilities.INT = value;
                            break;
                        case 'WIS':
                            value = this.abilities.CHR;
                            this.abilities.CHR = this.abilities.WIS;
                            this.abilities.WIS = value;
                            break;
                        case 'CHR':
                            value = this.abilities.STR;
                            this.abilities.STR = this.abilities.CHR;
                            this.abilities.CHR = value;
                            break;
                        default:
                            break;
                    }
                }
            },
            getDataFromServer(){
                Vue.axios.get("http://localhost:3000/races/").then((response) =>{
                    console.log("races");
                    console.log(response.data);
                    this.races = response.data;
                })
                Vue.axios.get("http://localhost:3000/classes/").then((response) =>{
                    console.log("classes");
                    console.log(response.data)
                    this.classes = response.data;
                }, (reject) =>{
                    console.log(id)
                })
                Vue.axios.get("http://localhost:3000/backgrounds/").then((response) =>{
                    console.log("backgrounds");
                    console.log(response.data)
                    this.backgrounds = response.data;
                }, (reject) =>{
                    console.log(id)
                })
            },
            SayMyName(){
                this.created=true;
                console.log(this.selectedRace)
                console.log(this.selectedClass)
                console.log(this.selectedBackground)
            }
        
        },
    }
</script>

<style>
            
</style>
