<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 d-flex">
                    <div class="roll btn">
                        <router-link to="/dice/">
                            <div class="d-flex">
                                <img src="https://game-icons.net/icons/ffffff/000000/1x1/delapouite/dice-twenty-faces-twenty.svg" alt="" class="dice-img text-center">
                                <h5 class="align-self-center">Roll a Dice</h5>
                            </div>
                        </router-link>
                    </div>
                    <div class="logout"><h5>Welcome, {{username}}! <button class="btn btn-secondary" v-on:click="logOut()">Log Out</button></h5></div>
                </div>
                <div class="col-12">
                    <img src="https://orcpub2.com/image/beer-stein.svg" alt="" class="homebrew-img text-center">
                    <h1 class="text-center">Homebrew content for Dungeons & Dragons</h1>
                </div>
            </div>
        </div>
        <div class="container-fluid">
            <div class="row blocks d-flex">
                <div class="col-6 col-md-2 monsters block">
                    <img src="https://orcpub2.com/image/hydra.svg" alt="" class="text-center">
                    <h5 class="text-center">Monsters</h5>
                    <router-link to="/mcreator/" >
                         <p class="text-center">Create Monster </p>
                    </router-link>
                    <!-- <router-link to="/monsters/" class="text-center">
                        <p class="text-center">List Monsters</p>
                    </router-link> -->
                </div>
                <div class="col-6 col-md-2 characters block">
                    <img src="https://orcpub2.com/image/anvil-impact.svg" alt="" class="text-center">
                    <h5 class="text-center">Characters</h5>
                    <router-link to="/ccreator/" >
                         <p class="text-center">Create Character</p>
                    </router-link>
                    <router-link to="/chars/" >
                         <p class="text-center">List Characters</p>
                    </router-link>
                </div>
                <div class="col-6 col-md-2 races block">
                    <img src="https://orcpub2.com/image/orc-head.svg" alt="" class="text-center">
                    <h5 class="text-center">Races</h5>
                    <router-link to="/rbuilder/" >
                         <p class="text-center">Create Race</p>
                    </router-link>
                    <router-link to="/races/" >
                         <p class="text-center">List Races</p>
                    </router-link>
                </div>
                <div class="col-6 col-md-2 classes block">
                    <img src="https://orcpub2.com/image/mounted-knight.svg" alt="" class="text-center">
                    <h5 class="text-center">Classes</h5>
                    <router-link to="/cbuilder/" >
                         <p class="text-center">Create Class</p>
                    </router-link>
                    <router-link to="/classes/" >
                         <p class="text-center">List Classes</p>
                    </router-link>
                </div>
                <div class="col-6 col-md-2 backgrounds block">
                    <img src="https://orcpub2.com/image/vitruvian-man.svg" alt="" class="text-center">
                    <h5 class="text-center">Backgrounds</h5>
                    <router-link to="/bbuilder/" >
                         <p class="text-center">Create Background</p>
                    </router-link>
                    <router-link to="/backgrounds/" >
                         <p class="text-center">List Backgrounds</p>
                    </router-link>
                </div>
                <div class="col-6 col-md-2 spells block">
                    <img src="https://orcpub2.com/image/spell-book.svg" alt="" class="text-center">
                    <h5 class="text-center">Spells</h5>
                    <router-link to="/sbuilder/" >
                         <p class="text-center">Spell Builder</p>
                    </router-link>
                    <router-link to="/spells/" class="text-center">
                        <p class="text-center">List Spells</p>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import store from '../store.js'

    export default {
        data: function () {
            return {
                username:'',
            };
        },
        mounted: function(){
            this.username = this.$store.getters.getCurrUser
        },
        computed: {

        },
        filters:{
            twoSymbAfterDot : function(value){
                return Math.floor(value*100)/100
            }
        },
        methods: {
           logOut: function() {
                this.$store.commit('logOut')
                this.$router.push({ path: '/login' })
            },
        },
    }
</script>
<style>
.blocks{
    margin: 5em;
}
.block{
    padding: 0 1em 0 1em;
}
.block img,.homebrew-img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 100px;
    margin-bottom: 1em;
    background-color: black;
}
.dice-img{
    width: 75px;
    background-color:antiquewhite;
    filter: invert(100%);
}
.block h5{
    margin-bottom: 1em;
}
.roll{
    margin-right: auto;
}
.logout{
    margin-top: 1em;
    margin-left:auto;
}
</style>