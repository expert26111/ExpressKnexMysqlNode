
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
app.use(function(req, res, next) { req.start = Date.now(); next(); });
router.use(function(req, res, next) { req.start = Date.now(); next(); });
var _ = require('underscore');
var responseTime = require('response-time')
app.use(responseTime());
router.use(responseTime());
var StatsD = require('node-statsd')
var stats = new StatsD();
stats.socket.on('error', function (error) {
    console.error(error.stack)
})
//var router = expressPromiseRouter();
process.env.NODE_ENV = 'test';


var knex = require('./server/db/knex');
var queries = require('./server/db/queries');
//app.use(bodyParser());
app.use(bodyParser.json());
//router.use(bodyParser());
app.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
//router(app);
// Router middleware, mentioned it before defining routes.
var port = process.env.PORT || 5000;


app.use(responseTime(function (req, res, time) {
    var stat = (req.method + req.url).toLowerCase()
    .replace(/[:\.]/g, '')
    .replace(/\//g, '_')
    stats.timing(stat, time)
}));
router.use(responseTime(function (req, res, time) {
    var stat = (req.method + req.url).toLowerCase()
    .replace(/[:\.]/g, '')
    .replace(/\//g, '_')
    stats.timing(stat, time)
}));

app.use('/', express.static(__dirname + '/public'));


router.use(function(req,res,next) {
    console.log("/" + req.method);
    next();
});

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'example.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}


app.use(allowCrossDomain);
router.use(allowCrossDomain);

router.use("/book/:id",function(req,res,next){

    if(req.params.id == 0) {
        res.json({"message" : "You must pass ID other than 0"});
    }

    else next();
});



router.get("/",function(req,res,next){
    res.json({"message" : "Hello World"});
});

router.get("/book/:id",function(req,res,next){

   // knex('book').where('number', req.params.id).select()
    queries.getBookbyId(req.params.id)
    .then(function(book) {
        //console.log(book);
        res.status(200).json({"book" : book});
    })
    .catch(function(error) {
       console.error('error: ',error);
    });
});

router.delete("/bookDelete/:bookAuthor",function(req,res,next){
    queries.deleteByAuthor(req.params.bookAuthor)
    .then(function(data){
         res.status(204).json({message : "Successfully deleted!!!Bravo !!!!", id : data})
    })
    .catch(function(error){
        console.error(error);
        res.send(err);
    });

});

router.put("/bookUpdate/:bookTitle",function(req,res,next){

    queries.updateBook( req.params.bookTitle)
    .update({author: 'Manish Sreshta'})
    .then(function(data){
       res.json({message : "Book's Author Updated!!!", id: data});
    })
    .catch(function(error){
        console.error(error);
         res.send(err);
    });



});


router.post("/bookPost", function(req,res,next){
//console.log('The body is ',req.body);
   // var title = req.body.;knex('books').returning(['number']).insert({title: req.body.title, author:req.body.author})
    queries.postBook(req.body.title,req.body.author)
    //queries.getAll()
    .then(function(data){
        res.status(200).json({message : "Book is posted !!!", id : data});
    })
    .catch(function(error){
        console.error(error);
        res.send(err);
    });
});



app.use("/api",router);
router.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status( err.code || 500 )
        .json({
            status: 'error',
            message: err
        });
    });
}



router.use(function(err, req, res, next) {
    res.status(err.status || 500)
    .json({
        status: err.status,
        message: err.message
    });
});

module.exports = app;