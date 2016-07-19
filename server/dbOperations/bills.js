var pg = require("./postgresInteractions");
var async = require('async');
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgresql://localhost/votesmart';
var client = new pg.Client(connectionString);

exports.addBills = function (bills) {
	var query = "INSERT INTO Bills (title, sunlightid, created_at, updated_at, chamber, state, session, bill_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) "
	// TODO: Find a less tedious way of bulk inserts to db

	var saveBillIntoDB = function(bill, callback){ 
		var value = [bill.title,
			 bill.id, bill.created_at,
			 bill.updated_at, bill.chamber,
			 bill.state.toUpperCase(), 
			 bill.session, bill.bill_id]; 

		client.connect(function (err) {
			client.query(query, value, function (err) {
				callback(err)
			});

		})
		// pg.query(query,value,callback);
	}

	async.each(bills, saveBillIntoDB, function(err) {
	  // done();
	  console.log("err", err)
	  // if (err) {
	  //   set_response(500, err, res);
	  //   // logger.error('error running query', err);
	  //   return console.error('error running query', err);
	  // }
	  // logger.info('subscription with created');
	  // set_response(201);
	})
}