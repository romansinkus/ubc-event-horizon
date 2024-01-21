const { MongoClient } = require('mongodb');
require("dotenv").config();
const key = process.env.MONGO_KEY;

async function getFromMongo() {
  const uri = "mongodb+srv://charity-g:" + key + "@cluster0.n1rc2zq.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri)

  console.log("attempting to get events");
  try {
      await client.connect();
      const database = client.db('ubc-event-horizon');
      const events = database.collection('events');

      const eventsData = await events.find().toArray();
      console.log("Events data", eventsData);
      return eventsData;  // Return the data
  } catch (e) {
      throw e;  // Throw the error to be handled by the caller
  } finally {
      await client.close();
  }
}

module.exports = getFromMongo;
