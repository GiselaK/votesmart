var request = require('request');
var Promise = require("bluebird");

var statesList = require('./statesList');
var apiKey = require('../../apikeys').sunlightlabs;
var legislators = require('../../dbOperations/legislators')

var baseURL = "http://openstates.org/api/v1/legislators/?"

module.exports = function (cb) {
	var seedStateLegs = function (state, stateIndex) {
	console.log("Requesting legislators...")
		var apiReq = baseURL + "state=" + state.abbreviation + "&apikey="+ apiKey;
		return new Promise(function (resolve) {
			return request(apiReq, function (err, resp, body) {
				console.log("Retreiving legislators...", body)
				// console.log(body)
				return resolve(apiReq);
			})
		});
		
	}
	// statesList.forEach(function (state, index){ return seedStateLegs(state.abbreviation, index)});

	Promise.all(statesList.map(seedStateLegs)).then(function (body) {
		return new Promise (function (resolve) {
			console.log("in da promise",typeof body)
			legislators.addLegislators(body, function (err, body) {
				console.log(err)
				resolve();
			});		
		})
	})
	.then(function (){
		console.log("Done with legislators. On to Bills")
		cb();
	})
}