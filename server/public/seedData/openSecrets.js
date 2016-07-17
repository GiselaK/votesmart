var request = require('request');
var states = require('./statesList');
var apiKey = require('../../apikeys').openSecrets;

exports.getStateLegistators = function (stateID, send) {
	var stateID = stateID || 0;
	var state = states[stateID].abbreviation;
	var legislators = [];
	request("http://www.opensecrets.org/api/?method=getLegislators&id=" + state + "&apikey=" + apiKey + "&output=json", function (err, resp, body) {
		if (err) {
			console.log(err)
		}
		else {
			send(JSON.parse(body).response.legislator.map(function (legislator) {
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
			}));
		}

	});
}
