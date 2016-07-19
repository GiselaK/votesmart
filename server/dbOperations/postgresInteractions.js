var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgresql://localhost/votesmart';
var client = new pg.Client(connectionString);

exports.query = function (newQuery, values, cb) {
	client.connect(function (err) {
		client.query(newQuery, values, function (err) {
			cb(err)
		});

	})
	// client.end();
}