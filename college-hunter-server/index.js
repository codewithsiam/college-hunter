const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// const uri = "mongodb://0.0.0.0:27017";

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qgjgqwg.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    // my codes here
    const collegeCollection = client.db("collegeHunter").collection("allColleges");
    const userCollection = client.db("collegeHunter").collection("users");
    const admissionCollection = client.db("collegeHunter").collection("admission");

    const indexKey = { collegeName: 1 };
    const indexOptions = { name: 'nameSearch' };
    
    // const result =  await toysCollection.createIndex(indexKey, indexOptions);
   

    // operations
    // all college with search  
    app.get("/allColleges", async (req, res) => {
      let query = {};
      
      // search 
      if (req.query?.collegeName) {
        query = { collegeName: { $regex: req.query?.collegeName, $options: "i" } };
      }

      // limit
      const limit = parseInt(req.query.limit);
      const cursor = collegeCollection.find(query).limit(limit);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/college/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      // here option can be added
      const result = await collegeCollection.findOne(query);
      res.send(result);
    });

    app.post("/admissions", async (req, res) => {
      const collegeData = req.body;
      const result = await admissionCollection.insertOne(collegeData);
      res.send(result);
    });

    app.get("/admissions", async (req, res) => {
      // const email = req.body.email;
      // const filter = { email: email };
      // const sort = { createdAt: -1 };
      // const result = await admissionCollection.find(filter).sort(sort).toArray();
      const result = await admissionCollection.find().toArray();
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log(user);
      const query = { email: user.email };

      const existingUser = await userCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: "User already exists" });
      } else {
        const result = await userCollection.insertOne(user);
        res.send(result);
      }
    });


    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("College server is running...");
});

app.listen(port, () => {
  console.log(`College server is running on port: ${port}`);
});
