<template>  
    <div>
        <div class="container-fluid">
            <div class="row">

                <div class="col-12">
                    <h3 class="text-center">Dungeons & Dragons Dice Roller</h3>
                </div>

                <div class="col-md-12 col-lg-9">
                    <div class="container d-none ">
                        <div class="row">
                            <div class="d-flex col-12" v-for="(dice) in dices" v-bind:key="dice.id">
                                    <div class="col-2 d-flex justify-content-center" v-if="dice.name !== 'dX'"><button class="btn btn-outline-primary" v-on:click="roll(dice)">{{dice.name}}</button></div>
                                    <div class="col-2 d-flex justify-content-center" v-else><input class="form-control" type="text" v-model="dice.roll" placeholder="dX"></div>
                                    <div class="col-1"><input  class="form-control" type="text" v-model="dice.numOfRolls"></div>
                                    <div class="col-1">{{dice.name}}</div>
                                    <div class="col-1">+</div>
                                    <div class="col-1"><input class="form-control" type="text" v-model="dice.rollMod"></div>
                                    <div class="col-1"><button class="btn btn-outline-primary" v-on:click="roll(dice)">Roll</button></div>
                                    <div class="col-2"><input class="form-control" type="text" v-model="dice.rollRes" readonly placeholder="Results"></div>
                                    
                            </div>
                        </div>
                    </div>
                    
                    <div class="container">
                            <div class="row align-items-center ">
                                <div class="d-flex col-12" v-for="(dice) in dices " v-bind:key="dice.id">
                                    
                                        <div class="col-2"><input  class="form-control" type="text" v-model="dice.numOfRolls"></div>
                                        <div class="col-2" v-if="dice.name !== 'dX'"><button class="btn btn-outline-primary" v-on:click="roll(dice)">{{dice.name}}</button></div>
                                        <div class="col-2 d-flex" v-else><input class="form-control" type="text" v-model="dice.roll" placeholder="dX"></div>
                                        <div class="col-1">+</div>
                                        <div class="col-2"><input class="form-control" type="text" v-model="dice.rollMod"></div>
                                        <div class="col-2"><button class="btn btn-outline-primary" v-on:click="roll(dice)">Roll</button></div>
                                        <div class="col-3"><input class="form-control" type="text" v-model="dice.rollRes" readonly placeholder="Results"></div>
                                        
                                </div>
                            </div>
                        </div>
                </div>

                <div class="col-lg-3">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-12">
                                <h5>Log <button class="btn btn-secondary" v-on:click="clearLog()">Clear</button></h5>   
                            </div>
                            <textarea readonly v-model="rollsLog"  rows="15" class="form-control"
                                placeholder="There is a log of your rolls This field records your latest roll at its top.">
                            </textarea>
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
    import mCreatorData from '../data/cCreatorData.js'

    Vue.use(VueAxios,axios)
    export default {
        data: function() {
            return{
                rollsLog:[],
                "dices":
                [
                    //{название дайса, кол-во роллов, модификатор, результат бросков, макс результат}
                    {name:'d4', numOfRolls:1,rollMod:0,rollRes:[null], roll:4},
                    {name:'d6', numOfRolls:1,rollMod:0,rollRes:[null], roll:6},
                    {name:'d8', numOfRolls:1,rollMod:0,rollRes:[null], roll:8},
                    {name:'d10', numOfRolls:1,rollMod:0,rollRes:[null], roll:10},
                    {name:'d12', numOfRolls:1,rollMod:0,rollRes:[null], roll:12},
                    {name:'d20', numOfRolls:1,rollMod:0,rollRes:[null], roll:20},
                    {name:'d100', numOfRolls:1,rollMod:0,rollRes:[null], roll:100},
                    {name:'dX', numOfRolls:1,rollMod:0,rollRes:[null], roll:null},
                ],    
            };
        },
        mounted: function(){

        },
        methods: {
           //бросок дайса
            roll: function(dice){ 
                dice.rollRes = []
                var res = 0
                for(var i=0;i<dice.numOfRolls;i++){
                    res = this.randomNum(dice.roll,dice.rollMod)
                    dice.rollRes.push(res)
                
                }
                this.rollsLog.unshift('\n\nRoll('+dice.numOfRolls+dice.name+')+'+dice.rollMod+'\nRes: '+dice.rollRes + '\nTotal: '+ this.rollSumm(dice.rollRes))
            },
            //возврат случайного числа
            randomNum: function(max,mod){
                return Math.floor(Math.random() * Math.floor(max)) + 1 + parseInt(mod,10)
                //+1 потому что Math.random() возвращает числа в диапазоне [0,max)
            },
            rollSumm:function(a){
                var sum = 0
                for(var i = 0; i < a.length; i++) {sum += a[i]}
                return sum
            },
            clearLog: function(){
                this.rollsLog = []
            },
        },
    }
</script>

<style>
            
</style>
