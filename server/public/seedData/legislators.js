var request = require('request');
var statesList = require('./statesList');
var apiKey = require('../../apikeys').sunlightlabs;
var legislators = require('../../dbOperations/legislators')

var baseURL = "http://openstates.org/api/v1/legislators/?"
module.exports = function (cb) {

	var seedStateLegs = function (state, stateIndex) {
		var apiReq = baseURL + "state=" + state + "&apikey="+ "61a5c87624ce4cc49d08e6e7918510f0";
		request(apiReq, function (err, resp, body)  {
			legislators.addLegislators(JSON.parse(body), function () {
				if (index === statesList.length) {
					cb();
				}
			});
		})
	}
	statesList.forEach(function (state, index){seedStateLegs(state, index)});
}