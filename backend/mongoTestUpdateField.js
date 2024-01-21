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
    const targetCollection = db.collection(targetCollectionName);

    // Retrieve the data from the target collection
    const targetData = await targetCollection.find().toArray();

    const updates = [];

    // Generate the update operations for each source document
    await sourceCollection.find().forEach((sourceDoc) => {
      const targetField = targetData.find((targetDoc) => targetDoc.profileName === sourceDoc.ig_username)?.fullName;

      if (targetField) {
        updates.push({
          updateOne: {
            filter: { _id: sourceDoc._id },
            update: { $set: { clubName: targetField } }
          }
        });
      }
    });

    // Perform the bulk write operation to update multiple documents
    const result = await sourceCollection.bulkWrite(updates);

    console.log('Updated count:', result.modifiedCount);

    console.log('Result:', result);

   // Close the connection
   await client.close();

}


run().catch(console.dir);
