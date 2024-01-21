const { MongoClient } = require('mongodb');
require("dotenv").config();
const key = process.env.MONGO_KEY;

console.log(key);

async function storeInMongo(data) {
  const uri = "mongodb+srv://charity-g:" + key + "@cluster0.n1rc2zq.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri)

  console.log("attempting to store")

  try {
    await client.connect();
    const database = client.db('ubc-event-horizon');
    const events = database.collection('events');

    const result = await events.insertOne({ description: data });
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}

module.exports = storeInMongo;
