<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-6">
                    <h3 class="text-center">{{race.name}}</h3>
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-4"><h5>Size: {{race.size}}</h5></div>
                            <div class="col-4"><h5>Speed: {{race.speed}} ft.</h5></div>
                            <div class="col-4"><h5>Darkvision: {{race.nightVision}} ft.</h5></div>
                            <div class="w-100"></div>
                            <div class="col-12">
                                <h5>Ability Increases</h5>
                                <div class="col" v-if="race.abilitiesBonus.STR">STR: {{race.abilitiesBonus.STR}}</div>   
                                <div class="col" v-if="race.abilitiesBonus.DEX">DEX: {{race.abilitiesBonus.DEX}}</div> 
                                <div class="col" v-if="race.abilitiesBonus.CON">CON: {{race.abilitiesBonus.CON}}</div> 
                                <div class="col" v-if="race.abilitiesBonus.INT">INT: {{race.abilitiesBonus.INT}}</div> 
                                <div class="col" v-if="race.abilitiesBonus.WIS">WIS: {{race.abilitiesBonus.WIS}}</div> 
                                <div class="col" v-if="race.abilitiesBonus.CHR">CHR: {{race.abilitiesBonus.CHR}}</div> 
                            </div>
                            <div class="col-12">
                                <p>Damage resistance to {{race.damageResistance}}</p>
                                <p>Damage immunity to {{race.damageImmunity}}</p>
                            </div>
                            <div class="col-12">
                                <h5>Skills Proficiency</h5>
                                <div  v-for="(item) in race.skills" v-bind:key="item.id" v-show="item.value">
                                    <div class="col">{{item.skillName}}</div>
                                </div>
                            </div>
                            <div class="col-12">
                                <h5>Weapon Proficiency</h5>
                                <div  v-for="(item) in race.weaponProf" v-bind:key="item.id">
                                    <div class="col">{{item.name}}</div>
                                </div>
                            </div>
                            <div class="col-12">
                                <h5>Armor Proficiency</h5>
                                <div  v-for="(item) in race.armorProf" v-bind:key="item.id">
                                    <div class="col">{{item.name}}</div>
                                </div>
                            </div>
                            <div class="col-12">
                                <h5>Tool Proficiency</h5>
                                <div  v-for="(item) in race.toolProf" v-bind:key="item.id">
                                    <div class="col">{{item.name}}</div>
                                </div>
                            </div>
                            <div class="col-12">
                                <h5>Languages</h5>
                                <div class="d-flex flex-row" v-for="(item) in race.languages" v-bind:key="item.id">
                                    <div class="col">{{item.name}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <img v-bind:src="race.image">
                    <div class="col-12">
                        <h5>Traits</h5>
                            <div class="d-flex flex-row" v-for="(item) in race.traits" v-bind:key="item.id">
                                <p><strong>{{item.name}}.</strong> {{item.description}}</p>
                            </div>
                        </div>
                    <h3>Description</h3>
                    <div>{{race.descriprion}}</div>
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
                race: {},
            };
        },
        mounted: function(){
           console.log(this.id);
            Vue.axios.get("http://localhost:3000/races/"+this.id).then((response) =>{
                console.log(response.data);
                this.race = response.data;
            })
        },
        computed: {
        },
        methods: {
            
        }
    }
</script>
<style>
img{
    width: 100%;
}
</style>