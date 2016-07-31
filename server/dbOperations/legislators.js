var pg = require("./postgresInteractions");

exports.addLegislators = function (legislators, cb) {

		// console.log("inserting legislator:", typeof legislators[0])
	legislators.forEach(function (legislator) {
		legislator = JSON.parse(legislator);
		console.log(Object.keys(legislator))
		var values = [{fieldName: "name", value: legislator.full_name},
		{fieldName: "sunlightid", value: legislator.leg_id},
		{fieldName: "img", value: legislator.photo_url},
		{fieldName: "website", value: legislator.url},
		{fieldName: "party", value: legislator["+party"]},
		{fieldName: "state", value: legislator.state},
		{fieldName: "chamber", value: legislator.chamber}]

		pg.insertQuery("Legislators", values, cb)
	})
}

exports.getLegislator = function (id, cb) {
	var query = "SELECT l.*, v.* FROM Legislators AS l JOIN Votes as v ON l.id = v.leg_id WHERE l.id = '" + id + "'";

	pg.query(query, null, function (err, body) {
		cb(err, body);
	})
}