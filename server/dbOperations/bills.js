var pg = require("./postgresInteractions");

exports.addBills = function (bills) {
	var query = "INSERT INTO Bills (title, sunlightid, created_at, updated_at, chamber, state, session, bill_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) "
	// TODO: Find a less tedious way of bulk inserts to db

	var saveBillIntoDB = function(bill){ 
		var value = [bill.title,
			 bill.id, bill.created_at,
			 bill.updated_at, bill.chamber,
			 bill.state.toUpperCase(), 
			 bill.session, bill.bill_id]; 

		pg.query(query, value);
	}

	bills.forEach(function (bill){saveBillIntoDB(bill)})
}

exports.addBillDetails = function (bill) {
	var addVotes = function () {
		var query = "INSERT INTO Votes (legID, billID, vote) VALUES (1, (SELECT id from bills WHERE bill_id = '" + bill.bill_id + "'), TRUE)";
		// 1 IS TEMPORARY FOR TESTING!!!
		// TODO: Add legislators to db and get their id here
		var addVoteIntoDB = function (vote) {
			pg.query(query);
		}

		if (bill.votes[0]){
			bill.votes[0].yes_votes.forEach(function (vote) {addVoteIntoDB(vote)})
		}
	}
	addVotes();
}