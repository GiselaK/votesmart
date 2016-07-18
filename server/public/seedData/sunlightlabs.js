var request = require('request');
var statesList = require('./statesList');
var apiKey = require('../../apikeys').sunlightlabs;

exports.seedBills = function () {
  // statesList.forEach(function (state) {
    var page = 1;
    var nextPage = true;
    while (nextPage) {
    console.log("whats taking so long")
      request("http://openstates.org/api/v1/bills/?state=" + "ca" + "&apikey=" + apiKey + "&sort=created_at&page=" + page, function (err, resp, body) {
        console.log(body)
      })
      nextPage = false;

      page++;
    }
  // })
}
//TODO: Find a way to store each pages contents from SunlightLabs API