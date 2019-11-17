<template>
    <div>  
        <h1>{{item.name}}</h1> 
        <h5>Size: {{item.size}} Speed: {{item.speed}} ft. Darkvision: {{item.nightVision}} ft. </h5>
        <div>
            <h1 v-if="item.abilitiesBonus.STR">STR: {{item.abilitiesBonus.STR}}</h1>   
            <h1 v-if="item.abilitiesBonus.DEX">DEX: {{item.abilitiesBonus.DEX}}</h1> 
            <h1 v-if="item.abilitiesBonus.CON">CON: {{item.abilitiesBonus.CON}}</h1> 
            <h1 v-if="item.abilitiesBonus.INT">INT: {{item.abilitiesBonus.INT}}</h1> 
            <h1 v-if="item.abilitiesBonus.WIS">WIS: {{item.abilitiesBonus.WIS}}</h1> 
            <h1 v-if="item.abilitiesBonus.CHR">CHR: {{item.abilitiesBonus.CHR}}</h1> 
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
            };
        },
        mounted: function(){
           console.log(this.id);
            Vue.axios.get("http://localhost:3000/races/"+this.id).then((response) =>{
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
