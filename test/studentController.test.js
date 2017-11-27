process.env.NODE_ENV = 'test';

var chai = require('chai');
var should = chai.should();
var sinon = require('sinon');

describe('Student controller test', function(){
    describe('Getggg', function(){
        it('Shoul return students', function(done){

            var err = null;//{message:'somethig'};
            var docs={};
            var obj ={};
            var func = function(err, docs){};
            var Student={
                find:sinon.spy()
            };

            var studentController = require('../controllers/studentsController')(Student);
            var res = {
                status:sinon.spy(),
                json:sinon.spy()
            }

            var req ={message:'ddd'};

            studentController.index(req, res);
            //res.status.alwaysCalledWith(200).should.be.true;
            //res.status.calledOnce;
            //res.status.calledWith(2007777);
            Student.find.calledOnce;
            done();
        });
    });
});

