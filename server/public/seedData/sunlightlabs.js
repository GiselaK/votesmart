var request = require('request');
var statesList = require('./statesList');
var apiKey = require('../../apikeys').sunlightlabs;
var bills = require('../../dbOperations/bills')
var sunlightLog = require('../../dbOperations/sunlightLog')
var Promise = require("bluebird");

var baseURL = "http://openstates.org/api/v1/bills/";

exports.seedBills = function (send) {
    var page = 1;

    var getBillVoteInfo = function (state, session, bill_id) {
      var apiReq = baseURL + "/" + state + "/" + session + "/" + bill_id + "?apikey=" + apiKey;
      request(apiReq, function (err, resp, body) {
        bills.addBillDetails(JSON.parse(body));
      })
    }

    var getStateBills = function (state, lastUpdateDate, page) {
      page = page || 1;

      var apiReq = baseURL + "?state=" + state + 
      "&apikey=" + apiKey + "&sort=created_at&page=" + page;

      if (lastUpdateDate) {
        apiReq+="&updated_since=" + lastUpdateDate;
      } else {
        console.log("ERROR: Sunlight Labs API getStateBills. If the db is seeded this code should not be ran (This is regarding a problem with the SunLightLog table) If this is the first time seeding the database, it should reach here but this process will take hours. Please close the server to avoid this insanely long seeding process")
      }

      request(apiReq, function (err, resp, body) {
        if (body) {
            bills.addBills(JSON.parse(body))
            getStateBills(state, lastUpdateDate, page + 1)
        }

      })
      
    };


    var getAllStatesBills = function (lastUpdateDate) {
      statesList.forEach(function (state) {
        getStateBills(state.abbreviation, lastUpdateDate)
      })
    }
    
    var getLastLogDate = function () {
        return new Promise(function (resolve, reject) {
          sunlightLog.retrieveLastLogDate(function(lastUpdateDate) {
            resolve(lastUpdateDate)
          })
        }).then(function (lastUpdateDate) {
          getAllStatesBills(lastUpdateDate);
        })
    }

    // getLastLogDate();
    getBillVoteInfo("ny", "2015-2016", "S 6545")
   

}