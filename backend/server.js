const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const { exec } = require('child_process');
const storeInMongo = require('./database/insertEvents.js');  // to insert stuff 
const getFromMongo = require('./database/getEvents.js') // to get stuff
const submitForm = require('./database/insertForm.js') // to insert form
const getWeeks = require('./database/getWeek.js') // get scraped data to send and display on frontend
const cors = require('cors');

app.use(cors());
// tells express instance to use this "middleware" for all incoming HTTP post requests in JSON format
app.use(bodyParser.json());

app.get('/run-python-script', (req, res) => {
  exec('python ./data_cleaning/insta_cleaning.py', async (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send(`Error: ${error.message}`);
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return res.status(500).send(`Error: ${stderr}`);
    }
    
    // Store the Python script output in MongoDB
    await storeInMongo(stdout);
    res.send('Data stored in MongoDB');
  });
});

app.post('/api/storeForm', async (req, res) => {
    try {
      const result = await submitForm(req.body);
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error storing form data");
  }
});

app.get('/api/events', async (req, res) => {
  try {
    const eventsData = await getFromMongo(); // Call the function
    console.log("sending back data")
    res.json(eventsData); // Send the data as JSON response
} catch (error) {
    console.error(error);
    res.status(500).send("Error fetching events");
}
});

app.get('/api/getWeek', async (req, res) => {
  try {
    const weekData = await getWeeks(); // Call the function
    console.log("got weeks")
    res.json(weekData); // Send the data as JSON response
} catch (error) {
    console.error(error);
    res.status(500).send("Error fetching events");
}
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
