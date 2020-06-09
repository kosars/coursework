<template>  
    <div>
        <div class="container-fluid">
            <div class="row">

                <div class="col-12 welcome-block">
                    <h3 class="text-center">Dungeons & Dragons Dice Roller</h3>
                </div>
                <div class="col-12">
                    <table class="table">
                        <thead class="thead">
                            <tr>
                                <th scope="col">Кол-во костей</th>
                                <th scope="col">Дайсы</th>
                                <th scope="col">Модификатор</th>
                                <th scope="col">Результат</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input  class="form-control" type="number" v-model="numOfRolls" min="1" max="10"></td>
                                <td><span v-for="(dice) in dices" v-bind:key="dice.id" class="dice-span">
                                <button v-if="dice.name !== 'dX'" class="btn btn-outline-primary" v-on:click="roll(dice)">{{dice.name}}</button>
                            </span></td>
                                <td><input class="form-control" type="number" v-model="rollMod" min="-10" max="10"></td>
                                <td> <input class="form-control" type="text" v-model="rollRes" readonly placeholder="0"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-12"><br></div>
                <div class="col-12 col-xl-6">
                    <table class="table table-hover">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Имя</th>
                                <th scope="col">ХП/MAX</th>
                                <!-- <th scope="col">Стресс/MAХ</th> -->
                                <th scope="col">Состояние</th>
                                <th scope="col">Инициатива/Бонус</th>
                                <th scope="col">КД</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item) in characters" v-bind:key="item._id">
                                <td>{{item.name}}</td>
                                <td>{{item.hp}}/{{item.maxHP}}</td>
                                <!-- <td>{{item.stress}}/{{item.maxStress}}</td> -->
                                <td>{{item.condition}}</td>
                                <td>{{item.iniciative}}/{{item.iniciativeBonus}}</td>
                                <td>{{item.ac}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-12 col-xl-6">
                    <div class="col-12">
                        <div class="card" >
                            <div class="card-header">
                                <h4>Пользователи: <span class="float-right">{{users}}</span></h4>
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
                                        <!-- <input type="text" class="form-control" v-model="newMessage"
                                            placeholder="Enter message here" maxlength="200"> -->
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12" v-show="dm">
                    <div class="col-12">
                        <div class="input-group">
                            <select class="form-control" type="text" v-model="selectedCharacter">
                                <option v-for="(item,index) in localCharacters" v-bind:key="item._id" v-bind:value="index">{{item.name}}</option>
                            </select>
                            <input class="form-control"  type="number" min="-100" max="100" v-model="points">
                        </div>
                        <br>
                        <button class="btn btn-danger" v-on:click="hitCharacter(selectedCharacter, points)">Ненести урон</button>
                        <!-- <button class="btn btn-dark" v-on:click="stressCharacter(selectedCharacter, points)">Добавить стресс</button> -->
                        <button class="btn btn-success" v-on:click="restoreCharacter(selectedCharacter)">Рестор</button>
                    </div>
                    <br>
                    <button class="btn btn-dark" v-on:click="addCharacter()">Добавить существо</button>
                    <button class="btn btn-dark" v-on:click="updateCharacters()">Обновить для всех</button>
                    <button class="btn btn-danger float-right" v-on:click="clearCharacters()">Очистить список</button>
                        <table class="table table-hover">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Имя</th>
                                    <th scope="col">ХП/MAX</th>
                                    <!-- <th scope="col">Стресс/MAХ</th> -->
                                    <th scope="col">Состояние</th>
                                    <th scope="col">Инициатива/Бонус</th>
                                    <th scope="col">КД</th>
                                    <th>Удалить</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in localCharacters" v-bind:key="item._id">
                                    <td><input v-on:change="updateCharacters()" class="form-control" type="text" v-model="item.name"></td>
                                    <td>
                                        <input v-on:change="updateCharacters()" class="form-control" type="number" min="-1000" max="1000" v-model="item.hp" required>/
                                        <input v-on:change="updateCharacters()" class="form-control" type="number" min="0" max="1000" v-model="item.maxHP" required>
                                    </td>
                                    <!-- <td>
                                        <input v-on:change="updateCharacters()" class="form-control" type="number" min="0" max="200" v-model="item.stress" required>/
                                        <input v-on:change="updateCharacters()" class="form-control" type="number" min="0" max="200" v-model="item.maxStress" required>
                                    </td> -->
                                    <td><input v-on:change="updateCharacters()" class="form-control" type="text" v-model="item.condition"></td>
                                    <td>
                                        <button class="btn btn-primary" v-on:click="rollIniciative(index)">{{item.iniciative}}</button>
                                        <input v-on:change="updateCharacters()" class="form-control" type="number" min="-10" max="10" v-model="item.iniciativeBonus" required>
                                        
                                    </td>
                                    <td><input v-on:change="updateCharacters()" class="form-control" type="number" min="0" max="20" v-model="item.ac" required></td>
                                    <td><button class="btn btn-danger" v-on:click="deleteChar(index)">X</button></td>
                                </tr>
                            </tbody>
                        </table>
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
                dm: false,
                newMessage: null,
                messages: [],
                users:[],
                characters:[],
                selectedCharacter:0,
                points:0,//очки для нанесения урона/стресса
                localCharacters:[],
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

                this.updateCharacters();
            },
            // Прослушивание события leave, отправляемого с сервера и добавляющего данные в массив info
            leave(data){
                this.messages.unshift({
                    message: data + ' покинул нас',
                    type: 1,
                    user: '',
                    action: '',
                });

                this.updateCharacters();
            },
            updateChars(data){
                this.characters = data;
            },
            update(data){
                this.users = data;
            },
        },
        mounted(){
            this.username = this.$store.getters.getCurrUser;
            this.dm = (this.username == 'DM');//проверка на дма
            this.addUser();//отправляем на сервер сообщение о подключении
            this.updateCharacters();


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

            if (localStorage.getItem('localCharacters')) {
                try {
                    this.localCharacters = JSON.parse(localStorage.getItem('localCharacters'));
                } catch(e) {
                    localStorage.removeItem('localCharacters');
                }
            }
        },
        destroyed(){
            this.$socket.emit('leave', this.$store.getters.getCurrUser);
        },
        watch: {
        },
        methods: {
            //Метод send сохраняет сообщение пользователя и отправляет событие на сервер.
            send(msg) {
                if(msg !== null && msg !== '' && msg !== '')
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
                this.newMessage = '';
            },
            updateCharacters(){
                if(this.dm){
                    //this.localCharacters.sort(GetSortOrder("iniciative"),function(a, b){return b-a}); //сортировка по убыванию
                    this.$socket.emit('updateChars', this.localCharacters);   
                    this.characters = this.localCharacters;//обновление локального списка
                    this.saveCharacters();//сохранение данных в localStorage
                }
            },
            //сохранение персонажей в localStorage
            saveCharacters(){
                const parsed = JSON.stringify(this.localCharacters);
                localStorage.setItem('localCharacters', parsed);
            },
            clearCharacters(){
                this.characters=[];
                this.localCharacters=[];
                this.updateCharacters();
                this.messages.unshift({
                    message: '',
                    type: 0,
                    user: 'Ты',
                    action: 'очистил таблицу персонажей.',
                });
                
            },
            // Метод addUser отправляет событие joined с именем пользователя и устанавливает значение свойства ready как true.
            addUser() {
                this.$socket.emit('joined', this.username);
            },
            addCharacter(){
                this.localCharacters.push({
                    'name':'',
                    'hp':0,
                    'maxHP':0,
                    'stress':0,
                    'maxStress':0,
                    'condition':'',
                    'iniciative':0,
                    'iniciativeBonus':0,
                    'ac':0,
                });
                this.updateCharacters();
            },
            deleteChar(index){
                this.localCharacters.splice(index, 1);
                this.updateCharacters();
            },
            hitCharacter(i,val){
                if(this.localCharacters && typeof(parseInt(val,10)) == "number" && val != 0){
                    this.$set(this.localCharacters[i],'hp', ( this.localCharacters[i].hp - parseInt(val,10)));
                this.updateCharacters();
                }
                else{alert("Введите корректное значение")}
            },
            stressCharacter(i,val){
                if(this.localCharacters && typeof(parseInt(val,10)) == "number" && val != 0){
                    this.$set(this.localCharacters[i],'stress', ( this.localCharacters[i].stress + parseInt(val,10)));
                this.updateCharacters();
                }
                else{alert("Введите корректное значение")}
            },
            restoreCharacter(i){
                 if(this.localCharacters){
                    this.$set(this.localCharacters[i],'hp', ( this.localCharacters[i].maxHP));
                    this.$set(this.localCharacters[i],'stress', 0);
                this.updateCharacters();
                }
                else{alert("Нет ни одного персонажа")}
            },
           //бросок дайса и отправка сообщения в чат с результатом броска
            roll: function(dice){ 
                this.rollRes = []
                var res = 0
                for(var i=0;i<this.numOfRolls;i++){
                    res = this.randomNum(dice.roll)
                    this.rollRes.push(res)
                
                };
                //this.rollsLog.unshift('\n\nRoll('+dice.numOfRolls+dice.name+')+'+dice.rollMod+'\nRes: '+dice.rollRes + '\nTotal: '+ this.rollSumm(dice.rollRes))
                this.messages.unshift({
                    message:' = '+ ' [' + this.rollRes+ ']' + ' В сумме = ' +this.rollSumm(this.rollRes, this.rollMod),
                    type: 0,
                    user: 'Ты',
                    action: 'кидаешь ('+this.numOfRolls+dice.name+'+' + this.rollMod + ')',
                });
                this.$socket.emit('chatmessage', {
                    message:' = '+ ' [' + this.rollRes+ ']' + ' В сумме = ' +this.rollSumm(this.rollRes, this.rollMod),
                    user: this.username,
                    action: 'кидает ('+this.numOfRolls+dice.name+'+' + this.rollMod + ')',
                });
            },
            //возврат случайного числа
            randomNum: function(max){
                return Math.floor(Math.random() * Math.floor(max)) + 1 //+ parseInt(mod,10) //модификатор не должен считаться к каждому броску
                //+1 потому что Math.random() возвращает числа в диапазоне [0,max)
            },
            rollSumm:function(a,mod){
                var sum = parseInt(mod,10) //вместо того чтобы прибавлять модификатор
                for(var i = 0; i < a.length; i++) {sum += a[i]}
                return sum
            },
            rollIniciative(i){
                this.$set(this.localCharacters[i],'iniciative', (this.randomNum(20)+ parseInt(this.localCharacters[i].iniciativeBonus,10)));
                this.updateCharacters();
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
    overflow-x: hidden;
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
