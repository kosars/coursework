'use strict';
module.exports = function(app) {
  var students = require('../controllers/serverController');

  // todoList Routes
  app.route('/students')
    .get(students.list_all_students)
    .post(students.create_a_student);


  app.route('/students/:Students._id')
    .get(students.read_a_student)
    .put(students.update_a_student)
    .delete(students.delete_a_student);
};