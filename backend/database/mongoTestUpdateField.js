// SELECT *, <output array field>
// FROM collection
// WHERE <output array field> IN (
//    SELECT *
//    FROM <collection to join>
//    WHERE <foreignField> = <collection.localField>
// );

// {
//    $lookup:
//      {
//        from: <collection to join>,
//        localField: <field from the input documents>,
//        foreignField: <field from the documents of the "from" collection>,
//        as: <output array field>
//      }
// }

const moment = require('moment');
const { MongoClient } = require('mongodb');
require("dotenv").config();
const key = process.env.MONGO_KEY;

async function run () {const uri =
  "mongodb+srv://charity-g:" + key + "@cluster0.n1rc2zq.mongodb.net/?retryWrites=true&w=majority";

// The MongoClient is the object that references the connection to our
  const client = new MongoClient(uri);

// The connect() method does not attempt a connection; instead it instructs
// the driver to connect using the settings provided when a connection
// is required.
  await client.connect();
  console.log('connected');
  // Provide the name of the database and collection you want to use.
  // If the database and/or collection do not exist, the driver and Atlas
  // will create them automatically when you first write data.
  const dbName = "ubc-event-horizon";
  const collectionName = "events_by_time";

  // Create references to the database and collection in order to run
  // operations on them.
  const database = client.db(dbName);
  const collection = database.collection(collectionName);
  console.log('before done');
  const result = await collection.updateMany({}, { $set: { metaField: 1 } });
  console.log('done: ', result);// Close the connection
  await client.close();
}


async function run_after() {
   const uri =
     "mongodb+srv://charity-g:" + key + "@cluster0.n1rc2zq.mongodb.net/?retryWrites=true&w=majority";
 
   // The MongoClient is the object that references the connection to our
   const client = new MongoClient(uri);
   await client.connect();

   // Provide the name of the database and collection you want to use.
   // If the database and/or collection do not exist, the driver and Atlas
   // will create them automatically when you first write data.
   const dbName = "ubc-event-horizon";
   const sourceCollectionName = "events_by_time";
   const targetCollectionName = "club-ig-profile";
   
   const db = client.db(dbName);
  
   const sourceCollection = db.collection(sourceCollectionName);

   const updates = [];

    // Generate the update operations for each source document
    const sourceJsonObjs = await sourceCollection.find().toArray();
    console.log(JSON.stringify(sourceJsonObjs))
    sourceJsonObjs.map((sourceDoc) => {
    // Convert Node.js DateTime object to string format
    const dateString = moment(sourceDoc['Date']).utc().format('YYYYMMDD') + 'T';
    console.log(dateString); // Output: 20240121

    // Convert "HH:MM" string format to string format
    const startTimeString = sourceDoc['Start Time'];
    const endTimeString = sourceDoc['End Time'];
    const fullStartDateTimeString = startTimeString ? dateString + startTimeString.replace(':', '') + '00Z' : null;
    const fullEndDateTimeString =  endTimeString ? dateString + endTimeString.replace(':', '') + '00Z' : null;
    console.log(fullStartDateTimeString + '  ' +  fullEndDateTimeString)
    if (fullStartDateTimeString && fullEndDateTimeString) {
      const ics_desc = "BEGIN:VCALENDAR\nBEGIN:VEVENT\nSUMMARY:" + sourceDoc['Event Title'] + "\nDTSTART:" + fullStartDateTimeString + "\nDTEND: " + fullEndDateTimeString + "\nDESCRIPTION:" + sourceDoc['Event Description'] + "\nLOCATION:" + sourceDoc['Location'] + "\nEND:VEVENT\nEND:VCALENDAR";
      updates.push({
            updateOne: {
              filter: { _id: sourceDoc._id },
              update: { $set: { _ics: ics_desc } }
              }
            });
    }
  }
  );
  console.log('---');
  console.log(updates.length);
  console.log(sourceJsonObjs.length);
  
  // Perform the bulk write operation to update multiple documents
  const result = await sourceCollection.bulkWrite(updates);

  console.log('Updated count:', result.modifiedCount);

  console.log('Result:', result);

   // Close the connection
   await client.close();

}


run_after().catch(console.dir);
