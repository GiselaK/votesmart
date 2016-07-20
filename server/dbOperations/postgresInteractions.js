var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgresql://localhost/votesmart';

exports.query = function (newQuery, values, cb) {
	var client = new pg.Client(connectionString);
	client.connect(function (err) {
		if (values) {
			client.query(newQuery, values, function (err) {
				client.end();
			});

		} else {
			client.query(newQuery, function (err, body) {
				cb(body);
				client.end();
			});
		}
	})
}