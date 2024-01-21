const { MongoClient } = require("mongodb");
require("dotenv").config();
const key = process.env.MONGO_KEY;


async function getWeeks(weeksFromToday = 0) {
   const uri = "mongodb+srv://charity-g:" + key + "@cluster0.n1rc2zq.mongodb.net/?retryWrites=true&w=majority";
   const client = new MongoClient(uri)
   
   try {
       await client.connect();
       
       const database = client.db('ubc-event-horizon');
       const collection = database.collection('events_by_time');
    //    # Specify the Metafield to be added
// let metafield_name = 'your_metafield_name'
// let metafield_value = 'your_metafield_value'

// // # Update all documents in the collection to add the Metafield
//         collection.updateMany(
//             {},
//             {'$set': {metafield_name: metafield_value}}
//             )
//        // Execute the query
       const eventsData = await collection.find().toArray();
       console.log(JSON.stringify(eventsData));
       return eventsData;  // Return the data
   } catch (e) {
       throw e;  // Throw the error to be handled by the caller
   } finally {
       await client.close();
   }
 }

module.exports = getWeeks


async function run() {
  getWeeks(1);
};

run().catch(console.dir);
