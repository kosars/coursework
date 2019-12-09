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
  'source':{type:String, default:"Homebrew"},
  'class': {type: String, required: "Please put the class of your character"},
  'race': {type: String, required: "Please put the race of your character"},
  'subrace': {type: String, required: "Please put the race of your character"},
  'background': {type: String, required: "Please put the background of your  character"},
  'aligment': {type: String, required: "Please put aligment of your  character"},
  'level':{type: Number, default:1},
  'xp':{type: Number, default: 0},
  'hpDice': {type: Number, default: 8},
  'armor':{type: Number, default: 0},
  'speed':{type: Number, default: 30},
  'profBonus':{type: Number, default: 2},
  //abilities
  'STR':{type: Number, default: 8},
  'CON':{type: Number, default: 8},
  'DEX':{type: Number, default: 8},
  'INT':{type: Number, default: 8},
  'WIS':{type: Number, default: 8},
  'CHR':{type: Number, default: 8},
  //saveThrows
  'saveThrows': [
    {'name' : String,'value' : Boolean}
  ],
  //skills
  'skills': [
    {'skillName' : String,'value' : Boolean, 'dependence': String}
  ],
  'languages':[{'name' : String}],
  'weaponProf':[{'name' : String}],
  'armorProf':[{'name' : String}],
  //other
  'descriprion':{
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

export const RaceSchema = new Schema({
  'name': {type: String, required: "Please put the name of race"},
  'source':{type:String, default:"Homebrew"},
  'subraceIds':[{type: String}],
  'abilitiesBonus':{
    'STR':{type: Number, default: 0},
    'CON':{type: Number, default: 0},
    'DEX':{type: Number, default: 0},
    'INT':{type: Number, default: 0},
    'WIS':{type: Number, default: 0},
    'CHR':{type: Number, default: 0},
  },
  'speed':{type: Number, default: 30},
  'nightVision':{type: Number, default: 0},
  'damageResistance':{type: String},
  'damageImmunity':{type: String},
  'weaponProf':[{'name' : String}],
  'armorProf':[{'name' : String}],
  'toolProf':[{'name' : String}],
  'languages':[{'name' : String}],  
  'skills': [{'skillName' : String,'value' : Boolean}],
  //other
  'traits':[{'name' : String, 'description': String}],
  'descriprion':{type: String},
  'size':String,
  'image':String,
});

export const SubraceSchema = new Schema({
  'name': {type: String, required: "Please put the name of your subrace"},
  'source': {type: String, default:'Homebrew'},
  'abilitiesBonus':{
    'STR':{type: Number, default: 0},
    'CON':{type: Number, default: 0},
    'DEX':{type: Number, default: 0},
    'INT':{type: Number, default: 0},
    'WIS':{type: Number, default: 0},
    'CHR':{type: Number, default: 0},
  },
  'hpBonus':{type: Number, default:0},
  'speedBonus':{type: Number, default:0},
  'weaponProf':[{'name' : String}],
  'armorProf':[{'name' : String}],
  'toolProf':[{'name' : String}],
  'languages':[{'name' : String}],
  'traits':[{'name' : String, 'description': String}],
  'description': {type: String},
});

export const ClassSchema = new Schema({
  'name': {type: String, required: "Please put the name of class"},
  'source':{type:String, default:"Homebrew"},
  'hitDie':{type:String},
  'savingThrows':{
    'STR':{type: Boolean, default: false},
    'CON':{type: Boolean, default: false},
    'DEX':{type: Boolean, default: false},
    'INT':{type: Boolean, default: false},
    'WIS':{type: Boolean, default: false},
    'CHR':{type: Boolean, default: false},
  },
  //'abilityIncLevel':[{type: Number}],
  'spellcast':{type: Boolean, default: false},
  'spellcastAbility':{type: String, default: 'CHR'},
  //'firstSpellLvl':{type: Number, default: 1},
  'spells':[{'level': Number,'name':String,'spellid':String}],
  'skills': [{'skillName' : String,'value' : Boolean}],
  'traits':[{'name' : String, 'description': String}],
  'descriprion':{type: String},
  'image':String,
});

export const SpellSchema = new Schema({
  'name': {type: String, required: "Please put the name of spell"},
  'source':{type:String, default:"Homebrew"},
  'lvl':{type: Number},
  'school':{type:String},
  'descriprion':{type: String},
  //properties
  'castingTime':{type:String},
  'range':{type:String},
  'duration':{type:String},
  'components':{
    'verbal':{type:Boolean},
    'somatic':{type:Boolean},
    'material':{type:Boolean},
    'text':{type:String}
  },
  'ritual':{type:Boolean},
  'attackRollRequires':{type:Boolean},
});

export const BackgroundSchema = new Schema({
  'name': {type: String, required: "Please put the name of calss"},
  'source':{type:String, default:"Homebrew"},
  'skills': [{'skillName' : String,'value' : Boolean}],
  'proficiencies':{
    'tools':[{'name' : String}],
    'musical':[{'name' : String}],
    'gaming':[{'name' : String}],
    'other':[{'name' : String}],
  },
  'startItems':{
    'gold':{type:Number,default:0},
    'clothes':{type:String,default:"common"},
    'tools':[{'name' : String}],
    'musical':[{'name' : String}],
    'symbols':[{'name' : String}],
    'other':[{'name' : String}],
  },
  'languages':[{'name' : String}],
  'traits':[{'name' : String, 'description': String}],
  'descriprion':{type: String},
  'image':String,
});