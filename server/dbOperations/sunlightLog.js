var pg = require("./postgresInteractions");

exports.addDateToLog = function () {

	var getDate = function () {
      var today = new Date();
      var year = today.getFullYear();
      var month = ((today.getMonth()+1)+"").length === 1 ? "0" + (today.getMonth()+1) : today.getMonth()+1;
      var day = (today.getDate() + "").length === 1 ? "0" + today.getDate() : today.getDate();
      var date = year+"-"+month+"-"+ day;
      return date;
    }

	pg.insertQuery("SunlightLog", [{fieldName: "dated", value: getDate()}], function (err, body){
		if (err) {
			throw err;
		}
	});

}

exports.retrieveLastLogDate = function (cb) {
	var query = "SELECT MAX(dated) FROM sunlightlog;";

	pg.query(query, null, function (err, date) {
		if (err) {
			console.log(err)
		}
		try {
			cb(date.rows[0].max);
		} catch (e) {

		}
		// Is there a way I could do this without rows
	})
}