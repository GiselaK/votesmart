var request = require('request');
var statesList = require('./statesList');
var apiKey = require('../../apikeys').sunlightlabs;
var bills = require('../../dbOperations/bills')
var sunlightLog = require('../../dbOperations/sunlightLog')
var Promise = require("bluebird");


exports.seedBills = function (send) {
    var page = 1;


    var getStateBills = function (state, date, page) {
      page = page || 1;

      var apiReq = "http://openstates.org/api/v1/bills/?state=" + state + 
      "&apikey=" + apiKey + "&sort=created_at&page=" + page;
      
      if (date) {
        console.log("added date to req")
        apiReq+="&updated_since=" + date;
        console.log(apiReq)
      } else {
        console.log("ERROR: Sunlight Labs API getStateBills")
      }

      request(apiReq, function (err, resp, body) {
           // console.log("body:", body)
        if (body) {
            bills.addBills(JSON.parse(body))
            // getStateBills(state, date, page + 1)
        }

      })
      
    }

    var getAllStatesBills = function (date) {
      // statesList.forEach(function (state) {
        // getStateBills(state.abbreviation)
      // })
      console.log("yay")
      getStateBills("VA", date)
    }
    
    var getLastLogDate = function () {
        return new Promise(function (resolve, reject) {
          sunlightLog.retrieveLastLogDate(function(date) {
            resolve(date)
          })
        }).then(function (date) {
          getAllStatesBills(date);
        })
    }
    getLastLogDate();
    sunlightLog.addDateToLog();

}