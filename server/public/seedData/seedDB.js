var seedBills = require('./bills');
var seedLegislators = require('./legislators')

module.exports.seed = function () {
	seedLegislators(seedBills);
}