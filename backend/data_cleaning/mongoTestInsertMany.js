const { MongoClient } = require("mongodb");
require("dotenv").config();
const key = process.env.MONGO_KEY;

// console.log(key);

async function run () {const uri =
  "mongodb+srv://charity-g:" + key + "@cluster0.n1rc2zq.mongodb.net/?retryWrites=true&w=majority";

// The MongoClient is the object that references the connection to our
const client = new MongoClient(uri);

// The connect() method does not attempt a connection; instead it instructs
// the driver to connect using the settings provided when a connection
// is required.
await client.connect();

// Provide the name of the database and collection you want to use.
// If the database and/or collection do not exist, the driver and Atlas
// will create them automatically when you first write data.
const dbName = "ubc-event-horizon";
const collectionName = "events_by_time";

// Create references to the database and collection in order to run
// operations on them.
const database = client.db(dbName);
const collection = database.collection(collectionName);

/*
  .createIndex({ "metadata.sensorId": 1, "timestamp": 1 })
}
async function run_v() {
  const uri =
    "mongodb+srv://charity-g:" + key + "@cluster0.n1rc2zq.mongodb.net/?retryWrites=true&w=majority";

  // The MongoClient is the object that references the connection to our
  const client = new MongoClient(uri);

  // The connect() method does not attempt a connection; instead it instructs
  // the driver to connect using the settings provided when a connection
  // is required.
  await client.connect();

  // Provide the name of the database and collection you want to use.
  // If the database and/or collection do not exist, the driver and Atlas
  // will create them automatically when you first write data.
  const dbName = "ubc-event-horizon";
  const collectionName = "events_by_time";

  // Create references to the database and collection in order to run
  // operations on them.
  const database = client.db(dbName);
  const collection = database.collection(collectionName);

  /*
   *  *** INSERT DOCUMENTS ***
   *
   * You can insert individual documents using collection.insert().
   * In this example, we're going to create four documents and then
   * insert them all in one call with collection.insertMany().
   */

  const events_to_add = require('../data/events_20240120_events_32events.json');

  for (let i = 0; i < events_to_add.length; i++) {
    events_to_add[i]['Date'] = new Date(events_to_add[i]['Date']);
  }

  try {
    const insertManyResult = await collection.insertMany(events_to_add);
    console.log(`${insertManyResult.insertedCount} documents successfully inserted.\n`);
  } catch (err) {
    console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
  }

   // Make sure to call close() on your client to perform cleanup operations
   await client.close();
}
run().catch(console.dir);
