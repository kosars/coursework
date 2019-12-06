<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <h3 class="text-center">{{item.name}}</h3>
                <h3 class="text-center">{{item.Source}}</h3>
                <h3 class="text-center">Level : {{item.lvl}}</h3>
                <h3 class="text-center">School : {{item.school}}</h3>
                <h3 class="text-center" v-if="item.attackRollRequires"> Requires Attack Roll </h3>
                <h3 class="text-center" v-if="item.ritual"> Ritual </h3>

                <h3 class="text-center">Casting Time : {{item.castingTime}}</h3>
                <h3 class="text-center">Range : {{item.range}}</h3>
                <h3 class="text-center">Duration : {{item.duration}}</h3>
                <div class="d-flex">
                    <h3 class="text-center">Components</h3>
                    <h3 class="text-center" v-if="item.components.verbal"> verbal </h3>
                    <h3 class="text-center" v-if="item.components.somatic"> somatic </h3>
                    <h3 class="text-center" v-if="item.components.material"> material </h3>
                </div>
                <p class="text-center"> {{item.components.text}} </p>
                

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
            Vue.axios.get("http://localhost:3000/spells/"+this.id).then((response) =>{
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