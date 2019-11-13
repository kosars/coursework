<template>
    <div>  
        <div>{{id}}</div>
        {{ item.name }} {{ item.class }} {{ item.level }} 
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
            Vue.axios.get("http://localhost:3000/chars/"+this.id).then((response) =>{
                console.log(response.data)
                this.item = response.data;
            })
        },
        computed: {

        },
        methods: {

        }
    }
</script>
