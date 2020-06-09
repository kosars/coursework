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
                    <input  class="form-control" type="text" v-model="name" required>
                </div>
                <!--Player's Name-->
                <div class="col-6">
                    <p>Player's Name</p>
                    <input readonly class="form-control" type="text" v-model="player" required>
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
                    <select class="form-control" v-model="aligment">
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
                                        <button class="btn btn-primary"  v-on:click="abilitieChange('STR','<')"><</button>
                                        <button class="btn btn-primary"  v-on:click="abilitieChange('STR','>')">></button>
                                    </p>
                                    <p class="text-center">mod</p>
                                    <p class="text-center">{{modSTR}}</p>
                                </div>
                                <!-- DEX -->
                                <div class="col-2">
                                    <p class="text-center">DEX</p>
                                    <h3 class="text-center">{{DEX}}</h3>
                                    <p class="text-center">
                                        <button class="btn btn-primary"  v-on:click="abilitieChange('DEX','<')"><</button>
                                        <button class="btn btn-primary"  v-on:click="abilitieChange('DEX','>')">></button>
                                    </p>
                                    <p class="text-center">mod</p>
                                    <p class="text-center">{{modDEX}}</p>
                                </div>
                                <!-- CON -->
                                <div class="col-2">
                                    <p class="text-center">CON</p>
                                    <h3 class="text-center">{{CON}}</h3>
                                    <p class="text-center">
                                        <button class="btn btn-primary"  v-on:click="abilitieChange('CON','<')"><</button>
                                        <button class="btn btn-primary"  v-on:click="abilitieChange('CON','>')">></button>
                                    </p>
                                    <p class="text-center">mod</p>
                                    <p class="text-center">{{modCON}}</p>
                                </div>
                                <!-- INT -->
                                <div class="col-2">
                                    <p class="text-center">INT</p>
                                    <h3 class="text-center">{{INT}}</h3>
                                    <p class="text-center">
                                        <button class="btn btn-primary"  v-on:click="abilitieChange('INT','<')"><</button>
                                        <button class="btn btn-primary"  v-on:click="abilitieChange('INT','>')">></button>
                                    </p>
                                    <p class="text-center">mod</p>
                                    <p class="text-center">{{modINT}}</p>
                                </div>
                                <!-- WIS -->
                                <div class="col-2">
                                    <p class="text-center">WIS</p>
                                    <h3 class="text-center">{{WIS}}</h3>
                                    <p class="text-center">
                                        <button class="btn btn-primary"  v-on:click="abilitieChange('WIS','<')"><</button>
                                        <button class="btn btn-primary"  v-on:click="abilitieChange('WIS','>')">></button>
                                    </p>
                                    <p class="text-center">mod</p>
                                    <p class="text-center">{{modWIS}}</p>
                                </div>
                                <!--CHR -->
                                <div class="col-2">
                                    <p class="text-center">CHR</p>
                                    <h3 class="text-center">{{CHR}}</h3>
                                    <p class="text-center">
                                        <button class="btn btn-primary" v-on:click="abilitieChange('CHR','<')"><</button>
                                        <button class="btn btn-primary" v-on:click="abilitieChange('CHR','>')">></button>
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
                        <table class="table table-hover" v-show="skillsList">
                            <thead class="thead-dark" v-on:click="skillShow = !skillShow">
                                <tr>
                                    <th scope="col">Skills Proficiency</th>
                                </tr>
                            </thead>
                                <tbody v-show="skillShow">
                                    <tr v-for="(item) in skillsList" v-bind:key="item._id" v-show="item.value">
                                        <td>{{item.name}}</td>
                                    </tr>
                                </tbody>
                        </table>
                    </div>
                    <!-- Spells -->
                    <div class="col-12">
                        <table class="table table-hover">
                            <thead class="thead-dark" v-on:click="spellShow = !spellShow">
                                <tr>
                                    <th scope="col">Spells</th>
                                </tr>
                            </thead>
                                <tbody v-show="spellShow">
                                    <tr v-for="(item) in selectedClass.spells" v-bind:key="item._id">
                                        <td>
                                            <router-link v-bind:to="'/spells/'+item.spellid" v-if="item.ritual">
                                                {{ item.name }} (Ritual)
                                            </router-link>
                                            <router-link v-bind:to="'/spells/'+item.spellid" v-if="!item.ritual">
                                                {{ item.name }}
                                            </router-link>
                                        </td>
                                    </tr>
                                </tbody>
                        </table>
                    </div>
                    <!--Profincies-->
                    <div class="col-12">
                        <table class="table table-hover" v-show="selectedRace.weaponProf.length >0">
                            <thead class="thead-dark" v-on:click="weaponProfShow = !weaponProfShow">
                                <tr>
                                    <th scope="col">Weapon Profincies</th>
                                </tr>
                            </thead>
                                <tbody v-show="weaponProfShow">
                                    <tr v-for="(item) in selectedRace.weaponProf" v-bind:key="item.id">
                                        <td>{{item.name}}</td>
                                    </tr>
                                </tbody>
                        </table>
                        <table class="table table-hover" v-show="selectedRace.armorProf.length >0">
                            <thead class="thead-dark" v-on:click="armorProfShow = !armorProfShow">
                                <tr>
                                    <th scope="col">Armor Profincies</th>
                                </tr>
                            </thead>
                                <tbody v-show="armorProfShow">
                                    <tr v-for="(item) in selectedRace.armorProf" v-bind:key="item.id">
                                        <td>{{item.name}}</td>
                                    </tr>
                                </tbody>
                        </table>
                        <table class="table table-hover">
                            <thead class="thead-dark" v-on:click="toolProfShow = !toolProfShow">
                                <tr>
                                    <th scope="col">Tool Profincies</th>
                                </tr>
                            </thead>
                                <tbody v-show="toolProfShow">
                                    <tr v-for="(item) in selectedRace.toolProf" v-bind:key="item.id">
                                        <td>{{item.name}}</td>
                                    </tr>
                                    <tr v-for="(item) in selectedBackground.proficiencies.tools" v-bind:key="item.id">
                                        <td>{{item.name}}</td>
                                    </tr>
                                    <tr v-for="(item) in selectedBackground.proficiencies.musical" v-bind:key="item.id">
                                        <td>{{item.name}}</td>
                                    </tr>
                                    <tr v-for="(item) in selectedBackground.proficiencies.gaming" v-bind:key="item.id">
                                        <td>{{item.name}}</td>
                                    </tr>
                                </tbody>
                        </table>
                        <!-- <h3 v-if="selectedRace.weaponProf.length >0">Weapon Profincies</h3>
                        <div class="container-fluid">
                            <div class="row">
                                <div  class="col" v-for="(item) in selectedRace.weaponProf" v-bind:key="item.id">
                                   <h5> {{item.name}} </h5>
                                </div>
                            </div>
                        </div> -->
                        <!-- <h3 v-if="selectedRace.armorProf.length >0">Armor Profincies</h3>
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col" v-for="(item) in selectedRace.armorProf" v-bind:key="item.id">
                                   <h5> {{item.name}} </h5>
                                </div>
                            </div>
                        </div> -->
                        <!-- <h3>Tools Profincies</h3>
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
                        </div> -->
                    </div>
                    <!--Languages-->
                    <div class="col-12">
                        <table class="table table-hover">
                            <thead class="thead-dark" v-on:click="langShow = !langShow">
                                <tr>
                                    <th scope="col">Languages</th>
                                </tr>
                            </thead>
                                <tbody v-show="langShow">
                                    <tr v-for="(item) in selectedRace.languages" v-bind:key="item.id">
                                        <td>{{item.name}}</td>
                                    </tr>
                                    <tr v-for="(item) in selectedClass.languages" v-bind:key="item.id">
                                        <td>{{item.name}}</td>
                                    </tr>
                                    <tr v-for="(item) in selectedBackground.languages" v-bind:key="item.id">
                                        <td>{{item.name}}</td>
                                    </tr>
                                </tbody>
                        </table>
                        <!-- <h3>Languages</h3>
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
                        </div> -->
                    </div>
                </div>
                <div class="w-100"></div>
                <!--Sex-->
                <div class="col-1">
                    <p>Sex</p>
                    <select  class="form-control" type="text" v-model="sex" required>
                        <option>Man</option>
                        <option>Woman</option>
                        <option>None of that</option>
                    </select>
                </div>
                <!--Age-->
                <div class="col-1">
                    <p>Age</p>
                    <input  class="form-control" type="number" v-model="age" min="1" max="1000" required>
                </div>
                <!--Height-->
                <div class="col-1">
                    <p>Height</p>
                    <input  class="form-control" type="number" v-model="height" min="1" max="1000" required>
                </div>
                <!--Weight-->
                <div class="col-1">
                    <p>Weight</p>
                    <input  class="form-control" type="number" v-model="weight" min="1" max="1000" required>
                </div>
                <!--Traits-->
                <div class="col-12">
                     
                     <div class="container-fluid">
                        <div class="row">
                            <div class="col-12 d-flex align-items-center">
                                <h3 class="mr-auto p-2">Personality Traits</h3>
                                <button class="btn btn-primary p-2" v-on:click="addItem(personalityTraits)">Add</button>
                            </div>
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-12" v-for="(item,index) in personalityTraits" v-bind:key="item.id">
                                        <div class="col-12 text-center">
                                            <h5>Personality Trait {{index + 1}}</h5>
                                        </div>
                                        <div class="col-12 d-flex d-row">
                                            <div class="col-2">
                                                <h5>Name</h5>
                                            </div>
                                            <div class="col-10 col-md-4 d-flex d-row">
                                                <input class="form-control" type="text" v-model="personalityTraits[index].name">
                                                <button class="btn btn-danger" v-on:click="deleteItem(personalityTraits,index)">X</button>
                                            </div>
                                        </div>
                                        <div class="col-12 d-flex d-row">
                                            <div class="col-2">
                                                <h5>Description</h5>
                                            </div>
                                            <div class="col-10">
                                                <input class="form-control" type="text" v-model="personalityTraits[index].description">
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
                    <input  class="form-control" type="text" v-model="image">
                </div>
                <!--Description-->
                <div class="col-12">
                    <p>Description / Backstory</p>
                    <textarea  class="form-control" type="text" v-model="backstory" rows="6"></textarea>
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
                spellShow:false, skillShow:false, weaponProfShow:false, armorProfShow:false, toolProfShow:false, langShow:false,
                races:[],classes:[],backgrounds:[], created:false,
                selectedRace:{},selectedClass:{},selectedBackground:{},
                options: [],
                name:'', level:1, aligment:'', xp:0, armor:0, profBonus:2,
                player:'',
                abilities: {
                    STR:8,DEX:8,CON:8,INT:8,WIS:8,CHR:8,
                },
                skillsList: Array(18),
                age:0,
                sex:'',
                height:0,
                weight:0,
                personalityTraits:[],
                image:'',
                backstory:'',
            }
        },
        mounted: function(){
            this.player = this.$store.getters.getCurrUser;
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
                for(var i=0;i<this.selectedRace.skills.length;i++){
                    this.skillsList[i]={
                        'name':this.selectedRace.skills[i].skillName,
                        'value':(this.selectedRace.skills[i].value || this.selectedClass.skills[i].value || this.selectedBackground.skills[i].value)
                    }
                }
            },
            returnLangs(){
                var langs = [];
                this.selectedRace.languages.forEach(element => {
                    langs.push({'name':element.name});
                });
                this.selectedBackground.languages.forEach(element => {
                    langs.push({'name':element.name});
                });
                return langs;
            },
            returnTools(){
                var tools = [];
                this.selectedRace.toolProf.forEach(element => {
                    tools.push({'name':element.name});
                });
                this.selectedBackground.proficiencies.tools.forEach(element => {
                    tools.push({'name':element.name});
                });
                this.selectedBackground.proficiencies.musical.forEach(element => {
                    tools.push({'name':element.name});
                });
                this.selectedBackground.proficiencies.gaming.forEach(element => {
                    tools.push({'name':element.name});
                });
                this.selectedBackground.proficiencies.other.forEach(element => {
                    tools.push({'name':element.name});
                });
                return tools;
            },
            finishCreation: function(){
                if(this.created) Vue.axios.post("http://localhost:3000/chars",{
                    'name': this.name,
                    'source':this.player,
                    'class': {
                        'name':this.selectedClass.name,
                        'classId':this.selectedClass._id},
                    'race': {
                        'name':this.selectedRace.name,
                        'raceId':this.selectedRace._id},
                    'background': {
                        'name':this.selectedBackground.name,
                        'backgroundId':this.selectedBackground._id},
                    'aligment': this.aligment,
                    'level': this.level,
                    'xp': this.xp,
                    'hpDice': this.selectedClass.hitDie,
                    'armor': this.armor,
                    'speed': this.selectedRace.speed,
                    'profBonus': this.profBonus,
                    //abilities
                    'STR':this.STR,
                    'DEX':this.DEX,
                    'CON':this.CON,
                    'INT':this.INT,
                    'WIS':this.WIS,
                    'CHR':this.CHR,
                    //saveThrows
                    'saveThrows': [
                        {'name' : 'STR', 'value':this.saveStr,'prof' : this.selectedClass.savingThrows.STR},
                        {'name' : 'DEX', 'value':this.saveDex,'prof' : this.selectedClass.savingThrows.DEX},
                        {'name' : 'CON', 'value':this.saveCon,'prof' : this.selectedClass.savingThrows.CON},
                        {'name' : 'INT', 'value':this.saveInt,'prof' : this.selectedClass.savingThrows.INT},
                        {'name' : 'WIS', 'value':this.saveWis,'prof' : this.selectedClass.savingThrows.WIS},
                        {'name' : 'CHR', 'value':this.saveChr,'prof' : this.selectedClass.savingThrows.CHR},
                    ],
                    //skills
                    'skills': this.skillsList,
                    'languages':this.returnLangs(),
                    'weaponProf':this.selectedRace.weaponProf,
                    'armorProf':this.selectedRace.armorProf,
                    'toolProf':this.returnTools(),
                    'spells':this.selectedClass.spells,
                    //other
                    'descriprion':{
                        'age':this.age,
                        'sex':this.sex,
                        'height':this.height,
                        'weight':this.weight,
                        'personalityTraits':this.personalityTraits,
                        'image':this.image,
                        'backstory':this.backstory,
                    }
                }).then((responce) => {
                    console.log(responce.data)
                    this.$router.push('/')
                })
                else{alert("BEFORE FINISH YOU MUST GENERATE CHARACTER")}
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
                if(this.selectedRace.name && this.selectedClass.name && this.selectedBackground.name)this.created=true;
                else{alert("You must fill all of the inputs")}
            },
            addItem: function(array){
                if(array.length < 8) array.push({'name':'',});
            },
            deleteItem: function (array,index) {
                array.splice(index, 1);
            },

        
        },
    }
</script>

<style>
            
</style>
