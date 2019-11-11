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
                    <input  class="form-control" type="text" v-model="newChar.descriprion.name" required>
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
                            <div class="col-2" v-for="(item) in newChar.abilities" v-bind:key="item.id">
                                <p>{{item.name}}</p>
                                <input class="form-control" type="number" v-model="item.value" min="1" max="30" value="10" required>
                            </div>
                        </div>
                    </div>
                </div>
                <!--Saving Throws-->
                <div class="col-6">
                    <h5>Saving Throws</h5>
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-2" v-for="(item) in newChar.saveThrows" v-bind:key="item.id">
                                <p><input type="checkbox" v-model="item.learned"> {{item.name}}</p>
                                <input class="form-control" type="number" v-model="item.value" min="1" max="30" value="10" required>
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
                    <input readonly class="form-control" type="text" v-model="newChar.iniciative">
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
                                <input class="form-control" type="number" v-model="item.value" min="1" max="30" value="10" required>
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
                    class: '', level:1, race: '', background:'', aligment:'', 
                    xp:0, armor:0, iniciative:0, speed:30, profBonus:2,
                    abilities: [
                        {'name' : 'STR','value' : 10,'mod' : 0},
                        {'name' : 'CON','value' : 20,'mod' : 0},
                        {'name' : 'DEX','value' : 0,'mod' : 0},
                        {'name' : 'INT','value' : 0,'mod' : 0},
                        {'name' : 'WIS','value' : 0,'mod' : 0},
                        {'name' : 'CHR','value' : 0,'mod' : 0},
                    ],
                    saveThrows: [
                        {'name' : 'STR','value' : 0,'learned' : false},
                        {'name' : 'CON','value' : 0,'learned' : false},
                        {'name' : 'DEX','value' : 0,'learned' : true},
                        {'name' : 'INT','value' : 0,'learned' : false},
                        {'name' : 'WIS','value' : 0,'learned' : false},
                        {'name' : 'CHR','value' : 0,'learned' : false},
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
                        name:'',
                        player:'',
                        age:0,
                        sex:'',
                        height:0,
                        weight:0,
                        hairColor:'',
                        eyeColor:'',
                        skinColor:'',
                        personalityTrait1:'',
                        personalityTrait2:'',
                        ideals:'',
                        bonds:'',
                        flaws:'',
                        image:'',
                        backstory:'',
                    }
                }
            }
        },
        mounted: function(){
            this.options = mCreatorData;
            // console.log(this.id)
            // Vue.axios.get("http://localhost:3000/students/"+this.id).then((response) =>{
            //     console.log(response.data)
            //     this.name = response.data.name;
            //     this.group = response.data.group;
            //     this.isDonePr = response.data.isDonePr;
            //     this.photo = response.data.photo;
            // })
        },

    }
</script>

<style>
.ph{
        height: 75px;
        width: auto;
        position: fixed;
        float: right;

    }

.name{
        text-align: left;

    }

.zd{
        height: 75px;
        width: auto;

    }


               
</style>
