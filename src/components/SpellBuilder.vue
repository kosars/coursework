<template>  
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <h3 class="text-center">Dungeons & Dragons Spell Builder</h3>
                </div>
                <div class="w-100"></div>
                <!--Name-->
                <div class="col-12 col-md-6">
                    <p>Name</p>
                    <input  class="form-control" type="text" v-model="newSpell.name" required>
                </div>
                <!--Source-->
                <div class="col-12 col-md-6">
                    <p>Source</p>
                    <input  class="form-control" type="text" v-model="newSpell.source" required>
                </div>
                <div class="col-2">
                    <p>Level</p>
                    <select class="form-control" v-model="newSpell.lvl">
                        <option value="0">Cantrip</option>
                        <option value="1">1-st level</option>
                        <option value="2">2-st level</option>
                        <option value="3">3-st level</option>
                        <option value="4">4-st level</option>
                        <option value="5">5-st level</option>
                        <option value="6">6-st level</option>
                        <option value="7">7-st level</option>
                        <option value="8">8-st level</option>
                        <option value="9">9-st level</option>
                    </select>
                </div>
                <div class="col-2">
                    <p>School</p>
                    <select class="form-control" v-model="newSpell.school">
                        <option value="necromancy">necromancy</option>
                        <option value="abjuration">abjuration</option>
                        <option value="evocation">evocation</option>
                        <option value="divination">divination</option>
                        <option value="transmutation">transmutation</option>
                        <option value="illusion">illusion</option>
                        <option value="conjuration">conjuration</option>
                        <option value="enchantment">enchantment</option>
                    </select>
                </div>
                <div class="col-8 d-flex align-items-center">
                    <div class="col d-flex"><input type="checkbox" v-model="newSpell.ritual"><p>ritual</p></div>
                    <div class="col d-flex"><input type="checkbox" v-model="newSpell.attackRollRequires"><p>Requires Attack Roll</p></div>
                    <div class="col d-flex"><input type="checkbox" v-model="newSpell.components.verbal"><p>verbal</p></div>
                    <div class="col d-flex"><input type="checkbox" v-model="newSpell.components.somatic"><p>somatic</p></div>
                    <div class="col d-flex"><input type="checkbox" v-model="newSpell.components.material"><p>material</p></div>
                </div>
                <!-- Components -->
                <div class="col-12">
                    <p>Components</p>
                    <input  class="form-control" type="text" v-model="newSpell.components.text">
                </div>
                <div class="col-4">
                    <p>Casting Time</p>
                    <input  class="form-control" type="text" v-model="newSpell.castingTime">
                </div>
                <div class="col-4">
                    <p>Duration</p>
                    <input  class="form-control" type="text" v-model="newSpell.duration">
                </div>
                <div class="col-4">
                    <p>Range</p>
                    <input  class="form-control" type="text" v-model="newSpell.range">
                </div>
                
                <!--Description-->
                <div class="col-12">
                    <p>Description</p>
                    <textarea  class="form-control" type="text" v-model="newSpell.descriprion" rows="6"></textarea>
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
                newSpell:{
                    'name': 'name',
                    'source':'Homebrew',
                    'lvl':0,
                    'school':'',
                    'castingTime':'',
                    'range':'',
                    'duration':'',
                    'components':{
                        'verbal':false,
                        'somatic':false,
                        'material':false,
                        'text':''
                    },
                    'ritual':false,
                    'attackRollRequires':false,
                    'descriprion':'',
                }
            }
        },
        mounted: function(){
        },
        computed:{
        },
        methods: {
            
            finishCreation: function(){
                Vue.axios.post("http://localhost:3000/spells",{
                    'name': this.newSpell.name,
                    'source': this.newSpell.source,
                    'lvl':this.newSpell.lvl,
                    'school':this.newSpell.school,
                    'castingTime':this.newSpell.castingTime,
                    'range':this.newSpell.range,
                    'duration':this.newSpell.duration,
                    'components':{
                        'verbal':this.newSpell.components.verbal,
                        'somatic':this.newSpell.components.somatic,
                        'material':this.newSpell.components.material,
                        'text':this.newSpell.components.text
                    },
                    'ritual':this.newSpell.ritual,
                    'attackRollRequires':this.newSpell.attackRollRequires,
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
