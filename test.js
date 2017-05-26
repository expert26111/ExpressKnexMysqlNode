process.env.NODE_ENV='test';

const chai=require('chai');
const should=chai.should();
const chaiHttp=require('chai-http');
chai.use(chaiHttp);
const server = require('./app');
const app = require('./app');
const knex = require('./server/db/knex');
var queries = require('./server/db/queries');
chai.use(chaiHttp);

describe('API Routes', function() {



    describe('testing queries.js file ', function() {


        it('should post correctly a book to the db', function(done) {
            queries.postBook("Great Book","Yoana and Manish")
            .then(function(data){
                console.log("The data is " , data);
                data.should.have.property('message');
                data.message.should.equal('Book is posted !!!');
                data.should.have.property('id');
                data.id.should.be.a('array');
                data.id.length.should.equal(1);
            })
            .catch(function(error){

            })
            done();
        });

        it('should get correctly a book from the db with id = 2', function(done) {
            queries.getBookbyId(2)
            .then(function(data){
               // console.log("The data is " , data);
                res.should.be.json; // jshint ignore:line
                data.should.have.property('book');
                data.book.should.be.a('array');
                data.book.length.should.equal(1);
                data.book[0].number.should.equal(2);
                data.book[0].title.should.equal("Yoana's city");
                data.book[0].author.should.equal("Yoana Dandarova");
            })
            .catch(function(error){

            })
            done();
        });

        it('should delete a book with an author "Manish TheHacker" ', function(done) {
            queries.deleteByAuthor("Manish TheHacker")
            .then(function(){
                res.should.have.status(204);
            })
            .catch(function(error){

            })
            done();
        });

        it('should update a book with an title "Yoana\'s adventures" to have author Manish Sreshta ', function(done) {
            queries.updateBook("Yoana's adventures")
            .then(function(){
                res.should.have.status(200);
                res.should.be.json; // jshint ignore:line
                res.body.should.have.property('message');
                res.body.message.should.equal('Book\'s Author Updated!!!');
                res.body.should.have.property('id');
                res.body.id.should.equal(1);
            })
            .catch(function(error){

            })
            done();
        });

    });


    describe('testing get methods ', function() {
        it('returns simple route message Hello World ', function(done) {
            chai.request(server)
            .get('/api')
            .end(function(err, res) {
                res.should.be.json; // jshint ignore:line
                res.body.should.have.property('message');
                res.body.message.should.equal('Hello World');
                done();
            });
        });


        it('get book by id', function(done) {
            chai.request(server)
            .get('/api/book/'+2)
            .end(function(err, res) {
              //  console.log("the res is ",res);
                res.should.be.json; // jshint ignore:line
                res.body.should.have.property('book');
                res.body.book.should.be.a('array');
                res.body.book.length.should.equal(1);
                res.body.book[0].number.should.equal(2);
                res.body.book[0].title.should.equal("Yoana's city");
                res.body.book[0].author.should.equal("Yoana Dandarova");
                done();
            });
        });


    });

    describe('DELETE  ', function() {
        it('delete a book by author', function(done) {
            chai.request(server)
            .delete('/api/bookDelete/'+"Yoana Blue")

            .end(function(err, res) {
                res.should.have.status(204);
                done();
            });
        });
    });


    describe('PUT  ', function() {
        it('Update a book auhtor to be "Great staff" by giving book title ', function(done) {
            chai.request(server)
            .put('/api/bookUpdate/'+"Yoana's adventures")
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json; // jshint ignore:line
                res.body.should.have.property('message');
                res.body.message.should.equal('Book\'s Author Updated!!!');
                res.body.should.have.property('id');
                res.body.id.should.equal(1);
                done();
            });
        });
    });


    describe('POST  ', function() {
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

});

