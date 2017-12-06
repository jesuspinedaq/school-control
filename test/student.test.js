process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var Student = require('../model/student');

var should = chai.should();
chai.use(chaiHttp);

describe('Students', function(done) {
    Student.collection.drop();

    beforeEach(function(done){
        var newStudent = Student({
            name:'Jhon',
            firstName:'C.',
            lastName:'M.',
            rollNumber:'98552060',
            dateOfBirth:new Date(1988,11,3),
            birthPlace:'Nowhere',
            admissionDate:new Date(2013,11,3),
            nationality:'Mexicano',
            address:'Av. Lincon No. 1234',
            state:'Texas',
            telephone:'555-55-5555',
            cellphone:'555-34-3444',
            email:'test@email.com',
            emailAlerts:true
        });

        newStudent.save(function(err){
            done();
        });
    });

    afterEach(function(done){
        Student.collection.drop();
        done();
    });

    function checkStudent(student){

        student.should.have.property('name');
        student.should.have.property('lastName');
        student.should.have.property('rollNumber');
        student.should.have.property('dateOfBirth');
        student.should.have.property('birthPlace');
        student.should.have.property('admissionDate');
        student.should.have.property('nationality');
        student.should.have.property('address');
        student.should.have.property('state');
        student.should.have.property('telephone');
        student.should.have.property('cellphone');
        student.should.have.property('email');
        student.should.have.property('emailAlerts');
     
        student.name.should.be.equal('Jhon');
        student.lastName.should.be.equal('M.');
        student.rollNumber.should.be.equal('98552060');
        student.dateOfBirth.should.be.equal('1988-12-03T07:00:00.000Z');
        student.admissionDate.should.be.equal('2013-12-03T07:00:00.000Z');
        student.birthPlace.should.be.equal('Nowhere');
        student.nationality.should.be.equal('Mexicano');
        student.address.should.be.equal('Av. Lincon No. 1234');
        student.state.should.be.equal('Texas');
        student.telephone.should.be.equal('555-55-5555');
        student.cellphone.should.be.equal('555-34-3444');
        student.email.should.be.equal('test@email.com');
        student.emailAlerts.should.be.true;
    }

    it('should list ALL students on /students GET', function(done){
        chai.request(server)
        .get('/students')
        .end(function(err, res){
            res.should.be.status(200);
            res.body.should.have.property('students');
            res.body.students.should.be.a('array');
            checkStudent(res.body.students[0]);
            done();
        })
    });
    it('should list a SINGLE student on /students/<id> GET', function(done){
        chai.request(server)
        .get('/students')
        .end(function(err, res){
            chai.request(server)
            .get('/students/' + res.body.students[0]._id)
            .end(function(error, response){
                response.should.be.status(200);
                response.should.be.json;
                response.body.should.have.property('_id');
                checkStudent(response.body);
                done();
            })
        })
    });
    it('should add a SINGLE student on /students POST', function(done){
        chai.request(server)
        .post('/students')
        .send({name:'Java', last_name:'Script'})
        .end(function(err, res){
            res.should.be.status(201);
            res.should.be.json;
            res.body.should.have.property('message');
            res.body.message.should.be.equal('Student created with name: Java');
            done();
        })
    });
    it('should update a SINGLE student on /students/<id> PUT', function(done){
        chai.request(server)
        .get('/students')
        .end(function(err, res){
            
            chai.request(server)
            .put('/students/' + res.body.students[0]._id)
            .send({name:'new name', last_name:'new last name'})
            .end(function(err, response){
                response.should.be.a.status('200');
                response.should.be.json;
                response.body.should.have.a.property('message');
                response.body.message.should.be.equal('Student updated new name');
                done();
            });
        });
    });
    // it('should delete a SINGLE student on /students/<id> DELETE', function(){
    //     chai.request(server)
    //     .get('/students')
    //     .end(function(err, res){
    //         console.log(res.body);
    //         chai.request(server)
    //         .delete('/students/' + res.body.students[0].id)
    //         .end(function(err, response){
    //             response.should.be.status(200);
    //             response.should.be.json;
    //             response.body.should.have.a.property('message');
    //             response.body.message.should.be.equal('Student removed');
    //             done();
    //         });
    //     });
    // });
  });