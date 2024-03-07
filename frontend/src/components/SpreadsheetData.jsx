import React, { useState, useEffect } from 'react';
import '../style.css'

const SPREADSHEET_ID = '스프레디시트 ID';
const RANGE = 'visualization!B50:C58';
const API_KEY = 'API 비밀번호'

// Fetch data from Google Sheets
const fetchData = async () => {
  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`);
  const data = await response.json();
  return data.values || []; // Ensures a default empty array if data.values is undefined
};

// Process the fetched data to group by sentiment
const groupBySentiment = (data) => {
  return data.reduce((acc, [sentiment, term]) => {
    if (!acc[sentiment]) {
      acc[sentiment] = [];
    }
    acc[sentiment].push(term);
    return acc;
  }, {});
};

const SpreadsheetData = () => {
  const [groupedData, setGroupedData] = useState({});

  useEffect(() => {
    fetchData().then(data => {
      const grouped = groupBySentiment(data);
      setGroupedData(grouped);
    });
  }, []);

  return (
    <div>
      {Object.keys(groupedData).length > 0 ? (
        <table className='pretty-table'>
          <thead>
          <tr>
            <th>Sentiment</th>
            <th>Terms</th>
          </tr>
          </thead>
          <tbody>
          {Object.entries(groupedData).map(([sentiment, terms], index) => (
            <tr key={index}>
              <td>{sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}</td>
              <td>{terms.join(', ')}</td>
            </tr>
          ))}
          </tbody>
        </table>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default SpreadsheetData;
