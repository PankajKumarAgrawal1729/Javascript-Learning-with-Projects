const { assert } = require("console");
const { MongoClient, ServerApiVersion } = require("mongodb");
// Replace the placeholder with your Atlas connection string
const uri = "mongodb://localhost:27017";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);
const dbName = 'fruitDB';

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const database = await client.db(dbName).command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    await insert(database, function(){
        client.close();
    })
  } 
//   finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
catch{
    console.dir;
}
}
run();


async function insert(database, callback) {
  try {
    console.log("called");
    const fruits = database.collection("fruits");
    // create a document to insert
    const fruit = 
        {
            name: "Apple",
            score: 8,
            review: "Great fruit"
        };
//    await fruits.insertMany(fruit, function(err, result){
//     assert.equal(err, null);
//     assert.equal(3, result.result.n);
//     assert.equal(3, result.ops.length);
//     console.log(("Inserted"));
//     callback(result);
//    });
const result = await fruits.insertOne(fruit);

    // console.log(`A document was inserted with the _id: ${result.insertedId}`);
    callback(result);
  } 
//   finally {
//     await client.close();
//   }
catch{
    console.dir;
}
}

