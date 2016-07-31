var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgresql://localhost/votesmart';

exports.query = function (newQuery, values, cb) {
	var client = new pg.Client(connectionString);
	client.connect(function (err) {
		if (values) {
			client.query(newQuery, values, function (err, body) {
				if (cb) {
					cb(err, body);
				}
				client.end();
			});

		} else {
			client.query(newQuery, function (err, body) {
				if (cb) {
					cb(err, body);
				}
				client.end();
			});
		}
	})
}

exports.insertQuery = function (tableName, values, cb, query) {
	query = query || "";
	query += "INSERT INTO " + tableName + " (";
	for (var i = 0; i < values.length; i++) {
		query += values[i].fieldName;
		if (i !== values.length-1) {
			query += ",";
		}
	}
	query += ") VALUES (";
	var valuesArr = [];
	for (var i = 0; i < values.length; i++) {
		valuesArr.push(values[i].value)
		query+= "$" + (i+1);
		if (i !== values.length-1) {
			query += ",";
		}
	}
	query += ")";
	exports.query(query, valuesArr, function (err, body) {
		cb(err, body)
	})
}

// exports.updateOrInsert = function (table, query, values, unique) {
// 	var query = "UPDATE" + table + "SET"
// 	var fields = [];
// 	for (field in values) {
// 		fields.push(field)
// 		query+= values[field].name + '=' + values[field].val;
// 	}
// 	query += "WHERE" + unique.name + unique.value;


// }