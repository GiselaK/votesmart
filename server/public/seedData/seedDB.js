var seedBills = require('./bills');
var seedLegislators = require('./legislators')

module.exports.seed = function () {
	console.log("About to seed legislators")
	seedLegislators(seedBills);
}