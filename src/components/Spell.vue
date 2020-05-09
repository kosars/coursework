<template>
    <div>
                <div class="centered">
                    <h3 v-if="!item.ritual">{{item.name}} </h3>
                    <h3 v-if="item.ritual">{{item.name}} (Ritual) </h3>
                    <h5>({{item.source}})</h5>
                    <h3 v-if="item.lvl !== 0" >{{item.lvl}} level, {{item.school}}</h3>
                    <h3 v-if="item.lvl == 0" >Cantrip, {{item.school}}</h3>
                </div>
                <br>
                <div class="d-flex justify-content-center"> 
                    <div class="col-6">
                        <table class="table table-dark table-bordered">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col-4">Casting Time</th>
                                    <th scope="col-4">Duration</th>
                                    <th scope="col-4">Range</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{item.castingTime}}</td>
                                    <td>{{item.duration}}</td>
                                    <td>{{item.range}}</td>
                                </tr>
                                <tr v-if="item.components">
                                    <th> Components:</th>
                                    <td colspan="2">{{item.components}}</td>
                                </tr>
                                <tr v-if="item.materials">
                                    <th>Materials:</th>
                                    <td colspan="2">{{item.materials}} </td>
                                </tr>
                                <tr >
                                    <td colspan="3">{{item.description}}</td>
                                </tr>
                            </tbody>
                        </table>
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
.d-flex h3{
    margin-left: 1em;
}
</style>