<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 col-md-6">
                    <h3 class="text-center">{{item.name}}</h3>
                    <div class="container-fluid">
                        <div class="row">
                            <!-- Ability -->
                            <div class="col-6">
                                <h3>Hit Die: 1d{{item.hitDie}}</h3>
                            </div>
                            <!-- Proficiency -->
                            <div class="col-6">
                                <div class="col-12">
                                    <h5>Saving Throws</h5>
                                    <div class="col" v-if="item.savingThrows.STR">STR</div>   
                                    <div class="col" v-if="item.savingThrows.DEX">DEX</div> 
                                    <div class="col" v-if="item.savingThrows.CON">CON</div> 
                                    <div class="col" v-if="item.savingThrows.INT">INT</div> 
                                    <div class="col" v-if="item.savingThrows.WIS">WIS</div> 
                                    <div class="col" v-if="item.savingThrows.CHR">CHR</div> 
                                </div>
                                <!-- Skills -->
                                <div class="col-12">
                                    <h5>Skills Proficiency</h5>
                                    <div  v-for="(item) in item.skills" v-bind:key="item.id" v-show="item.value">
                                        <div class="col">{{item.skillName}}</div>
                                    </div>
                                </div>
                                
                                <!-- Weapon -->
                                <!-- <div class="col-12">
                                    <h5>Weapon Proficiency</h5>
                                    <div  v-for="(item) in race.weaponProf" v-bind:key="item.id">
                                        <div class="col">{{item.name}}</div>
                                    </div>
                                </div> -->
                                <!-- Armor -->
                                <!-- <div class="col-12">
                                    <h5>Armor Proficiency</h5>
                                    <div  v-for="(item) in race.armorProf" v-bind:key="item.id">
                                        <div class="col">{{item.name}}</div>
                                    </div>
                                </div> -->
                                <!-- Tool -->
                                <!-- <div class="col-12">
                                    <h5>Tool Proficiency</h5>
                                    <div  v-for="(item) in race.toolProf" v-bind:key="item.id">
                                        <div class="col">{{item.name}}</div>
                                    </div>
                                </div> -->
                                <!-- Languages -->
                                <!-- <div class="col-12">
                                    <h5>Languages</h5>
                                    <div class="d-flex flex-row" v-for="(item) in race.languages" v-bind:key="item.id">
                                        <div class="col">{{item.name}}</div>
                                    </div>
                                </div> -->
                                
                            </div>
                            <div class="col-12" v-if="item.spellcast">
                                <h5>Spells</h5>
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-6" v-for="(item) in item.spells" v-bind:key="item._id">
                                            <router-link v-bind:to="'/spells/'+item.spellid">
                                                {{ item.name }}
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <h5>Traits</h5>
                                <div class="d-flex flex-row" v-for="(item) in item.traits" v-bind:key="item.id">
                                    <p><strong>{{item.name}}.</strong> {{item.description}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- image -->
                <div class="col-12 col-md-6">
                    <img v-bind:src="item.image">
                </div>
                <div class="col-12">
                    <h3>Description</h3>
                    <div>{{item.descriprion}}</div>
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
                item: {},
            };
        },
        mounted: function(){
           console.log(this.id);
            Vue.axios.get("http://localhost:3000/classes/"+this.id).then((response) =>{
                console.log(response.data);
                this.item = response.data;
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