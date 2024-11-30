import { MongoClient } from 'mongodb';

const url = 'mongodb+srv://jordananiuzu:SIDEMENxix123@kky3.4edz1.mongodb.net/?retryWrites=true&w=majority&appName=KKY3';
const client = new MongoClient(url);

export async function GET(req) {
  try {
    await client.connect(); // DATABSE CONNECTION
    const db = client.db('KK'); //DB NAME
    const donutsCollection = db.collection('donuts');  //COLLECTIOB

    // FETCHES FROM DONUTS TO AN ARRAY
    const donuts = await donutsCollection.find().toArray();

    // CLOSES THE DB
    await client.close();

    // RETRUNS DONUTS AS JSON NOT HTML
    return new Response(JSON.stringify(donuts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching donuts:', error);

    // ERROR HANDLING IF IT FAILS TO FETCH
    return new Response(JSON.stringify({ error: 'Failed to fetch donuts' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
