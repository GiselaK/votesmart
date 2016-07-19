var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgresql://localhost/votesmart';

exports.query = function (newQuery, values, cb) {
	var client = new pg.Client(connectionString);
	client.connect(function (err) {
		client.query(newQuery, values, function (err) {
			console.log(err)
			client.end();
		});

	})
}