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
            first_name:'C.',
            last_name:'M.'
        });

        newStudent.save(function(err){
            done();
        });
    });

    afterEach(function(done){
        Student.collection.drop();
        done();
    });

    it('should list ALL students on /students GET', function(done){
        chai.request(server)
        .get('/students')
        .end(function(err, res){
            res.should.be.status(200);
            res.body.should.have.property('students');
            res.body.students.should.be.a('array');
            res.body.students[0].should.have.property('name');
            res.body.students[0].should.have.property('last_name');
            res.body.students[0].name.should.be.equal('Jhon');
            res.body.students[0].last_name.should.be.equal('M.');
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
                response.body.should.have.property('name');
                response.body.should.have.property('last_name');
                response.body.name.should.be.equal('Jhon');
                response.body.last_name.should.be.equal('M.');
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
    //it('should delete a SINGLE student on /students/<id> DELETE', function(){
        // chai.request(server)
        // .get('/students')
        // .end(function(err, res){
        //     console.log(res.body);
            // chai.request(server)
            // .delete('/students/' + res.body.students[0].id)
            // .end(function(err, response){
            //     response.should.be.status(200);
            //     response.should.be.json;
            //     response.body.should.have.a.property('message');
            //     response.body.message.should.be.equal('Student removed');
            //     done();
            // });
        // });
    //});
  });