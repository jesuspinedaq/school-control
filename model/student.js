var mongoose = require('mongoose');
Schema = mongoose.Schema;

var studentSchema = new Schema({
    name:{type:String, require:true, trim:true},
    firs_name:{type:String, require: true},
    last_name:{type:String, require: true}
});

var student = mongoose.model('student', studentSchema);

module.exports={
    Student:student
};