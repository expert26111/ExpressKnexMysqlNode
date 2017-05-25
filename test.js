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
// var p = Promise.resolve(
//     knex.migrate.rollback()
//     .then(function() {
//         knex.migrate.latest()
//         .then(function() {
//             return  knex.seed.run()
//             // .then(function(){
//                 //done();
//             // })
//         });
//     })
                        // );
describe('API Routes', function() {
    describe('GET /api/v1/shows/:id', function() {
        it('should return simple response', function(done) {
            chai.request(server)
            .get('/api')
            .end(function(err, res) {
                res.should.be.json; // jshint ignore:line
                 res.body.should.have.property('message');
                 res.body.message.should.equal('Hello World');
                done();
            });
        });
    });


    describe('POST  ', function() {

        // before(function(done) {
        //     knex.migrate.rollback()
        //     .then(function() {
        //         knex.migrate.latest()
        //         .then(function() {
        //             return  knex.seed.run().then(function(){
        //                 done();
        //             })
        //         });
        //     });
        //     //  p.then(function(){
        //     //      done();
        //     //     console.log('see.. this function is run EACH time');
        //     //  });
        //
        //     // console.log('see.. this function is run EACH time');
        // });



        it('Post a book', function(done) {
            chai.request(server)
            .post('/api/bookPost')
            .send({
                title: 'Great adventures of testing',
                author : 'Yoana and Manish',
            })
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json; // jshint ignore:line
                res.body.should.have.property('message');
                res.body.message.should.equal('Book is posted !!!');
                res.body.should.have.property('id');
                res.body.id.should.be.a('array');
                res.body.id.length.should.equal(1);
               // res.body.id[0].should.equal(227);
                done();
            });
        });
    });



    // afterEach(function() {
    //    knex.migrate.rollback()
    //     .then(function() {
    //         //done();
    //        return Promise.resolve();
    //     });
    //});

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
