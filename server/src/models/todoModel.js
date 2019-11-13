import mongoose from 'mongoose';

const Schema = mongoose.Schema;


export const ItemSchema = new Schema({
    todo_title: {
        type: String,
        required: "Please put the title of your task"
      },
    name: {type: String},
    created_date: {
      type: Date,
      default: Date.now
    }
});
export const ItemGroupSchema = new Schema({
  group_title: {
    type: String
  },
  todoitems:[{type: Schema.Types.ObjectId, ref: 'Item'}],
  created_date: {
  type: Date,
  default: Date.now
}


});
export const CharacterSchema = new Schema({
  'name': {type: String, required: "Please put the name of your character"},
  'class': {type: String, required: "Please put the class of your character"},
  'race': {type: String, required: "Please put the race of your character"},
  'background': {type: String, required: "Please put the class of background character"},
  'aligment': {type: String, required: "Please put the class of aligment character"},
  'level':{type: Number, default:1},
  'xp':{type: Number, default: 0},
  'armor':{type: Number, default: 0},
  'iniciative':{type: Number, default: 0},
  'speed':{type: Number, default: 30},
  'profBonus':{type: Number, default: 2},
  'abilities': [
    {'name' : String,'value' : Number,'mod' : Number}
  ],
  'saveThrows': [
    {'name' : String,'value' : Number,'learned' : Boolean}
  ],
  'skills': [
    {'name' : String, 'depended': String,'value' : Number,'learned' : Boolean}
  ],
  'passiveWis':Number,
  'hp': {'dieCounts':Number, 'die':Number, 'max':Number},
  'languages':[{'name' : String}],
  'weaponProf':[{'name' : String}],
  'armorProf':[{'name' : String}],
  'descriprion':{
    'name':String,
    'player':String,
    'age':Number,
    'sex':String,
    'height':Number,
    'weight':Number,
    'hairColor':String,
    'eyeColor':String,
    'skinColor':String,
    'personalityTrait1':String,
    'personalityTrait2':String,
    'ideals':String,
    'bonds':String,
    'flaws':String,
    'image':String,
    'backstory':String,
  }
});
