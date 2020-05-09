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
                    <!-- <div class="col d-flex"><input type="checkbox" v-model="newSpell.ritual"><p>ritual</p></div>
                    <div class="col d-flex"><input type="checkbox" v-model="newSpell.attackRollRequires"><p>Requires Attack Roll</p></div>
                    <div class="col d-flex"><input type="checkbox" v-model="newSpell.components.verbal"><p>verbal</p></div>
                    <div class="col d-flex"><input type="checkbox" v-model="newSpell.components.somatic"><p>somatic</p></div>
                    <div class="col d-flex"><input type="checkbox" v-model="newSpell.components.material"><p>material</p></div> -->
                </div>
                <!-- Components -->
                <div class="col-12">
                    <p>Components</p>
                    <input  class="form-control" type="text" v-model="newSpell.components">
                </div>
                <div class="col-4">
                    <p>Casting Time</p>
                    <input  class="form-control" type="text" v-model="newSpell.castingTime">
                </div>
                <div class="col-4">
                    <p>Range</p>
                    <input  class="form-control" type="text" v-model="newSpell.range">
                </div>
                <div class="col-4">
                    <p>Duration</p>
                    <input  class="form-control" type="text" v-model="newSpell.duration">
                </div>
                
                <!--Description-->
                <div class="col-12">
                    <p>Description</p>
                    <textarea  class="form-control" type="text" v-model="newSpell.description" rows="6"></textarea>
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
                    'name': '',
                    'source':'Players Handbook',
                    'lvl':0,
                    'school':'',
                    'description':'',
                    'castingTime':'',
                    'range':'',
                    'duration':'',
                    'components':'',
                    'materials':'',
                    'ritual':false,
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
                    'description':this.newSpell.description,
                    'castingTime':this.newSpell.castingTime,
                    'range':this.newSpell.range,
                    'duration':this.newSpell.duration,
                    'components':this.newSpell.components,
                    'materials':this.newSpell.materials,
                    'ritual':this.newSpell.ritual,
                }).then((responce) => {
                    console.log(responce.data)
                    console.log("Done")
                    //this.$router.push('/')
                })
            },
            parseSpells: function(arr){
                console.log(arr)
                arr.forEach(element => {
                    if(element.en.source == "PHB")
                        Vue.axios.post("http://localhost:3000/spells",{
                            'name': element.en.name,
                            'source': "Player's Handbook",
                            'lvl':element.en.level,
                            'school':element.en.school,
                            'description':element.en.text,
                            'castingTime':element.en.castingTime,
                            'range':element.en.range,
                            'duration':element.en.duration,
                            'components':element.en.components,
                            'materials':element.en.materials,
                            'ritual':element.en.ritual,
                        })
                })
            }
        },
    }
</script>

<style>
            
</style>
