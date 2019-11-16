<template>
    <div>  
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 col-md-3">
                    <h1>{{item.name}}</h1>
                    <p>Character name</p>
                </div>
                <div class="col-12 col-md-9">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-4 col-lg-2">
                                <h5>{{item.class}} {{item.level}}</h5>
                                <p class="border-top border-secondary">class and lvl</p>
                            </div>
                            <div class="col-4 col-lg-2">
                                <h5>{{item.background}}</h5>
                                <p class="border-top border-secondary">background</p>
                            </div>
                            <div class="col-4 col-lg-2">
                                <h5>{{}}</h5>
                                <p class="border-top border-secondary">player name</p>
                            </div>
                            <div class="col-4 col-lg-2">
                                <h5>{{item.race}}</h5>
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
                <div class="col-12 col-md-8 d-flex flex-column flex-md-row ">
                    <div class="col-12 col-md-2 d-flex flex-row flex-md-column">
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
                    <div class="col-12 col-md-10">
                        <div class="col-12 d-flex flex-row">
                            <div class="col-4 d-flex flex-row justify-content-center align-items-center">
                                <div class="col-2 text-center">
                                    <h3>{{item.profBonus}}</h3>
                                </div>
                                <div class="col-10 text-center">
                                    <p>PROFICIENCY BONUS</p>
                                </div>
                            </div>
                            <div class="col-8 d-flex flex-row">
                                <div class="col text-center">
                                    <h3>{{PWIS}}</h3>
                                    <p>Passive WIS</p>
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
                        <div class="col-12 d-flex flex-row">
                            <div class="col-12 col-md-5 d-flex flex-row flex-md-column">
                                <div class="col-4 col-md-12">
                                    <p class="text-center border-bottom border-secondary">saving throws</p>
                                </div>
                                <div class="col-8 col-md-12">
                                    <p class="text-center border-bottom border-secondary">skills</p>
                                </div>
                            </div>
                            <div class="w-100 d-md-none"></div>
                            <div class="col-12 col-md-7  d-flex">
                                <div>ssss</div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div class="col-12 col-md-4">

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
