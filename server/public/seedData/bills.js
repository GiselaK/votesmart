var request = require('request');
var statesList = require('./statesList');
var apiKey = require('../../apikeys').sunlightlabs;
var billsQueries = require('../../dbOperations/bills')
var sunlightLog = require('../../dbOperations/sunlightLog')
var Promise = require("bluebird");

var baseURL = "http://openstates.org/api/v1/bills/";
var page = 1;
var warned;

var getBillsDetails = function (bills) {
  var getBillDetails = function (state, session, bill_id) {
    var apiReq = baseURL + state + "/" + session + "/" + bill_id + "?apikey=" + apiKey;
    // console.log("Requesting Bill Votes...")
    request(apiReq, function (err, resp, body) {
      // console.log("Err:", apiReq, "DF", body, "HALLAS")
      if (!err) {
        try {
          billsQueries.addBillDetails(JSON.parse(body), function (err, body) {
            if (err) {
              throw err;
            }
          });
          
        } catch (e) {
          getBillDetails(state,session,bill_id)
        }
        // When a console.log fixes your code ^ Very scary!
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
    if (!warned) {
      console.log("WARNING: \n If the database is seeded this code should not be ran (This is regarding a problem with the SunLightLog table). \n If this is the first time seeding the database, it should reach here but this process will take hours. Please close the server to cancel the seeding process");
      warned = true;
    }
  }

  console.log("Requesting Bills...")
  request(apiReq, function (err, resp, apiReqBody) {
    // console.log("Should be nothing", body, "apiReq", apiReq)
      // console.log("Err:", typeof body, "HALLAS")
      try {
        billsQueries.addBills(JSON.parse(apiReqBody), function (err, body){ if (err) {throw err;} getBillsDetails(JSON.parse(apiReqBody))})
      } catch (e) {
        getStateBills(state, lastUpdateDate, page)
      }
      getStateBills(state, lastUpdateDate, page + 1)
  })
};

var getAllStatesBills = function (lastUpdateDate) {
  statesList.forEach(function (state) {
    getStateBills(state.abbreviation, lastUpdateDate)
  })
}

var getLastLogDate = function () {
  console.log("Requesting last update")
    return new Promise(function (resolve, reject) {
      sunlightLog.retrieveLastLogDate(function(lastUpdateDate) {
        resolve(lastUpdateDate)
      })
    }).then(function (lastUpdateDate) {
      console.log("retrievedLastLogDate last update")
      getAllStatesBills(lastUpdateDate);
      sunlightLog.addDateToLog();
    })
}

module.exports = function (send) {
    getLastLogDate(); 
}