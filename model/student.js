var mongoose = require('mongoose');
Schema = mongoose.Schema;

var studentSchema = new Schema({
    name:{type:String, require:true, trim:true, maxlength:50},
    firsName:{type:String, require: true, maxlength:50},
    lastName:{type:String, require: false, maxlength:50},
    rollNumber:{type:String, maxlength:50},
    dateOfBirth:{type:Date},
    birthPlace:{type:String, maxlength:50},
    admissionDate:{type:Date},
    nationality:{type:String, maxlength:50},
    address:{type:String, maxlength:500},
    state:{type:String, maxlength:50},
    telephone:{type:String, maxlength:50},
    cellphone:{type:String, maxlength:50},
    email:{type:String, maxlength:50},
    emailAlerts:{type:Boolean},
    photo:{type:Buffer, contentType: String} //https://stackoverflow.com/questions/29780733/store-an-image-in-mongodb-using-node-js-express-and-mongoose
});

//var student = mongoose.model('student', studentSchema);

module.exports=mongoose.model('student', studentSchema);
