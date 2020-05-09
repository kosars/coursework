<template>
    <div class="wrapper">
         <!-- Sidebar  -->
        <nav id="sidebar" v-if="$store.getters.getCurrUser">
            <div class="sidebar-header">
                <h3>Homebrew content</h3>
            </div>

            <ul class="list-unstyled components">
                <p>Welcome, {{username}}! <br> <button class="btn btn-dark" v-on:click="logOut()">Log Out</button></p>
                <li>
                    <router-link to="/dice/">Roll a Dice</router-link>
                </li>
                <li>
                    <a v-on:click="menuOne = !menuOne " data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Characters</a>
                    <transition name="fade">
                        <ul v-show="menuOne" class="collapse list-unstyled show" id="homeSubmenu">
                            <li>
                                <router-link to="/ccreator/" >Create Character</router-link>
                            </li>
                            <li>
                                <router-link to="/chars/" >List Characters</router-link>
                            </li>
                        </ul>
                    </transition>
                </li>
                <li>
                    <a v-on:click="menuTwo = !menuTwo"  data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Races</a>
                    <transition name="fade">
                        <ul v-show="menuTwo" class="collapse list-unstyled show" id="pageSubmenu">
                            <li>
                                <router-link to="/rbuilder/">Create Race</router-link>
                            </li>
                            <li>
                                <router-link to="/races/">List Races</router-link>
                            </li>
                        </ul>
                     </transition>
                </li>
                <li>
                    <a v-on:click="menuTree = !menuTree"  data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Classes</a>
                    <transition name="fade">
                        <ul v-show="menuTree" class="collapse list-unstyled show" id="pageSubmenu">
                            <li>
                                <router-link to="/cbuilder/">Create Class</router-link>
                            </li>
                            <li>
                                <router-link to="/classes/">List Classes</router-link>
                            </li>
                        </ul>
                    </transition>
                </li>
                <li>
                    <a v-on:click="menuFour = !menuFour"  data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Backgrounds</a>
                    <transition name="fade">
                        <ul v-show="menuFour" class="collapse list-unstyled show" id="pageSubmenu">
                            <li>
                                <router-link to="/bbuilder/">Create Background</router-link>
                            </li>
                            <li>
                                <router-link to="/backgrounds/">List Backgrounds</router-link>
                            </li>
                        </ul>
                    </transition>
                </li>
                <li>
                    <a v-on:click="menuFive = !menuFive"  data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Spells</a>
                    <transition name="fade">
                        <ul v-show="menuFive" class="collapse list-unstyled show" id="pageSubmenu">
                            <li>
                                <router-link to="/sbuilder/">Spell Builder</router-link>
                            </li>
                            <li>
                                <router-link to="/spells/">List Spells</router-link>
                            </li>
                        </ul>
                    </transition>
                </li>
            </ul>
        </nav>

        <!-- Page Content  -->
        <div id="content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
     data: function() {
            return {
                username:'',
                menuOne: false,
                menuTwo: false,
                menuTree: false,
                menuFour: false,
                menuFive: false,
            };
        },
        mounted: function() {
            this.username = this.$store.getters.getCurrUser
        },
        updated: function() {
            this.username = this.$store.getters.getCurrUser
        },
        methods:{
            logOut: function() {
                this.$store.commit('logOut')
                this.$router.push({ path: '/login' })
            },
        }
}
</script>
<style>
    /* Generic styling */

    h2, h3, h4, h5, h6 {
        font-family: 'Montserrat', sans-serif;
    }
    a,
    a:hover,
    a:focus {
        color: inherit;
        text-decoration: none;
        transition: all 0.3s;
    }
    .centered{
        text-align: center;
    }
    .pt{
        padding-top: 100px;
    }

    button:focus, input:focus {
        outline: none;
    }

    .btn:active {
        opacity: 0.8;
    }

    [v-cloak] {
        display: none !important;
    }
    /*different transition animations */
    .fade-enter-active  {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-active{
        opacity: 0
    }
    .hide-enter-active  {
        transition: max-height 1.0s
    }
    .hide-enter, .hide-leave-active{
        opacity: 0
    }
    .smooth-enter-active, .smooth-leave-active {
        transition: max-height .5s;
    }
    .smooth-enter, .smooth-leave-to {
        max-height: 0;
    }


    /* Sections */

    html, body {
        width: 100%;
        height: 100%;
        margin: 0;
        
    }

    body {
        font-family: 'Lato', sans-serif;
        background-color: #F5F5F5;
        align-items: normal;
        padding: 0;
    }

    #app {
        margin: 0 2rem;
        padding: 0 2rem;
        background-color: white;
        display: flex;
        flex-direction: column;
    }

    .header {
        flex: 0;
        padding: 1rem 0;
    }

    .main {
        display: flex;
        flex-direction: column;
        flex: 1;
        padding-bottom: 2rem;
    }

    .products {
        flex: 3;
    }

    .cart {
        flex: 2;
    }

/* ---------------------------------------------------
    SIDEBAR STYLE
----------------------------------------------------- */

.wrapper {
    display: flex;
    min-height: 100%;
    width: 100%;
    align-items: stretch;
}
#content{
    width: 100%;
    height: 100%;
}
#sidebar {
    min-width: 250px;
    max-width: 250px;
    background: black;
    color: #fff;
    transition: all 0.3s;
}

#sidebar.active {
    margin-left: -250px;
}

#sidebar .sidebar-header {
    padding: 20px;
    background: black;
}

#sidebar ul.components {
    padding: 20px 0;
    border-bottom: 1px solid black;
}

#sidebar ul p {
    color: #fff;
    padding: 10px;
}

#sidebar ul li a{
    padding: 10px;
    font-size: 1.1em;
    display: block;
}

#sidebar ul li a:hover {
    color: black;
    background: #fff;
}

#sidebar ul li.active>a,
a[aria-expanded="true"] {
    color: #fff;
    background: black;
}

a[data-toggle="collapse"] {
    position: relative;
}

.dropdown-toggle::after {
    display: block;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
}

ul ul a {
    font-size: 0.9em !important;
    padding-left: 30px !important;
    background: black;
}

ul.CTAs {
    padding: 20px;
}

ul.CTAs a {
    text-align: center;
    font-size: 0.9em !important;
    display: block;
    border-radius: 5px;
    margin-bottom: 5px;
}

a.download {
    background: #fff;
    color: black;
}

a.article,
a.article:hover {
    background: black !important;
    color: #fff !important;
}
</style>
