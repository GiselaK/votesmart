var pg = require("./postgresInteractions");

exports.addLegislators = function (legislators) {
	var query = "INSERT INTO Legislators (name, sunlightid, img, website, party, state, chamber) VALUES ($1, $2, $3, $4, $5, $6, $7) "

	legislators.forEach(function (legislator) {
		var values = [legislator.full_name,
			legislator.leg_id, legislator.photo_url,
			legislator.url, legislator["+party"],
			legislator.state, legislator.chamber];

		pg.query(query, values)
	})
}

exports.getLegislator = function (id, cb) {
	var query = "SELECT party FROM Legislators WHERE id = '" + id + "'";

	pg.query(query, null, function (err, body) {
		cb(err, body);
	})
}