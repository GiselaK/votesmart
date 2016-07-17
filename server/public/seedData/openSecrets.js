var request = require('request');
var states = require('./statesList');
var apiKey = require('../../apikeys').openSecrets;


parseLegislators = function (body) {
	parseLegislator = function (legislator) {
		legislator = legislator['@attributes'];
		return {
			openSecretsID: legislator.cid, 
			name: legislator.firstlast, 
			gender: legislator.gender, 
			party: legislator.party, 
			website: legislator.website,
			twitter: legislator.twitter_id,
			youtube: legislator.youtube_url,
			form: legislator.webform,
			birthday: legislator.birthday
		};
	}

	var legislators = JSON.parse(body).response.legislator;
	var multipleLegislators = Array.isArray(legislators);

	return multipleLegislators ? legislators.map(function (legislator) {
		return parseLegislator(legislator);
	}) : parseLegislator(legislators);

}

exports.getStateLegistators = function (stateID, send) {

	var stateID = stateID || 0;
	var state = states[stateID].abbreviation;
	var legislators = [];

	request("http://www.opensecrets.org/api/?method=getLegislators&id=" + state + "&apikey=" + apiKey + "&output=json", function (err, resp, body) {
		try {
			send(parseLegislators(body));
		} catch (e) {
			var knownErrorCauses = ["The state was not found in the Open Secrets API"]
			var errorMessage = "Error: " + e.message + "\n Known causes for this error include: ";
			knownErrorCauses.forEach(function (val) {
				errorMessage+= "\n - " + val
			})
			send("Error", errorMessage); 
		}
	});
}
