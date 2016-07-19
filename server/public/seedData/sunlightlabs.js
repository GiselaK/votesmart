var request = require('request');
var statesList = require('./statesList');
var apiKey = require('../../apikeys').sunlightlabs;
var Promise = require("bluebird");
var bills = require('../../dbOperations/bills')

exports.seedBills = function (send) {
  // statesList.forEach(function (state) {
    var page = 1;

    var getStateBills = function (state, page) {
      page = page || 1;
      request("http://openstates.org/api/v1/bills/?state=" + state + "&apikey=" + apiKey + "&sort=created_at&page=" + page, function (err, resp, body) {
        if (body) {
            bills.addBills(JSON.parse(body))
            getStateBills(state, page + 1)
        }

      })
      
    }
    var getAllStatesBills = function (cb) {
      statesList.forEach(function (state) {
        getStateBills(state.abbreviation)
      })
    }
    getAllStatesBills();

}
//TODO: Find a way to store each pages contents from SunlightLabs API