var express = require('express');
 
var routes = function(Student){
    var studentRouter = express.Router();
    var students = require('../controllers/studentsController')(Student);

    studentRouter.get('/', students.index);
    studentRouter.post('/', students.create);
    studentRouter.get('/:id', students.show);
    studentRouter.delete('/:id', students.delete_);
    studentRouter.put('/:id', students.update);
    return studentRouter;
}
module.exports = routes;