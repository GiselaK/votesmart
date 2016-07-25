var express = require('express');
var router = express.Router();
var legislatorsQueries = require('../dbOperations/legislators')

router.get('/', function(req, res, next) {
  res.json();
});

router.get('/politician/:pid', function(req, res, next) {
	legislatorsQueries.getLegislator(req.params.pid, function (err, body) {
		if (!err) {
			res.json(body)
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
