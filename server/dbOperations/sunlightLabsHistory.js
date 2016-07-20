var pg = require("./postgresInteractions");

exports.addDateToLog = function (bills) {
	var query = "INSERT INTO SunlightLog (date) VALUES ($1)"

	var getDate = function () {
      var today = new Date();
      var year = today.getFullYear();
      var month = ((today.getMonth()+1)+"").length === 1 ? "0" + (today.getMonth()+1) : today.getMonth()+1;
      var day = (today.getDate() + "").length === 1 ? "0" + today.getDate() : today.getDate();
      var date = year+"-"+month+"-"+ day;
      return date;
    }

	var value = [getDate()];

	pg.query(query, value);

}