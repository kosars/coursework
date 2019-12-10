<template>
    <div>  
        <div class="container-fluid">
            <div class="row">
                <div class="col-10 col-md-3 text-center">
                    <h1>{{item.name}}</h1>
                    <p>Character name</p>
                </div>
                <div class="col-12 col-md-9">
                    <div class="container-fluid">
                        <div class="row align-items-center">
                            <div class="col-4 col-lg-2">
                                <router-link v-bind:to="'/classes/'+item.class.classId">
                                    <h5>{{item.class.name}} {{item.level}}</h5>
                                </router-link>
                                <p class="border-top border-secondary">class and lvl</p>
                            </div>
                            <div class="col-4 col-lg-2">
                                <h5></h5>
                                <router-link v-bind:to="'/backgrounds/'+item.background.backgroundId">
                                    <h5>{{item.background.name}}</h5>
                                </router-link>
                                <p class="border-top border-secondary">background</p>
                            </div>
                            <div class="col-4 col-lg-2">
                                <h5>{{item.source}}</h5>
                                <p class="border-top border-secondary">player name</p>
                            </div>
                            <div class="col-4 col-lg-2">
                                <router-link v-bind:to="'/races/'+item.race.raceId">
                                    <h5>{{item.race.name}}</h5>
                                </router-link>
                                <p class="border-top border-secondary">race</p>
                            </div>
                            <div class="col-4 col-lg-2">
                                <h5>{{item.aligment}}</h5>
                                <p class="border-top border-secondary">aligment</p>
                            </div>
                            <div class="col-4 col-lg-2">
                                <h5>{{item.xp}}</h5>
                                <p class="border-top border-secondary">xp</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid">
            <div class="row">
                <!-- block-1 -->
                <div class="col-12 col-md-8 d-flex flex-column flex-md-row">
                    
                    <!-- Abilities -->
                    <h5 class="d-flex d-md-none text-center justify-content-center"> Abilities</h5>
                    <div class="col-12 col-md-1 d-flex flex-row flex-md-column border-bottom border-secondary">
                        <div class="col text-center">
                            <p>STR</p>
                            <h3>{{STR}}</h3>
                            <p>{{item.STR}}</p>
                        </div>
                        <div class="col text-center">
                            <p>DEX</p>
                            <h3>{{DEX}}</h3>
                            <p>{{item.DEX}}</p>
                        </div>
                        <div class="col text-center">
                            <p>CON</p>
                            <h3>{{CON}}</h3>
                            <p>{{item.CON}}</p>
                        </div>
                        <div class="col text-center">
                            <p>INT</p>
                            <h3>{{INT}}</h3>
                            <p>{{item.INT}}</p>
                        </div>
                        <div class="col text-center">
                            <p>WIS</p>
                            <h3>{{WIS}}</h3>
                            <p>{{item.WIS}}</p>
                        </div>
                        <div class="col text-center">
                            <p>CHR</p>
                            <h3>{{CHR}}</h3>
                            <p>{{item.CHR}}</p>
                        </div>
                    </div>
                    
                    <div class="col-12 col-md-11">
                        <!-- Additionaly Abilities -->
                        <div class="col-12 d-flex flex-row marg-top">
                            <div class="col-12 d-flex flex-row">
                                <div class="col text-center">
                                    <h3>{{item.profBonus}}</h3>
                                    <p>Profiency Bonus</p>
                                </div>
                                <div class="col text-center">
                                    <h3>{{PWIS}}</h3>
                                    <p>Passive WIS</p>
                                </div>
                                <div class="col text-center">
                                    <h3>1d{{item.hpDice}}</h3>
                                    <p>HP Dice</p>
                                </div>
                                <div class="col text-center">
                                    <h3>{{STR}}</h3>
                                    <p>AC</p>
                                </div>
                                <div class="col text-center">
                                    <h3>{{DEX}}</h3>
                                    <p>INICIATIVE</p>
                                </div>
                                <div class="col text-center">
                                    <h3>{{item.speed}}</h3>
                                    <p>SPEED (ft.)</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 row">
                            <!-- skills and throws -->
                            <div class="col-12 col-md-4 d-flex flex-row flex-md-column">
                                <!-- saving throws -->
                                <div class="col-4 col-md-12">
                                    <p class="text-center border-bottom border-secondary">saving throws</p>
                                    <div class="col" v-for="(item) in item.saveThrows" v-bind:key="item._id">
                                        <p>{{item.name}} : {{item.value}} <strong v-if="item.prof">(+2)</strong></p>

                                    </div>
                                </div>
                                <!-- skills -->
                                <div class="col-8 col-md-12 row">
                                    <div class="col-12">
                                        <p class="text-center border-bottom border-secondary">skills</p>
                                    </div>
                                    <div class="col-6 col-md-12" v-for="(item) in item.skills" v-bind:key="item._id">
                                        <p>{{item.name}} <strong v-if="item.value">(learned)</strong></p>  
                                   </div>
                                   
                                </div>
                            </div>
                            <div class="col-12 col-md-8  d-flex">
                                <div class="container-fluid">
                                    <div class="row">
                                        <!-- spells -->
                                        <div v-if="item.spells.length > 0" class="col-12 col-md-4 row pd-right">
                                            <div class="col-12 text-center border-bottom border-secondary">spells</div>
                                            <div class="col-4 col-md-12" v-for="(item) in item.spells" v-bind:key="item._id">
                                                <router-link v-bind:to="'/spells/'+item.spellid">{{item.name}}</router-link>
                                            </div>
                                        </div>
                                        <!-- Languages, armor, weapon -->
                                        <div class="col-6 col-md-4">
                                            <div class="row pd-right">
                                                <div class="col-12 text-center border-bottom border-secondary"
                                                  v-if="item.languages.length > 0">languages</div>
                                                <div class="col-12" v-for="(item) in item.languages" v-bind:key="item._id">
                                                    {{item.name}}
                                                </div>
                                                <div class="col-12 text-center border-bottom border-secondary"
                                                  v-if="item.weaponProf.length > 0">weapon Prof</div>
                                                <div class="col-12" v-for="(item) in item.weaponProf" v-bind:key="item._id">
                                                    {{item.name}}
                                                </div>
                                                <div class="col-12 text-center border-bottom border-secondary"
                                                 v-if="item.weaponProf.length > 0">armor Prof</div>
                                                <div class="col-12" v-for="(item) in item.armorProf" v-bind:key="item._id">
                                                    {{item.name}}
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Tools -->
                                        <div class="col-6 col-md-4" v-if="item.toolProf.length > 0">
                                            <div class="row pd-right">
                                                <div class="col-12 text-center border-bottom border-secondary"
                                                  >tool Prof</div>
                                                <div class="col-12" v-for="(item) in item.toolProf" v-bind:key="item._id">
                                                    {{item.name}}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                 <!-- block-2 -->
                <div class="col-12 col-md-4">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-12 marg-top marg-bot">
                                <img v-bind:src="item.descriprion.image">
                            </div>
                            <!-- Traits -->
                            <div class="col-12">
                                <h5>Personality Traits</h5>
                                <div v-for="(item) in item.descriprion.personalityTraits" v-bind:key="item.id">
                                    <p class="desc"><strong>{{item.name}}.</strong> {{item.description}}</p>
                                </div>
                            </div>
                            <!-- Description -->
                            <div class="col-12">
                                <h5>Description</h5>
                                <div>
                                    <p class="desc">{{item.descriprion.backstory}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
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
        props: {
            id: '',
        },
        data: function () {
            return {
                item: null,
                STR:0,
                DEX:0,
                CON:0,
                INT:0,
                WIS:0,
                CHR:0,
                PWIS:0,
            };
        },
        mounted: function(){
           console.log(this.id);
            Vue.axios.get("http://localhost:3000/chars/"+this.id).then((response) =>{
                console.log(response.data);
                this.item = response.data;
                this.SetAbilities();
            })
        },
        computed: {
        },
        methods: {
            SetAbilities: function(){
                this.STR = this.Mod(this.item.STR,false);
                this.DEX = this.Mod(this.item.DEX,false);
                this.CON = this.Mod(this.item.CON,false);
                this.INT = this.Mod(this.item.INT,false);
                this.WIS = this.Mod(this.item.WIS,false);
                this.CHR = this.Mod(this.item.CHR,false);
                this.PWIS = this.PassWis(false);
            },
            Mod: function(a,prof){
                if(prof) return Math.floor(((a - 10)/2) + prof);
                else return Math.floor((a - 10)/2);
            },
            PassWis: function(prof){
                if(prof) return 10 + this.item.profBonus + this.WIS;
                else return 10 + this.WIS;
            }
        }
    }
</script>
<style>
.col-12, .col-md-12{
    height: 100%;
}
.marg-top{
    margin-top: 2em;
}
.marg-bot{
    margin-bottom: 2em;
}
.pd-right{
    padding-right: 2em;
}
.desc{
    overflow-x:hidden;
}
.d-flex h3 {
    margin-left: 0 !important;
}
</style>