<template>
    <div>
                <div>
                    <h3 >Spell : {{item.name}} ({{item.source}})</h3>
                </div>
                <div>
                    <h3 >{{item.lvl}} level {{item.school}} school</h3>
                </div>
                <div> 
                    <h3 v-if="item.attackRollRequires"> Requires Attack Roll </h3>
                    <h3 v-if="item.ritual"> Ritual </h3>
                </div>
                <div >
                    <h3>Casting Time: {{item.castingTime}}</h3>
                    <h3>Duration: {{item.duration}}</h3>
                    <h3>Range: {{item.range}}</h3>
                </div>
                <div class="d-flex">
                    <h3>Components: </h3>
                    <h3 v-if="item.components.verbal"> verbal, </h3>
                    <h3 v-if="item.components.somatic"> somatic, </h3>
                    <h3 v-if="item.components.material"> material </h3>
                </div>
                <h5> {{item.components.text}} </h5>
                <!-- <div class="col-12">
                    <h3>Description</h3>
                    <div>{{item.descriprion}}</div>
                </div> -->
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
.d-flex h3{
    margin-left: 1em;
}
</style>