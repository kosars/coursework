<template>  
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <h3 class="text-center">Dungeons & Dragons Monster Creator</h3>
                </div>
                <div class="w-100"></div>
                <!--Name-->
                <div class="col-4">
                    <p>Name</p>
                    <input  class="form-control" type="text" v-model="newMonster.name" required>
                </div>
                <!--Source-->
                <div class="col-4">
                    <p>Source(Optional)</p>
                    <input  class="form-control" type="text" v-model="newMonster.source">
                </div>   
                <div class="w-100"></div>
                <!--Challenge-->
                <div class="col-1">
                    <p>Challenge</p>
                    <select class="form-control" v-model="newMonster.challenge">
                        <option v-for="(item) in options.challengeList" v-bind:key="item.id">{{item}}</option>
                    </select>
                </div>
                <!--Backstory-->
                <div class="col-1">
                    <p>Size</p>
                    <select class="form-control" v-model="newMonster.size">
                        <option v-for="(item) in options.sizeList" v-bind:key="item.id">{{item}}</option>
                    </select>
                </div>
                <!--Type-->    
                <div class="col-1">
                    <p>Type</p>
                    <select class="form-control" v-model="newMonster.type">
                        <option v-for="(item) in options.typeList" v-bind:key="item.id">{{item}}</option>
                    </select>
                </div>
                <!--Aligment-->
                <div class="col-1">
                    <p>Aligment</p>
                    <select class="form-control" v-model="newMonster.aligment">
                        <option v-for="(item) in options.aligmentList" v-bind:key="item.id">{{item}}</option>
                    </select>
                </div>
                <!--Armor-->
                <div class="col-2">
                    <p>Armor Class</p>
                    <input class="form-control" type="number" v-model="newMonster.armor" min="0" max="100">
                </div> 
                <!--Speed-->
                <div class="col-2">
                    <p>Speed(ft)</p>
                    <input class="form-control" type="number" v-model="newMonster.speed" min="0" max="100">
                </div>
                <div class="w-100"></div>
                <!--Abilities-->
                <div class="col-6">
                    <h5>Abilities</h5>
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-2">
                                <p>STR</p>
                                <input class="form-control" type="number" v-model="newMonster.abilities.str" min="1" max="30" value="10" required>
                            </div>
                            <div class="col-2">
                                <p>CON</p>
                                <input class="form-control" type="number" v-model="newMonster.abilities.con" min="1" max="30" value="10" required>
                            </div>
                            <div class="col-2">
                                <p>DEX</p>
                                <input class="form-control" type="number" v-model="newMonster.abilities.dex" min="1" max="30" value="10" required>
                            </div>
                            <div class="col-2">
                                <p>INT</p>
                                <input class="form-control" type="number" v-model="newMonster.abilities.int" min="1" max="30" value="10" required>
                            </div>
                            <div class="col-2">
                                <p>WIS</p>
                                <input class="form-control" type="number" v-model="newMonster.abilities.wis" min="1" max="30" value="10" required>
                            </div>
                            <div class="col-2">
                                <p>CHR</p>
                                <input class="form-control" type="number" v-model="newMonster.abilities.chr" min="1" max="30" value="10" required>
                            </div>
                        </div>
                    </div>
                </div>
                <!--Saving Throws-->
                <div class="col-6">
                    <h5>Saving Throws</h5>
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-2">
                                <p>STR</p>
                                <input class="form-control" type="number" v-model="newMonster.saveThrows.str" min="0" max="17" value="0">
                            </div>
                            <div class="col-2">
                                <p>CON</p>
                                <input class="form-control" type="number" v-model="newMonster.saveThrows.con" min="0" max="17" value="0">
                            </div>
                            <div class="col-2">
                                <p>DEX</p>
                                <input class="form-control" type="number" v-model="newMonster.saveThrows.dex" min="0" max="17" value="0">
                            </div>
                            <div class="col-2">
                                <p>INT</p>
                                <input class="form-control" type="number" v-model="newMonster.saveThrows.int" min="0" max="17" value="0">
                            </div>
                            <div class="col-2">
                                <p>WIS</p>
                                <input class="form-control" type="number" v-model="newMonster.saveThrows.wis" min="0" max="17" value="0">
                            </div>
                            <div class="col-2">
                                <p>CHR</p>
                                <input class="form-control" type="number" v-model="newMonster.saveThrows.chr" min="0" max="17" value="0">
                            </div>
                        </div>
                    </div>
                </div>
                <!--HP-->
                <div class="col-6">
                    <h5>HP</h5>
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-2">
                                <p>Die Counts</p>
                                <input class="form-control" type="number" v-model="newMonster.hp.dieCounts" min="1" max="20">
                            </div>
                            <div class="col-2">
                                <p>Die</p>
                                <select class="form-control" v-model="newMonster.hp.die">
                                    <option v-for="(item) in options.dieList" v-bind:key="item.id">{{item}}</option>
                                </select>
                            </div>
                            <div class="col-2">
                                <p>Modifier</p>
                                <input class="form-control" type="number" v-model="newMonster.hp.mod" min="0" max="17" value="0" readonly>
                            </div>
                            <div class="col-2">
                                <p>Average</p>
                                <input class="form-control" type="number" v-model="newMonster.hp.avg" min="0" max="17" value="0" readonly>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-100"></div>
                <!--Skills
                <div class="col-12">
                    <h5>Skills</h5>
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-2" v-for="(item) in options.skillsList" v-bind:key="item.id">
                                <p>{{item}}</p>
                                <input class="form-control" type="number" v-model="a" min="1" max="30" value="10" required>
                            </div>
                        </div>
                    </div>
                </div>-->
                <div class="w-100"></div>
                <!--Lang's-->
                <div class="col-12">
                    <h5>Languages</h5>
                    <input  class="form-control" type="text" v-model="newMonster.langs">
                </div>
                <div class="w-100"></div>
                <!--Damage Resistance-->
                <div class="col-12">
                    <h5>Damage Resistance to</h5>
                    <span v-for="(item) in newMonster.damageRes" v-bind:key="item.id" >
                        <input type="checkbox" v-model="item.value"> <span>{{item.name}}  </span>
                    </span> 
                </div>
                <div class="w-100"></div>
                <!--Damage Immunity-->
                <div class="col-12">
                    <h5>Damage Immunity to</h5>
                    <span v-for="(item) in newMonster.damageImm" v-bind:key="item.id" >
                        <input type="checkbox" v-model="item.value"> <span>{{item.name}}  </span>
                    </span>  
                </div>     
                <div class="w-100"></div>
                <!--Damage Vulnerability-->
                <div class="col-12">
                    <h5>Damage Vulnerability to</h5>
                    <span v-for="(item) in newMonster.damageVul" v-bind:key="item.id" >
                        <input type="checkbox" v-model="item.value"> <span>{{item.name}}  </span>
                    </span> 
                </div>
                <div class="w-100"></div>
                <!--Condition Immunity-->
                <div class="col-12">
                    <h5>Condition Immunity to</h5>
                    <span v-for="(item) in newMonster.conditionImm" v-bind:key="item.id">
                        <input type="checkbox" v-model="item.value"> <span>{{item.name}}  </span>
                    </span> 
                </div>
                <div class="w-100"></div>
                <!--Description-->
                <div class="col-12">
                    <h5>Description</h5>
                    <input  class="form-control" type="text" v-model="newMonster.description">
                </div>
                <!--Legendary Actions Description-->
                <div class="col-12">
                    <h5>Legendary Actions Description</h5>
                    <input  class="form-control" type="text" v-model="newMonster.legendaryActions">
                </div>
                <!--Actions / Features-->
                <div class="col-12">
                    <h5>Actions / Features</h5>
                    <input  class="form-control" type="text" v-model="newMonster.actions">
                    <button class="btn">Add Action / Feature</button>
                </div>                                
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    import mCreatorData from '../data/mCreatorData.js'

    Vue.use(VueAxios,axios)
    export default {
        data: function() {
            return{
                options: [],
                newMonster:{
                    name:'',source: '',challenge: '',size:'',type:'',aligment:'',
                    armor:0, speed:25,
                    abilities: {
                        str:10,con:10,dex:10,int:10,wis:10,chr:10,
                    },
                    saveThrows: {
                        str:0,con:0,dex:0,int:0,wis:0,chr:0,
                    },
                    hp: {
                        dieCounts:1, die:0, mod:0, avg:0,
                    },
                     
                    'damageRes':[
                        {name:'traps', value: false},
                        {name:'acid', value: false},
                        {name:'cold', value: false},   
                        {name:'fire', value: false},   
                        {name:'force', value: false},      
                        {name:'force', value: false},   
                        {name:'lightning', value: false},   
                        {name:'necrotic', value: false},   
                        {name:'piercing', value: false},
                        {name:'poison', value: false},   
                        {name:'physic', value: false},   
                        {name:'radiant', value: false},   
                        {name:'slashing', value: false},   
                        {name:'thunder', value: false},               
                    ],
                    'damageImm':[
                        {name:'traps', value: false},
                        {name:'acid', value: false},
                        {name:'cold', value: false},   
                        {name:'fire', value: false},   
                        {name:'force', value: false},      
                        {name:'force', value: false},   
                        {name:'lightning', value: false},   
                        {name:'necrotic', value: false},   
                        {name:'piercing', value: false},
                        {name:'poison', value: false},   
                        {name:'physic', value: false},   
                        {name:'radiant', value: false},   
                        {name:'slashing', value: false},   
                        {name:'thunder', value: false},         
                    ],
                    'damageVul':[
                        {name:'traps', value: false},
                        {name:'acid', value: false},
                        {name:'cold', value: false},   
                        {name:'fire', value: false},   
                        {name:'force', value: false},      
                        {name:'force', value: false},   
                        {name:'lightning', value: false},   
                        {name:'necrotic', value: false},   
                        {name:'piercing', value: false},
                        {name:'poison', value: false},   
                        {name:'physic', value: false},   
                        {name:'radiant', value: false},   
                        {name:'slashing', value: false},   
                        {name:'thunder', value: false},               
                    ],
                    'conditionImm':[
                        {name:'blinded', value: false},
                        {name:'charmed', value: false},
                        {name:'deafened', value: false},   
                        {name:'frightened', value: false},   
                        {name:'grappled', value: false},      
                        {name:'incapacitated', value: false},   
                        {name:'invisibility', value: false},   
                        {name:'paralyzed', value: false},   
                        {name:'petrified', value: false},
                        {name:'poisoned', value: false},   
                        {name:'prone', value: false},   
                        {name:'restrained', value: false},   
                        {name:'stunned', value: false},   
                        {name:'unconscious', value: false},      
                    ],
                    langs:'',
                    description:'',
                    legendaryActions:'',
                    actions:'',
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
