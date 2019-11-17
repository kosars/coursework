import mongoose from 'mongoose';
import { ItemSchema, ItemGroupSchema, CharacterSchema, RaceSchema, SubraceSchema } from '../models/todoModel';

const Todo = mongoose.model('Todo', ItemSchema);
const Group = mongoose.model('Group', ItemGroupSchema);
const Char = mongoose.model('Char', CharacterSchema);
const Race = mongoose.model('Race', RaceSchema);
const Subrace = mongoose.model('Subrace', SubraceSchema);
var async = require('async');
//characters
export const addNewCharacter =(req, res)=> {
  let newChar = new Char(req.body);

  newChar.save((err, char)=>{
    if(err){
      res.send(err);
    }
    res.json(char);
  });

};

export const getCharacters = (req, res) =>{
  console.log("inside get characters")
  Char.find({}, (err, list) => {
      if (err) {
          res.send(err);
      }
      res.json(list);
  });
};

export const getCharacter =(req, res) =>{
  Char.findById(req.params.charId, (err, item) => {
     if (err) {
        return res.send(err);
     }
     res.json(item);
});}

export const deleteCharacter = (req, res) =>{
  console.log("char deleted")
  Char.remove({ _id: req.params.charId}, (err, list) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'Character successfully deleted' });
  });
};
//races
export const addNewRace =(req, res)=> {
  let newRace = new Race(req.body);

  newRace.save((err, char)=>{
    if(err){
      res.send(err);
    }
    res.json(char);
  });

};

export const getRaces = (req, res) =>{
  console.log("inside get races")
  Race.find({}, (err, list) => {
      if (err) {
          res.send(err);
      }
      res.json(list);
  });
};

export const getRace =(req, res) =>{
  Race.findById(req.params.raceId, (err, item) => {
     if (err) {
        return res.send(err);
     }
     res.json(item);
});}

export const deleteRace = (req, res) =>{
  console.log("race deleted")
  Race.remove({ _id: req.params.raceId}, (err, list) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'Race successfully deleted' });
  });
};

//subraces
export const addNewSubrace =(req, res)=> {
  let newSubrace = new Subrace(req.body);

  newSubrace.save((err, char)=>{
    if(err){
      res.send(err);
    }
    res.json(char);
  });

};

export const getSubraces = (req, res) =>{
  console.log("inside get subraces")
  Subrace.find({}, (err, list) => {
      if (err) {
          res.send(err);
      }
      res.json(list);
  });
};

export const getSubrace =(req, res) =>{
  Subrace.findById(req.params.subraceId, (err, item) => {
     if (err) {
        return res.send(err);
     }
     res.json(item);
});}

export const deleteSubrace = (req, res) =>{
  console.log("Subrace deleted")
  Subrace.remove({ _id: req.params.subraceId}, (err, list) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'Subrace successfully deleted' });
  });
};



//other
var deleteIds = [];
/* Delete group DELETE /deletegroup/:groupId */
export const deleteGroup =(req, res) =>{
  deleteIds = [];
  Group.findById(req.params.groupId, (err, group) => {
      if (err) {
          res.send(err);
      }else{
          group.todoitems.forEach(function(id) {
              console.log(id);
              deleteIds.push(id);
          });
     async.map(deleteIds,deleteTodos,function(err,data){
              if(err){
                  res.send(err)
              }else{
                Group.remove({ _id: req.params.groupId }, (err, item) => {
                  if (err) {
                      res.send(err);
                  }
                  console.log(item);
                  res.json({ message: 'The group and its to-do-items were deleted.'});
                  });

              }
          })
      }
    });
  }
/* callback function */
function deleteTodos(id,cb){
    Todo.remove({_id: id}, (err, task)=>{
     if(err){
        res.send(err);
    }else{
        cb();
    }
   });

}
var removeId = [];
/* DELETE task /deletetask/:groupId/:taskId  */
export const deleteTask = (req, res) => {
    removeId=[];
    Group.findById(req.params.groupId, (err, item) => {
        if (err) {
            res.send(err);
        }
        else{
                  removeId.push(req.params.taskId);
                  item.todoitems.forEach(function(id) {
                  if(id==req.params.taskId){
                            var index = item.todoitems.indexOf(id);
                            if(index >-1){

                              item.todoitems.splice(index, 1);
                              item.save()
                            };}
                          });
                async.map(removeId, removeTask, function(err, data){
                  if(err){res.send(err)}
                  else{res.send("Success, the item was deleted")}
                })

            };
    }); }
/* callback function */
  function removeTask(id,cb){
      Todo.remove({_id: id}, (err, task)=>{
       if(err){
          res.send(err);
      }else{
          cb();
      }
     });

    }
