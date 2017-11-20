var Student = require('../model/student').Student;

exports.index = function(req, res){
    Student.find({}, function(err, docs){
        if(!err){
            res.status(200).json({students:docs});
        }else{
            res.status(200).json({message:err});
        }
    });
    
};

exports.create = function(req, res){
    console.log(req.body);
    var name = req.body.name;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;

    var newStudent = new Student();
    newStudent.name = name;
    newStudent.first_name = first_name;
    newStudent.last_name = last_name;
    console.log('------------');
    newStudent.save(function(err){
        if(!err){
            console.log('ok');
            res.json(201, {message: "Student created with name: " + newStudent.name });      
        }else{
            console.log('error');
            res.json(500, {message: "Couldn't create student. Error:" + err });  
        }
    });
};

exports.show = function(req, res){
    var id = req.params.id;
    Student.findById(id, function(err, doc){
        if(!err && doc){
            res.json(200, doc);
        }else if(err){
            res.json(500, {message:"Error loading student" + err});
        }else{
            res.json(404, {message:"Student not found"});
        }
    })
};

exports.delete= function(req, res){
    console.log("delete");
    var id = req.params.id;
    console.log(id);
    Student.findById(id, function(err, doc){
        if(!err && doc){
            doc.remove();
            res.json(200, {message:"Student removed"});
        }else if(!err){
            res.json(404, {message:"Could not find student"});
        }else{
            res.json(403, {message:"Could nor delete student"})
        }
    })
};

exports.update = function(req, res){
    
    var id = req.params.id;
    var name = req.body.name;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    console.log("Id put method " + id)
    Student.findById(id, function(err, doc){
        if(!err && doc){
            doc.name = name;
            doc.first_name = first_name;
            doc.last_name = last_name;
            doc.save(function(err){
                if(!err){
                    res.json(200, {message:"Student updated " + name});
                }else{
                    res.json(500, {message: "Could not update student"});
                }
            });
        }else if(!err){
            res.json(404, {message: "Could not find student"});
        }else{
            res.json(500, {message:"Could not update student"});
        }
    });
};