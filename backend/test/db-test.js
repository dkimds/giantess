// Testing whether csv has been inserted


const mysql = require("mysql2")
const path = require("path")
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const con = mysql.createConnection({
  // connectionLimit: 10,
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT,
  database : "goormdb"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM result", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});