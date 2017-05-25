process.env.NODE_ENV='test';

const chai=require('chai');
const should=chai.should();
const chaiHttp=require('chai-http');
chai.use(chaiHttp);

const server=require('./app');
const app =require('./app');
const knex=require('./server/db/knex');

chai.use(chaiHttp);
// if(process.env.NODE_ENV != 'test') {
//     knex.migrate.latest([environment])
// }

var cleanUp = function(params){
    // return
    // new Promise(function(fulfill,reject){
    //     doSomething()
    //     .then(doAnotherThing())
    //     .then(doOneLastThing())
    //     .then(
    //         function(result){
    //             fulfill(result);
    //         },
    //         function(err){
    //             reject(err);
    //         })
    //
    // });

    return Promise.all([
        knex.migrate.rollback()
    ]).then(function(){
        return Promise.all([
        knex.migrate.latest()
        ])
    })

};

describe('API Routes', function() {

    before(function(done) {
       knex.migrate.rollback()
       .then(function() {
           knex.migrate.latest()
           .then(function() {
                return knex.seed.run()
                .then(function() {
                    done();
                });
           });
        });

        console.log('see.. this function is run EACH time')
        //done();
    });

    describe('GET /api/v1/shows/:id', function() {
        it('should return simple response', function(done) {
            chai.request(server)
            .get('/api')
            .end(function(err, res) {
                //res.should.have.status(200);
                res.should.be.json; // jshint ignore:line
                // res.body.should.be.a('object');
                 res.body.should.have.property('message');
                 res.body.message.should.equal('Hello World');
                // res.body.should.have.property('channel');
                // res.body.channel.should.equal('USA Network');
                // res.body.should.have.property('genre');
                // res.body.genre.should.equal('Drama');
                // res.body.should.have.property('rating');
                // res.body.rating.should.equal(3);
                // res.body.should.have.property('explicit');
                // res.body.explicit.should.equal(false);
                done();
            });
        });
    });


    afterEach(function(done) {
        knex.migrate.rollback()
        .then(function() {
            done();
        });
    });

    // describe('Get all shows', function() {
    //     it('first route returns hello world', function(done) {
    //         chai.request(server)
    //         .get('/api/')
    //         .end(function(err, res) {
    //            // res.should.have.status(200);
    //             console.log("the res is " ,res);
    //             res.should.be.json; // jshint ignore:line
    //            // res.body.should.be.a('array');
    //            // res.body.length.should.equal(4);
    //              res.body[0].should.have.property('message');
    //             // res.body[0].message.should.equal('Hello World');
    //             // res.body[0].should.have.property('channel');
    //             // res.body[0].channel.should.equal('USA Network');
    //             // res.body[0].should.have.property('genre');
    //             // res.body[0].genre.should.equal('Drama');
    //             // res.body[0].should.have.property('rating');
    //             // res.body[0].rating.should.equal(3);
    //             // res.body[0].should.have.property('explicit');
    //             // res.body[0].explicit.should.equal(false);
    //             done();
    //         });
    //     });
    // });




});















// describe('routes : books',()=>{
//     // beforeEach((done)=>{
//     // knex.seed.run().then(()=>{
//     //     done();
//     //              });
//     //       });
//
//
//
//
//
// it('Returns HTML format ',function(done){
//     request(app).get('/').expect('Content-Type',/html/,done);
//
// });
//
//
// });
