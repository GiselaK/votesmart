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

        console.log("body:", body)
        if (body) {
          // if (typeof JSON.parse(data[data.length-1])[0] === "object") {
            bills.addBills(JSON.parse(body))
            // try {
            //   var blah = JSON.parse(data[data.length-1])[0].title
              
            // } catch (e) {
              // console.log(JSON.parse(data[data.length-1])[0]);
            // }
            
          // } 
          // getStateBills(state, page + 1)
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