var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.json();
});
router.get('/politician/:pid', function(req, res, next) {
	// req.params.pid
  res.json()
});
module.exports = router;
