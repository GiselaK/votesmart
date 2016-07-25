var fs = require('fs');

var pg = require('pg');

var db = fs.readFileSync('database.sql').toString();

exports.createDatabase = function (seedDB) {
  var connectionString = process.env.DATABASE_URL || 'postgresql://localhost/votesmart';
  var client = new pg.Client(connectionString);
  client.connect(function (err) {
    if (err) throw err;

    // execute a query on our database
    client.query(db, function (err, result) {
      if (err) throw err;
      seedDB();
      // just print the result to the console
      // console.log(result); // outputs: { name: 'brianc' }


      // disconnect the client
      client.end(function (err) {
        if (err) throw err;
      });
    });    
  })
}
