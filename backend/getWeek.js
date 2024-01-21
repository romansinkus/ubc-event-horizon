const { MongoClient } = require("mongodb");
require("dotenv").config();
const key = process.env.MONGO_KEY;


async function run() {
   const uri = "mongodb+srv://charity-g:" + key + "@cluster0.n1rc2zq.mongodb.net/?retryWrites=true&w=majority";
   const client = new MongoClient(uri)
   

   const day_to_dayOfWeek = ['MON', 'TUE', 'WED', 'THURS', 'FRI', 'SAT', 'SUN'] //index is dayOfWeek
   let today_date = new Date();
   today_date = new Date(today_date.toDateString())
   const dayOfWeek = today_date.getUTCDay() == 0 ? 6 : today_date.getUTCDay(); // 0 (Monday) to 6 (Sunday)
   const monday = new Date(today_date.getTime() - (dayOfWeek  * 24 * 60 * 60 * 1000));
   const week_dates = [];
   for (let i = 0; i < 7; i++) {
      d = new Date(monday.getTime() + (i  * 24 * 60 * 60 * 1000));
      week_dates.push(d);
   }
   const sunday = week_dates[6];
   console.log(today_date);
      
   console.log("attempting to get events");
   try {
       await client.connect();
       
       const database = client.db('ubc-event-horizon');
       const collection = database.collection('events_by_time');
 
       const query = {
         'Date': {
         $gte: monday,
         $lte: sunday
         }
       };
       
       // Execute the query
       const eventsData = await collection.find(query).toArray();
       console.log("Events data", eventsData);
       
       eventsOfTheWeek = {'MON': [], 'TUE': [], 'WED': [], 'THURS': [], 'FRI': [], 'SAT': [], 'SUN': []}
       for (ev of eventsData) {
         let index = week_dates.findIndex((x) => {return x.toDateString() === ev['Date'].toDateString()});
         let key = day_to_dayOfWeek[index];
         eventsOfTheWeek[key] = ev;
       }
       console.log(eventsOfTheWeek)
       return eventsOfTheWeek;  // Return the data
   } catch (e) {
       throw e;  // Throw the error to be handled by the caller
   } finally {
       await client.close();
   }
 }
 


 
 
run().catch(console.dir);