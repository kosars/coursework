'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  photo: {
    type: String,
    default: null
  },
  isDonePr: {
    type: Boolean,
    default: false
  },
  group:{
    type: String,
    default: null
  }
});

module.exports = mongoose.model('Students', TaskSchema);