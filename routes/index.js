var express = require('express');
var router = express.Router();
var async = require('async');
var retricon = require('retricon');
var fmt = require('util').format;

/* GET home page. */
router.get('/', function(req, res) {
  var db = req.db;
  var chars = db.get('chars');

  chars.find({}, {}, function(err, data) {
    res.render('index', {
      title: 'Express',
      chars: data
    });
  });
});

/* API Access */

// Get a data dump
router.get('/api/char/get', function(req, res) {
  var db = req.db;
  var chars = db.get('chars');

  chars.find({}, {}, function(err, data) {
    res.json('api', data);
  });
});

// Get a dump for a given character
router.get('/api/char/get/:character', function(req, res) {
  var db = req.db;
  var chars = db.get('chars');
  var character = req.params.character;

  chars.find({letter: character}, {}, function(err, data) {
    if (data.length === 0) {
      data[0] = {
        count: 0,
        letter: character
      };
    }
    res.json('api', data);
  });
});

// Process a string input
router.get('/api/process/:string', function(req, res) {
  var db = req.db;
  var chars = db.get('chars');
  var string = req.params.string;

  async.series([
    // Update mongo with new characters
    function(cb){
      for (var i = 0; i < string.length; i++) {
        var search = string[i];
        var p = chars.insert({
          letter: search,
          date: Date.now()
        });
        p.complete();
      }
      cb(null);
    },
    // Get character counts
    function(cb) {
      var ret = {};
      for (var i = 0; i < string.length; i++) {
        var search = string[i];
        var p = chars.find({letter: search}, {}, function(err, data) {
          ret[data[0].letter] = {
            count: data.length,
            img: fmt("<img alt='kibo' src='%s' />", retricon(data[0].letter, {pixelSize: 16}).toDataURL())
          };
        });
        p.complete();
      }
      // Should improve this
      setTimeout(function() {
        cb(null, ret);
      }, 100);
    }],
    // Return json with character counts
    function(err, results) {
      res.json('api', results[1]);
    });
});

module.exports = router;
