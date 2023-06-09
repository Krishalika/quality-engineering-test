// read variables in .env
require("dotenv").config()

const express = require("express")
const cors = require("cors")
const csv = require('csv-parser');
const fs = require('fs');
const { log } = require("console");

const PORT = Number(process.env.PORT) || 8000
const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.get("/", (req, res) => {
    res.send('Hello world!')
})




const csvFilePath = './finalresults.csv';
// const testPath = './test.csv';

const k = 10;

// Define the API route
app.get('/api/:id', (req, res) => {
    const id = req.params.id;
    const results = [];
  
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        if (row.userID == id) {
          results.push(row);
        }
      })
      .on('end', () => {
        if (results.length === 0) {
          res.status(404).json({ error: 'ID not found' });
          return;
        }


        // Sort results based on prediction_score
        results.sort((a, b) => parseFloat(b.prediction) - parseFloat(a.prediction));
  
        // Get the top 5 items
        const top_k = results.slice(0, k);
  
        res.json(top_k);
        console.log('done')
      })
      .on('error', (err) => {
        // Handle any errors that occur during CSV file processing
        res.status(500).json({ error: 'Internal Server Error' });
        console.error(err);
      });


  });

const testPath = './test.csv';
const stockDataPath = './fullcompanylist.csv';

// Get test items of given id
app.get('/api/test/:id', (req, res) => {
  const id = req.params.id;
  const results = [];

  fs.createReadStream(testPath)
    .pipe(csv())
    .on('data', (row) => {
      if (row.userID == id) {
        results.push(row);
      }
    })
    .on('end', () => {
      if (results.length === 0) {
        res.status(404).json({ error: 'ID not found' });
        return;
      }
      
      fs.createReadStream(stockDataPath)
        .pipe(csv())
        .on('data', (stockRow) => {
          results.forEach((result) => {
            const stockIDSubstring = stockRow.symbol.substring(0, result.itemID.length);
            if (stockIDSubstring === result.itemID) {
              result.businessName = stockRow.name;
              result.businessSummary = stockRow.buisnesssummary;
            }
          });
        })
        .on('end', () => {
          res.json(results);
          console.log(results);
          console.log('done');
        })
        .on('error', (err) => {
          res.status(500).json({ error: 'Internal Server Error' });
          console.error(err);
        });
    })
    .on('error', (err) => {
      res.status(500).json({ error: 'Internal Server Error' });
      console.error(err);
    });
});

app.listen(PORT, () => console.log(`Listening at port ${PORT}`))
