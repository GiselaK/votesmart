var express = require('express');
var router = express.Router();
var finances = require('../public/seedData/finances')

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.json();
});

router.get('/politician/:pid', function(req, res, next) {
	finances.getLegislatorProfile(req.params.pid, function (data, err) {
		if(!err) {
			res.json(data);
		} else {
			res.status(404).send(err);
		}
	})
});

router.get('/:sid/politicians', function(req, res, next) {
    finances.getStateLegistators(req.params.sid, function (data, err) {
    	if (!err) {
	        res.json(data);
    	} else {
    		res.status(404).send(err);
    	}
    });
});
module.exports = router;
