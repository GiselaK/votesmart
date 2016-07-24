var seedBills = require('./bills');
var seedLegislators = require('./legislators')

module.exports.seed = function () {
	seedBills();
	seedLegislators();
}