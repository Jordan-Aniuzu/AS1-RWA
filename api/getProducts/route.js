export async function GET(req, res) {
    //DATABASE CONNECTION FOR PRODUCTS
    console.log("in the api page")


    const { MongoClient } = require('mongodb');
    const url = 'mongodb://root:example@localhost:27017/'; 
    const client = new MongoClient(url);
    const dbName = 'app'; // DB NAME


    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('products'); // COLLECTS FROM THE PRODUCTS COLLECTION IN DB
    const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);



    return Response.json(findResult)


    
    }
    