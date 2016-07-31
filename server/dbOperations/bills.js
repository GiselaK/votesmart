var pg = require("./postgresInteractions");

exports.addBills = function (bills, cb) {
	// TODO: Find a less tedious way of bulk inserts to db

	var saveBillIntoDB = function(bill){ 
		// console.log("inserting bills")
		var value = [{fieldName: "title", value: bill.title},
			 {fieldName: "sunlightid", value: bill.id},
			 {fieldName: "created_at", value: bill.created_at},
			 {fieldName: "updated_at", value: bill.updated_at},
			 {fieldName: "chamber", value: bill.chamber},
			 {fieldName: "state", value: bill.state.toUpperCase()},
			 {fieldName: "session", value: bill.session},
			 {fieldName: "bill_id", value: bill.bill_id}];

		pg.insertQuery("Bills", value, function (err, body) {
			cb(err, body)
		});
	}

	bills.forEach(function (bill){saveBillIntoDB(bill)})
}

exports.addBillDetails = function (bill, cb) {
	var addVotes = function () {
		var addVoteIntoDB = function (vote) {
			console.log("inserting votes")
			var query = "INSERT INTO Votes (legID, billID, vote) VALUES ((SELECT id from Legislators WHERE sunlightid = '" + vote.leg_id + "') , (SELECT id from bills WHERE bill_id = '" + bill.bill_id + "'), TRUE)";
			// console.log("l egid:", vote.leg_id, "billid:", bill.bill_id)
			pg.query(query, null, function (err, body){
				console.log("idek", query)
				console.log("WTF", err)
				cb(err, body)
			});
		}

		if (bill.votes[0]){
			bill.votes[0].yes_votes.forEach(function (vote) {addVoteIntoDB(vote)})
		}
	}
	addVotes();
}