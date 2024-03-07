const express = require('express')
const logger = require('./utils/logger')
const Airtable = require('airtable')
const app = express()
const cors = require('cors')
app.use(cors())
require('dotenv').config()

app.use(express.static('dist'))

const base = new Airtable({apiKey: process.env.PERSONAL_TOKEN}).base(process.env.TABLE_ID)
function cleanTextFragments(textArray) {
  // Step 1: Extract and clean text fragments from the array
  const cleanedArray = textArray.flatMap(item => {
    // Remove leading/trailing square brackets and single quotes, then split by "', '"
    return item.replace(/^\[]$/g, '').split("', '");
  }).filter(item => item !== ''); // Filter out any empty strings that may result

  // Step 2: Concatenate text fragments
  const resultArray = cleanedArray.reduce((acc, item) => {
    // Check if the current item should concatenate with the previous one
    if (item.startsWith('##')) {
      acc[acc.length - 1] += item.slice(2); // Remove '##' and concatenate
    } else {
      // For items not starting with '##', push as new element
      acc.push(item);
    }
    return acc;
  }, []);

  return resultArray.map(item => item.replace(/^'|'$/g, ''));
}


base('result').select({
  // Specify your Airtable view
  view: "Grid view"
}).eachPage(function page(records, fetchNextPage) {
  records.forEach(record => {
    // 'key_word' is the field name with the data
    const textFragments = record.get('키워드');
    if (textFragments) {
      const cleanedData = cleanTextFragments(textFragments.split(', ')); // Assuming the data is a comma-separated string
      logger.info(cleanedData)
      // Update the record with cleaned data in 'key_words'
      base("result").update([
        {
          "id": record.id,
          "fields": {
            "키워드": cleanedData.join(', ') // Join the array back into a string if needed
          }
        }
      ], function(err, records) {
        if (err) {
          logger.error(err);
          return;
        }
        logger.info('Updating records.');
      });
    }
  });

  fetchNextPage();
}, function done(err) {
  if (err) {
    logger.error(err);
    return;
  }

  console.log('done')
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './dist', 'index.html'))
})

module.exports = app
