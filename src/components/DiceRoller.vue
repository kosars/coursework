<template>  
    <div>
        <div class="container-fluid">
            <div class="row">

                <div class="col-12 welcome-block">
                    <h3 class="text-center">Dungeons & Dragons Dice Roller</h3>
                </div>

                <div class="col-md-12 col-lg-9 dice-block">
                    <div class="col-12 d-flex justify-content-start" >
                        <div class="col-1">
                            <p>NUM</p>
                            <input  class="form-control" type="text" v-model="numOfRolls">
                        </div>
                        <div class="col">
                            <p>DICES</p>
                            <span v-for="(dice) in dices" v-bind:key="dice.id" class="dice-span">
                                <button v-if="dice.name !== 'dX'" class="btn btn-outline-primary" v-on:click="roll(dice)">{{dice.name}}</button>
                            </span>
                        </div>
                        <div class="col-1">
                            <p>MOD</p>
                            <input class="form-control" type="text" v-model="rollMod">
                        </div>
                        <div class="col-3">
                            <p>RESULTS</p>
                            <input class="form-control" type="text" v-model="rollRes" readonly placeholder="0">
                        </div>
                    </div>
                    <!-- <div class="container">
                        <div class="row">
                            <div class="d-flex col-12" v-for="(dice) in dices" v-bind:key="dice.id">
                                    <div class="col-2 d-flex justify-content-center" v-if="dice.name !== 'dX'"><button class="btn btn-outline-primary" v-on:click="roll(dice)">{{dice.name}}</button></div>
                                    <div class="col-2 d-flex justify-content-center" v-else><input class="form-control" type="text" v-model="dice.roll" placeholder="dX"></div>
                                    <div class="col-1"><input  class="form-control" type="text" v-model="dice.numOfRolls"></div>
                                    <div class="col-1">{{dice.name}}</div>
                                    <div class="col-1">+</div>
                                    <div class="col-1"><input class="form-control" type="text" v-model="dice.rollMod"></div>
                                    <div class="col-1"><button class="btn btn-outline-primary" v-on:click="roll(dice)">Roll</button></div>
                                    <div class="col-2"><input class="form-control" type="text" v-model="dice.rollRes" readonly placeholder="Results"></div>
                            </div>
                        </div>
                    </div> -->
                </div>

                <div class="col-12 col-lg-3 welcome-block">
                            <div class="col-12">
                                <div class="card" >
                                    <div class="card-header">
                                        <h4>Welcome, {{username}} <span class="float-right">{{connections}} connections</span></h4>
                                    </div>
                                    <ul class="list-group list-group-flush text-right chat-overflow">
                                        <li class="list-group-item" v-for="message in messages">
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
                                <!-- <h5>Log <button class="btn btn-secondary" v-on:click="clearLog()">Clear</button></h5>    -->
                            </div>
                            <!-- <textarea readonly v-model="rollsLog"  rows="30" class="form-control"
                                placeholder="There is a log of your rolls.This field records your latest roll at its top.">
                            </textarea> -->
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
                    //{название дайса, кол-во роллов, модификатор, результат бросков, макс результат}
                    {name:'d4', numOfRolls:1,rollMod:0,rollRes:[null], roll:4},
                    {name:'d6', numOfRolls:1,rollMod:0,rollRes:[null], roll:6},
                    {name:'d8', numOfRolls:1,rollMod:0,rollRes:[null], roll:8},
                    {name:'d10', numOfRolls:1,rollMod:0,rollRes:[null], roll:10},
                    {name:'d12', numOfRolls:1,rollMod:0,rollRes:[null], roll:12},
                    {name:'d20', numOfRolls:1,rollMod:0,rollRes:[null], roll:20},
                    {name:'d100', numOfRolls:1,rollMod:0,rollRes:[null], roll:100},
                    {name:'dX', numOfRolls:1,rollMod:0,rollRes:[null], roll:null},
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

            // Fired when the server sends something on the "messageChannel" channel.
            messageChannel(data) {
            this.socketMessage = data
            },
            connections(data){
                this.connections = data;
            },
            typing(data){
                this.typing = data;
            },
            stopTyping(){
                this.typing = false;
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
                this.info.push({
                    username: data,
                    type: 'joined'
                });

                // Установка времени ожидания до обнуления массива info
                setTimeout(() => {
                    this.info = [];
                }, 5000);
            },
            // Прослушивание события leave, отправляемого с сервера и добавляющего данные в массив info
            leave(data){
                this.info.push({
                    username: data,
                    type: 'left'
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
            
            // Прослушивание события chat-message, отправленного с сервера и добавленного в массив message
            this.$socket.on('chatmessage', (data) => {
                this.messages.push({
                    message: data.message,
                    type: 1,
                    user: data.user,
                    action: data.action,
                });
            });
            
            
            // Прослушивание события typing, отправленного с сервера и показывающего данные (имя пользователя) в UI
            this.$socket.on('typing', (data) => {
                this.typing = data;
            });

             // Прослушивание события stopTyping, отправленного с сервера и меняющего свойства typing на false
            this.$socket.on('stopTyping', () => {
                this.typing = false;
            });

             // Прослушивание события joined, отправленного с сервера и добавляющего данные в массив info
            this.$socket.on('joined', (data) => {
                this.info.push({
                    username: data,
                    type: 'joined'
                });

                // Установка времени ожидания до обнуления массива info
                setTimeout(() => {
                    this.info = [];
                }, 5000);
            });

            // Прослушивание события leave, отправляемого с сервера и добавляющего данные в массив info
            this.$socket.on('leave', (data) => {
                this.info.push({
                    username: data,
                    type: 'left'
                });
                
                // Установка времени ожидания до обнуления массива info
                setTimeout(() => {
                    this.info = [];
                }, 5000);
            });

             // Прослушивание события connections, отправляемого с сервера. Показывает общее количество подключенных клиентов
            this.$socket.on('connections', (data) => {
                this.connections = data;
            });
        },

        // Vue-хук Watch
        watch: {
            
            // Просматривает изменения во входящих сообщениях и отправляет событие typing или stopTyping
            newMessage(value) {
                value ? this.$socket.emit('typing', this.username) : this.$socket.emit('stopTyping')
            }
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
