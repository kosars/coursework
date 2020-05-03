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
                            <p>NUM</p>
                            <input  class="form-control" type="text" v-model="numOfRolls">
                        </div>
                        <div>
                            <p>DICES</p>
                            <span v-for="(dice) in dices" v-bind:key="dice.id" class="dice-span">
                                <button v-if="dice.name !== 'dX'" class="btn btn-outline-primary" v-on:click="roll(dice)">{{dice.name}}</button>
                            </span>
                        </div>
                        <div>
                            <p>MOD</p>
                            <input class="form-control" type="text" v-model="rollMod">
                        </div>
                        <div >
                            <p>RESULTS</p>
                            <input class="form-control" type="text" v-model="rollRes" readonly placeholder="0">
                        </div>
                    </div>
                </div>

                <div class="chat welcome-block">
                            <div class="col-12">
                                <div class="card" >
                                    <div class="card-header">
                                        <h4>Welcome, {{username}} <span class="float-right">{{connections}} connections</span></h4>
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
                info: [],
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
                this.messages.push({
                    message: data.message,
                    type: 1,
                    user: data.user,
                    action: data.action,
                });
            },
            joined(data){
                // this.info.push({
                //     username: data,
                //     type: 'joined'
                 this.messages.push({
                    message: data + ' joined',
                    type: 1,
                    user: '',
                    action: '',
                });

                // Установка времени ожидания до обнуления массива info
                setTimeout(() => {
                    this.info = [];
                }, 5000);
            },
            // Прослушивание события leave, отправляемого с сервера и добавляющего данные в массив info
            leave(data){
                // this.info.push({
                //     username: data,
                //     type: 'left'/
                this.messages.push({
                    message: data + ' lefted',
                    type: 1,
                    user: '',
                    action: '',
                });
                
                // Установка времени ожидания до обнуления массива info
                setTimeout(() => {
                    this.info = [];
                }, 5000);
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
                this.messages.push({
                    message: msg,
                    type: 0,
                    user: 'You',
                    action: 'say',
                });
                this.$socket.emit('chatmessage', {
                    message: msg,
                    user: this.username,
                    action: 'says',
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
                this.messages.push({
                    message:'+ ' + this.rollMod + ' = '+ this.rollSumm(this.rollRes) + ' [' + this.rollRes+ ']',
                    type: 0,
                    user: 'You',
                    action: 'roll ('+this.numOfRolls+dice.name+')',
                });
                this.$socket.emit('chatmessage', {
                    message:'+ ' + this.rollMod + ' = '+ this.rollSumm(this.rollRes) + ' [' + this.rollRes+ ']',
                    user: this.username,
                    action: 'rolls ('+this.numOfRolls+dice.name+')',
                });
            },
            //возврат случайного числа
            randomNum: function(max,mod){
                return Math.floor(Math.random() * Math.floor(max)) + 1 + parseInt(mod,10)
                //+1 потому что Math.random() возвращает числа в диапазоне [0,max)
            },
            rollSumm:function(a){
                var sum = 0
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
