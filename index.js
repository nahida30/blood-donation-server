const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;


//middlewares
app.use(cors({origin:['https://blood-donation-f7ec4.web.app','https://blood-donation-f7ec4.firebaseapp.com' ], credentials: true}))
app.use(express.json())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.aj8rb8b.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const userCollection = client.db("donationDb").collection("users")
    const requestCollection = client.db("donationDb").collection("request")
    const blogCollection = client.db("donationDb").collection("blog")
    app.post('/users', async(req, res) => {
      const user = req.body
      const result = await userCollection.insertOne(user)
      res.send(result)
    })

    app.get('/users',  async (req, res) => {
            const result = await userCollection.find().toArray()
            res.send(result)
        })

    app.get('/request', async (req, res) => {
      const result = await requestCollection.find().toArray()
      res.send(result)
    })
    app.get('/blog', async (req, res) => {
      const result = await blogCollection.find().toArray()
      res.send(result) 
    })


    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('welcome')
})

app.listen(port, () => {
  console.log(`Donation is running on port ${port}`)
})