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
                <!-- <div class="col">
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
                <div class="w-100"></div> -->
                <!--Languages-->
                <div class="col-12">
                    <p>Languages</p>
                    <input  class="form-control" type="text" v-model="newRace.languages" required>
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
    import Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'

    Vue.use(VueAxios,axios)
    export default {
        data: function() {
            return{
                options: [],
                points:2,
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
                    'skills': [],
                    'features': '',
                    //other
                    'descriprion':'',
                    'maxAge':0,
                    'minHeight':0,
                    'maxHeight':0,
                    'size':'medium',
                    'image':'',
                    // saveThrows: [
                    //     {'name' : 'STR','learned' : false},
                    //     {'name' : 'CON','learned' : false},
                    //     {'name' : 'DEX','learned' : false},
                    //     {'name' : 'INT','learned' : false},
                    //     {'name' : 'WIS','learned' : false},
                    //     {'name' : 'CHR','learned' : false},
                    // ],
                    // skills: [
                    //     {'name' : 'Athletics', 'depended':'STR','value' : 0,'learned' : false},
                    //     {'name' : 'Acrobatics', 'depended':'DEX','value' : 0,'learned' : false},
                    //     {'name' : 'Sleight of Hand', 'depended':'DEX','value' : 0,'learned' : false},
                    //     {'name' : 'Stealth', 'depended':'DEX','value' : 0,'learned' : false},
                    //     {'name' : 'Arcana', 'depended':'INT','value' : 0,'learned' : false},
                    //     {'name' : 'History', 'depended':'INT','value' : 0,'learned' : false},
                    //     {'name' : 'Investigation', 'depended':'INT','value' : 0,'learned' : false},
                    //     {'name' : 'Nature', 'depended':'INT','value' : 0,'learned' : false},
                    //     {'name' : 'Religion', 'depended':'INT','value' : 0,'learned' : false},
                    //     {'name' : 'Animal Handling', 'depended':'WIS','value' : 0,'learned' : false},
                    //     {'name' : 'Insight', 'depended':'WIS','value' : 0,'learned' : false},
                    //     {'name' : 'Medicine', 'depended':'WIS','value' : 0,'learned' : false},
                    //     {'name' : 'Perception', 'depended':'WIS','value' : 0,'learned' : false},
                    //     {'name' : 'Survival', 'depended':'WIS','value' : 0,'learned' : false},
                    //     {'name' : 'Deception', 'depended':'CHR','value' : 0,'learned' : false},
                    //     {'name' : 'Intimidation', 'depended':'CHR','value' : 0,'learned' : false},
                    //     {'name' : 'Performance', 'depended':'CHR','value' : 0,'learned' : false},
                    //     {'name' : 'Persuation', 'depended':'CHR','value' : 0,'learned' : false},
                    // ],
                }
            }
        },
        mounted: function(){
        },
        computed:{
           
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
                    'damageResistance': this.newRace.speed,
                    'damageImmunity': this.newRace.speed,
                    
                    'weaponProf': this.newRace.weaponProf,
                    'armorProf': this.newRace.armorProf,
                    'toolProf': this.newRace.toolProf,
                    'languages': this.newRace.languages,

                    'features': this.newRace.features,
                    'skills': this.newRace.skills,
                    'descriprion': this.newRace.descriprion,

                    'maxAge': this.newRace.maxAge,
                    'maxHeight': this.newRace.maxHeight,
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
