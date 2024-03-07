const mysql = require('mysql2')
const fs = require('fs')
const logger = require('../utils/logger')
const path = require('path')
const csvParser = require("csv-parser");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const fileName = 'result.csv'

const connection = mysql.createConnection({
  // connectionLimit: 10,
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT,
  database : "goormdb"
});

logger.info("connecting to", process.env.RDS_HOSTNAME)

connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }

  logger.info('Connected to database.');

  // news_id has been created automatically
  const createStatement = `
    CREATE TABLE IF NOT EXISTS result (
        source VARCHAR(255), 
        date DATE, 
        title VARCHAR(65535), 
        documents VARCHAR(65535), 
        category VARCHAR(255), 
        processed_text VARCHAR(65535), 
        sentiment_result VARCHAR(255), 
        key_word VARCHAR(1000)
        )`

  connection.query(createStatement, (err, result) => {
    if (err) {
      console.error(err)
      return
    }

    importCsv(fileName)
    // You can then call the importCsv function here if you wish
  });

})



function importCsv(filePath) {
  const results = [];
  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      // Insert each row into the 'your_table_name' table
      results.forEach(row => {
        connection.query('INSERT INTO result SET ?', row, (err, result) => {
          if (err) throw err;
          logger.info(result);
        });
      });

      logger.info('CSV file has been processed and data inserted into MySQL');
    })
  }
