var request = require('request');
var statesList = require('./statesList');
var apiKey = require('../../apikeys').sunlightlabs;
var billsQueries = require('../../dbOperations/bills')
var sunlightLog = require('../../dbOperations/sunlightLog')
var Promise = require("bluebird");

var baseURL = "http://openstates.org/api/v1/bills/";
var page = 1;

var getBillsDetails = function (bills) {
  var getBillDetails = function (state, session, bill_id) {
    var apiReq = baseURL + "/" + state + "/" + session + "/" + bill_id + "?apikey=" + apiKey;
    request(apiReq, function (err, resp, body) {
      if (!err) {
        billsQueries.addBillDetails(JSON.parse(body));
      }
    })
  }
  bills.forEach(function (bill) {getBillDetails(bill.state, bill.session, bill.bill_id);})
}

var getStateBills = function (state, lastUpdateDate, page) {
  page = page || 1;

  var apiReq = baseURL + "?state=" + state + 
  "&apikey=" + apiKey + "&sort=created_at&page=" + page;

  // console.log("3:",lastUpdateDate)
  if (lastUpdateDate) {
    apiReq+="&updated_since=" + lastUpdateDate;
  } else {
    console.log("ERROR: Sunlight Labs API getStateBills. If the db is seeded this code should not be ran (This is regarding a problem with the SunLightLog table) If this is the first time seeding the database, it should reach here but this process will take hours. Please close the server to avoid this insanely long seeding process")
  }

  request(apiReq, function (err, resp, body) {
    if (body) {
        billsQueries.addBills(JSON.parse(body))
        getBillsDetails(JSON.parse(body))
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
      sunlightLog.addDateToLog();
    })
}

module.exports = function (send) {
    getLastLogDate(); 
}