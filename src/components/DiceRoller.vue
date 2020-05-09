<template>  
    <div>
        <div class="container-fluid">
            <div class="row">

                <div class="col-12 welcome-block">
                    <h3 class="text-center">Dungeons & Dragons Dice Roller</h3>
                </div>

                <div class="col-md-12 dice-block">
                    <div class="col-12 d-flex justify-content-start" >
                        <div>
                            <p>Кол-во костей</p>
                            <input  class="form-control" type="num" v-model="numOfRolls" min="1" max="10">
                        </div>
                        <div>
                            <p>Дайсы</p>
                            <span v-for="(dice) in dices" v-bind:key="dice.id" class="dice-span">
                                <button v-if="dice.name !== 'dX'" class="btn btn-outline-primary" v-on:click="roll(dice)">{{dice.name}}</button>
                            </span>
                        </div>
                        <div>
                            <p>Модификатор</p>
                            <input class="form-control" type="num" v-model="rollMod" min="-10" max="10">
                        </div>
                        <div >
                            <p>Результат</p>
                            <input class="form-control" type="text" v-model="rollRes" readonly placeholder="0">
                        </div>
                    </div>
                </div>

                <div class="chat welcome-block">
                    <div class="col-12">
                        <div class="card" >
                            <div class="card-header">
                                <h4>Дарова, {{username}} <span class="float-right">{{connections}} соединений</span></h4>
                            </div>
                            <ul class="list-group list-group-flush text-right chat-overflow">
                                <li class="list-group-item" v-for="message in messages" v-bind:key="message.message">
                                    <span :class="{'float-left':message.type === 1}">
                                        <strong>{{message.user}} {{message.action}}</strong>
                                        {{message.message}}
                                    </span>
                                </li>
                            </ul>
                            <div class="card-body">
                                <form @submit.prevent="send(newMessage)">
                                    <div class="form-group">
                                        <input type="text" class="form-control" v-model="newMessage"
                                            placeholder="Enter message here">
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>					
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    import mCreatorData from '../data/cCreatorData.js'
    import io from 'socket.io-client';
    import VueSocketIO from 'vue-socket.io';
    
    Vue.use(VueAxios,axios)
    export default {
        data: function() {
            return{
                rollsLog:[],
                numOfRolls:1,
                rollMod:0,
                rollRes:[null],
                "dices":
                [
                    //{название дайса, количество граней}
                    {name:'d4', roll:4},
                    {name:'d6', roll:6},
                    {name:'d8', roll:8},
                    {name:'d10', roll:10},
                    {name:'d12', roll:12},
                    {name:'d20', roll:20},
                    {name:'d100', roll:100},
                    {name:'dX', roll:null},
                ],    
                //chat
                newMessage: null,
                messages: [],
                typing: false,
                username: null,
                ready: false,
                connections: 0,
            };
        },
        sockets: {
            connect() {
            // Fired when the socket connects.
            this.isConnected = true;
            console.log("server connected");
            },

            disconnect() {
            this.isConnected = false;
            console.log("server disconnected");
            },

            connections(data){
                this.connections = data;
            },
            chatmessage(data){
                this.messages.unshift({
                    message: data.message,
                    type: 1,
                    user: data.user,
                    action: data.action,
                });
            },
            joined(data){
                 this.messages.unshift({
                    message: data + ' присоеденился',
                    type: 1,
                    user: '',
                    action: '',
                });
            },
            // Прослушивание события leave, отправляемого с сервера и добавляющего данные в массив info
            leave(data){
                this.messages.unshift({
                    message: data + ' покинул нас',
                    type: 1,
                    user: '',
                    action: '',
                });
            },
        },
        mounted(){
            this.username = this.$store.getters.getCurrUser;
            this.addUser();
        },
        created() {
            // Отправление события 'leave' (покидает чат) во вкладку закрытых событий.
            window.onbeforeunload = () => {
                this.$socket.emit('leave', this.username);
            }
             // Прослушивание события connections, отправляемого с сервера. Показывает общее количество подключенных клиентов
            this.$socket.on('connections', (data) => {
                this.connections = data;
            });
        },
        methods: {
            //Метод send сохраняет сообщение пользователя и отправляет событие на сервер.
            send(msg) {
                this.messages.unshift({
                    message: msg,
                    type: 0,
                    user: 'Ты',
                    action: 'говоришь: ',
                });
                this.$socket.emit('chatmessage', {
                    message: msg,
                    user: this.username,
                    action: 'сказал: ',
                });
                this.newMessage = null;
            },

            // Метод addUser отправляет событие joined с именем пользователя и устанавливает значение свойства ready как true.
            addUser() {
                this.$socket.emit('joined', this.username);
            },
           //бросок дайса и отправка сообщения в чат с результатом броска
            roll: function(dice){ 
                this.rollRes = []
                var res = 0
                for(var i=0;i<this.numOfRolls;i++){
                    res = this.randomNum(dice.roll,this.rollMod)
                    this.rollRes.push(res)
                
                };
                //this.rollsLog.unshift('\n\nRoll('+dice.numOfRolls+dice.name+')+'+dice.rollMod+'\nRes: '+dice.rollRes + '\nTotal: '+ this.rollSumm(dice.rollRes))
                this.messages.unshift({
                    message:' = '+ this.rollSumm(this.rollRes, this.rollMod) + ' [' + this.rollRes+ ']',
                    type: 0,
                    user: 'Ты',
                    action: 'кидаешь ('+this.numOfRolls+dice.name+'+' + this.rollMod + ')',
                });
                this.$socket.emit('chatmessage', {
                    message:' = '+ this.rollSumm(this.rollRes, this.rollMod) + ' [' + this.rollRes+ ']',
                    user: this.username,
                    action: 'кидает ('+this.numOfRolls+dice.name+'+' + this.rollMod + ')',
                });
            },
            //возврат случайного числа
            randomNum: function(max,mod){
                return Math.floor(Math.random() * Math.floor(max)) + 1 //+ parseInt(mod,10) //модификатор не должен считаться к каждому броску
                //+1 потому что Math.random() возвращает числа в диапазоне [0,max)
            },
            rollSumm:function(a,mod){
                //var sum = 0
                var sum = parseInt(mod,10) //вместо того чтобы прибавлять модификатор
                for(var i = 0; i < a.length; i++) {sum += a[i]}
                return sum
            },
            clearLog: function(){
                this.rollsLog = []
            },
        },
    }
</script>

<style>
.chat{
    min-width: 640px;
    max-width: 1024px;
}
.chat-overflow{
    max-height: 500px;
    overflow-y: scroll;
}
.welcome-block{
    margin-top: 50px;
}
.dice-block{
    margin-top: 50px;
}    
.dice-span{
    margin: 0px 5px;
}    
</style>
