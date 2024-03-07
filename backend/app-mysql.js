const express = require('express')
const mysql = require('mysql2')
const path = require("path");
const logger = require('./utils/logger')
const app = express()
const cors = require('cors')
app.use(cors())
require('dotenv').config()

const db = mysql.createConnection({
  // connectionLimit: 10,
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT,
  database : "goormdb"
})

logger.info("connecting to", process.env.RDS_HOSTNAME)

db.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }

  console.log('Connected to MYSQL.')
})

app.get('/data', (req, res, next) => {

  db.query('SELECT * FROM result', (err, results) => {
    if (err) {
      logger.error('Error fetching datq from MYSQL: ', err)
      res.status(500).send('Error fetching datq from MYSQL')
      return
    }

    let responseData = ''
    results.forEach(row => {
      const keyWords = row.key_word.length === 2 ? 'unknown': row.key_word
      responseData += `ID: ${row.news_id}, Result: ${row.sentiment_result}, Keywords: ${keyWords}\n`
    })

    res.type('text/plain').send(responseData)
  })

})

module.exports = app