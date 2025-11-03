const express = require('express')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config()

<<<<<<< HEAD
// Use this agent in your HTTPS requests

=======



>>>>>>> 3fe6571 (Added .node-version to use Node 20 on Render)
// Connection URL
const url = process.env.MONGO_URI || 'mongodb+srv://shivanshmishraa224_db_user:yOI7tkkMhzLFiypY@cluster0.abedz2l.mongodb.net/?appName=Cluster0';
const dbName = 'passOP';
const app = express()
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 3000



async function startserver() { 
try{   
const client = new MongoClient(url);


await client.connect();
console.log('✅ Connected to MongoDB Atlas');






//get all the passwords
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})
//save all the passwords
app.post('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);

    res.send({ success: true, result: findResult })
})


// delete a passwords
app.delete('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);

    res.send({ success: true, result: findResult })
})

app.listen(port, () => {
    console.log(`Example app listening on  http://localhost:${port}`)
});
} catch (err) {
    console.error('❌ Error connecting to MongoDB:', err);
    process.exit(1);
  }
}

startserver();
