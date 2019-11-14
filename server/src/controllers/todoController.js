import mongoose from 'mongoose';
import { ItemSchema, ItemGroupSchema, CharacterSchema } from '../models/todoModel';

const Todo = mongoose.model('Todo', ItemSchema);
const Group = mongoose.model('Group', ItemGroupSchema);
const Char = mongoose.model('Char', CharacterSchema)
var async = require('async');

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
