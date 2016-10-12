var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/add', function(req, res, next) {
  res.render('add', {});
});

router.post('/add', function(req, res, next){
  MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
    if(err) throw err;

    let item = {
      name: req.body.name,
      category: req.body.category,
      coord: [parseFloat(req.body.long), parseFloat(req.body.lat)]
    };
    
    db.collection('lab9').insert(item, function(err, result){
      if(err) throw err;
      console.log(result);
    });

    db.close();
    res.end('OK');
  });
});

router.get('/search', function(req, res, next){
  res.render('search', {});
});

router.post('/search', function(req, res, next){
  MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
    if(err) throw err;

    let condition = {'$and': [{'coord': {'$near': [parseFloat(req.body.long), parseFloat(req.body.lat)]}}, {'category' : req.body.category}]};

    db.collection('lab9').find(condition, {}, {limit: 3}).toArray(function(err, docs){
      if(err) throw err;

      res.render('search', {items:docs});
      db.close();
    });
  });
});

module.exports = router;
