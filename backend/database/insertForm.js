const { MongoClient } = require('mongodb');
require("dotenv").config();
const key = process.env.MONGO_KEY;

async function submitForm(data) {
  const uri = "mongodb+srv://charity-g:" + key + "@cluster0.n1rc2zq.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri)

  console.log("attempting to submit form")

  try {
    await client.connect();
    const database = client.db('ubc-event-horizon');
    const collection = database.collection('events_by_time');
    // THE MAIN INSERTION
    const result = await collection.insertOne(data);
    return result;
} catch (error) {
    console.error("Error in insertIntoDB:", error);
    throw error;  // Rethrow the error so it can be handled by the caller
} finally {
    await client.close();
}
}

module.exports = submitForm
