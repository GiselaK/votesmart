var express = require('express');
var router = express.Router();
var openSecrets = require('../public/seedData/openSecrets')

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.json();
});

router.get('/politician/:pid', function(req, res, next) {
    // req.params.pid
  res.json()
});

router.get('/:sid/politicians', function(req, res, next) {
    openSecrets.getStateLegistators(req.params.sid, function (data) {
    	if (data) {
	        res.json(data)
    	} else {
    		res.status(404).send("Error: Cannot find the state requested")
    	}
    });
});
module.exports = router;
