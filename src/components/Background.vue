<template>
    <div>
        <h3 class="text-center">{{back.name}}</h3>
                    <div class="container-fluid">
                        <div class="row">
                            <!-- Proficiency -->
                            <div class="col-12 col-md-6">
                                <!-- Skills -->
                                <div class="col-12">
                                    <h5>Skills Proficiency</h5>
                                    <div  v-for="(item) in back.skills" v-bind:key="item.id" v-show="item.value">
                                        <div class="col">{{item.skillName}}</div>
                                    </div>
                                </div>
                                <!-- Tool -->
                                <div class="col-12" v-if="back.proficiencies.tools.length>0">
                                    <h5 >Tool Proficiency</h5>
                                    <div  v-for="(item) in back.proficiencies.tools" v-bind:key="item.id">
                                        <div class="col">{{item.name}}</div>
                                    </div>
                                </div>
                                <!--Music-->
                                <div class="col-12">
                                    <h5 v-if="back.proficiencies.musical.length>0" >Musical instruments</h5>
                                    <div  v-for="(item) in back.proficiencies.musical" v-bind:key="item.id">
                                        <div class="col">{{item.name}}</div>
                                    </div>
                                </div>
                                <!-- Game -->
                                <div class="col-12" v-if="back.proficiencies.gaming.length>0">
                                    <h5>Game sets </h5>
                                    <div  v-for="(item) in back.proficiencies.gaming" v-bind:key="item.id">
                                        <div class="col">{{item.name}}</div>
                                    </div>
                                </div>
                                <!-- Languages -->
                                <div class="col-12" v-if="back.languages.length>0">
                                    <h5>Languages</h5>
                                    <div class="d-flex flex-row" v-for="(item) in back.languages" v-bind:key="item.id">
                                        <div class="col">{{item.name}}</div>
                                    </div>
                                </div>
                                <div class="col-12 ">
                                    <h5>Start items</h5>
                                    <h3>Gold: {{back.startItems.gold}}</h3>
                                    <h3>Clothes: {{back.startItems.clothes}}</h3>
                                    <h3 v-if="back.startItems.tools.length > 0">Tools: <p v-for="(item) in back.startItems.tools" v-bind:key="item.id"> {{item.name}}, </p></h3>    
                                    <h3 v-if="back.startItems.musical.length > 0" >Musicial: <p v-for="(item) in back.startItems.musical" v-bind:key="item.id"> {{item.name}}, </p></h3>
                                    <h3 v-if="back.startItems.symbols.length > 0">Symbols: <p v-for="(item) in back.startItems.symbols" v-bind:key="item.id"> {{item.name}}, </p></h3>
                                    <h3 v-if="back.startItems.other.length > 0">Other: <p v-for="(item) in back.startItems.other" v-bind:key="item.id"> {{item.name}}, </p></h3>
                                </div>
                                <!-- Traits -->
                                <div class="col-12">
                                    <h5>Traits</h5>
                                    <div class="d-flex flex-row" v-for="(item) in back.traits" v-bind:key="item.id">
                                        <p><strong>{{item.name}}.</strong> {{item.description}}</p>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <h3>Description</h3>
                                    <div>{{back.descriprion}}</div>
                                </div>
                            </div>
                            
                            <!-- image -->
                            <div class="col-12 col-md-6">
                                <img v-bind:src="back.image">
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
                back: {},
            };
        },
        mounted: function(){
           console.log(this.id);
            Vue.axios.get("http://localhost:3000/backgrounds/"+this.id).then((response) =>{
                console.log(response.data);
                this.back = response.data;
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
    width: 50%;
}
</style>