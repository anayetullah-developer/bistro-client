const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

app.use(cors());
app.use(express.json());
require('dotenv').config();

//MongoDB Connection

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kkdykse.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


const menuCollection = client.db("bistroBoss").collection("menu");
const reviewCollection = client.db("bistroBoss").collection("reviews");

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

//APIs

app.get("/", (req, res) => {
    res.send("Server working");
})
app.get("/menu", async(req, res) => {
    const result = await menuCollection.find().toArray();
    res.send(result);
})

app.listen(port, () => {
    console.log("Server is running on port", port)
})