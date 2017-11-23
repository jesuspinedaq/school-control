var Student = require('../model/student');

exports.index = function(req, res){
    Student.find({}, function(err, docs){
        if(!err){
            //res.status(200).json({students:docs});
            res.status(200).json({students:docs})
        }else{
            res.status(500).json({message:err});
        }
    });
};

exports.create = function(req, res){
    var name = req.body.name;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;

    var newStudent = new Student();
    newStudent.name = name;
    newStudent.first_name = first_name;
    newStudent.last_name = last_name;
    newStudent.save(function(err){
        if(!err){
            res.status(201).json({message: "Student created with name: " + newStudent.name });      
        }else{
            res.status(500).json({message: "Couldn't create student. Error:" + err });  
        }
    });
};

exports.show = function(req, res){
    var id = req.params.id;
    Student.findById(id, function(err, doc){
        if(!err && doc){
            res.status(200).json(doc);
        }else if(err){
            res.status(500).json({message:"Error loading student" + err});
        }else{
            res.status(404).json({message:"Student not found"});
        }
    })
};

exports.delete= function(req, res){
    var id = req.params.id;
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
    Student.findById(id, function(err, doc){
        if(!err && doc){
            doc.name = name;
            doc.first_name = first_name;
            doc.last_name = last_name;
            doc.save(function(err){
                if(!err){
                    res.status(200).json({message:"Student updated " + name});
                }else{
                    res.status(500).json({message: "Could not update student"});
                }
            });
        }else if(!err){
            res.status(404).json({message: "Could not find student"});
        }else{
            res.status(500).json({message:"Could not update student"});
        }
    });
};