<template>
    <div>
        <h1>{{race.name}}</h1> 
        <h5>Size: {{race.size}} Speed: {{race.speed}} ft. Darkvision: {{race.nightVision}} ft. </h5>
        <div>
            <h1 v-if="race.abilitiesBonus.STR">STR: {{race.abilitiesBonus.STR}}</h1>   
            <h1 v-if="race.abilitiesBonus.DEX">DEX: {{race.abilitiesBonus.DEX}}</h1> 
            <h1 v-if="race.abilitiesBonus.CON">CON: {{race.abilitiesBonus.CON}}</h1> 
            <h1 v-if="race.abilitiesBonus.INT">INT: {{race.abilitiesBonus.INT}}</h1> 
            <h1 v-if="race.abilitiesBonus.WIS">WIS: {{race.abilitiesBonus.WIS}}</h1> 
            <h1 v-if="race.abilitiesBonus.CHR">CHR: {{race.abilitiesBonus.CHR}}</h1> 
        </div>
        <div class="d-flex flex-row">
            <h1>Skills</h1>
            <div  v-for="(item) in race.skills" v-bind:key="item.id">
                <p><input type="checkbox" v-model="item.value" readonly><br> {{item.skillName}}</p>
            </div>
        </div>
        <div >
            <h1>Languages</h1>
            <div class="d-flex flex-row" v-for="(item) in race.languages" v-bind:key="item.id">
                <p>{{item.name}}, </p>
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
