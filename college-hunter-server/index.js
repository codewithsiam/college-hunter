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
    const collegeCollection = client
      .db("collegeHunter")
      .collection("allColleges");
    const userCollection = client.db("collegeHunter").collection("users");
    const admissionCollection = client
      .db("collegeHunter")
      .collection("admission");
    const reviewCollection = client.db("collegeHunter").collection("reviews");
    const researchsCollection = client.db("collegeHunter").collection("researchPapers");

    const indexKey = { collegeName: 1 };
    const indexOptions = { name: "nameSearch" };

    // const result =  await toysCollection.createIndex(indexKey, indexOptions);


        // is admin
        app.get("/users/admin/:email", async (req, res) => {
          const email = req.params.email;
    
          // if (req.decoded.email !== email) {
          //   return res.send({ admin: false });
          // }
    
          const query = { email: email };
          const user = await userCollection.findOne(query);
          const result = { admin: user?.role === "admin" };
          res.send(result);
        });

    // operations
    // all college with search
    app.get("/allColleges", async (req, res) => {
      let query = {};

      // search
      if (req.query?.collegeName) {
        query = {
          collegeName: { $regex: req.query?.collegeName, $options: "i" },
        };
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
      const email = req.query.email;
      console.log(email);
      const filter = { candidateEmail: email };
      const sort = { createdAt: -1 };
      const result = await admissionCollection
        .find(filter)
        .sort(sort)
        .toArray();
      // const result = await admissionCollection.find(filter).toArray();
      res.send(result);
    });

    app.get("/users", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await userCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/manageUsers", async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });
    
    app.put("/users/profile", async (req, res) => {
      const email = req.query.email;
      console.log(email);
      const data = req.body.userData;
      console.log(data);
      const filter = { email: email };
      const updateDoc = {
        $set: {
          name: data?.name,
          university: data?.university,
          address: data?.address,
        },
      };
      
      const result = await userCollection.updateOne(filter, updateDoc);
      if (result.modifiedCount > 0) {
        return res.send({
          success: true,
          message: "Profile updated successfully.",
        });
      } else {
        return res
        .status(500)
        .send({ success: false, message: "Failed to update profile." });
      }
    });
    
    app.post("/users", async (req, res) => {
      const user = req.body;
      // console.log(user);
      const query = { email: user.email };
      
      const existingUser = await userCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: "User already exists" });
      } else {
        const result = await userCollection.insertOne(user);
        res.send(result);
      }
    });
    
    app.patch("/users/role", async (req, res) => {
      const id = req.query.id;
      const role = req.query.role;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          role: `${role}`,
        },
      };
      
      const result = await userCollection.updateOne(filter, updateDoc);
      res.send(result);
    });
    
    app.delete("/users", async (req, res) => {
      const id = req.query.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });
    
    app.get("/researchPapers", async (req, res) => {
      const result = await researchsCollection.find().toArray();
      res.send(result);
    });

    
    // Assuming you have already connected to the MongoDB database and initialized `reviewCollection`
    
    app.get("/reviews", async (req, res) => {
      try {
        const reviews = await reviewCollection.find().toArray();
        return res.send(reviews);
      } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
      }
    });

    app.post("/review", async (req, res) => {
      const data = req.body;

      const filter = { candidateEmail: data?.candidateEmail };
      const exist = await reviewCollection.findOne(filter);
      if (exist) {
        const updateDoc = {
          $set: {
            review: `${data?.review}`,
            rating: `${data?.rating}`,
          },
        };
        const result = await reviewCollection.updateOne(filter, updateDoc);
        res.send(result);
      } else {
        const result = await reviewCollection.insertOne(data);
        res.send(result);
      }
    });

    app.get("/ratings", async (req, res) => {
      const collegeId = req.query.collegeId;
      const query = { collegeId: collegeId };
      const allRatings = await reviewCollection.find(query).toArray();

      let ratingSum = 0;
      allRatings.forEach((rating) => {
        ratingSum += parseFloat(rating.rating);
      });

      let averageRating = 0;
      if (allRatings.length > 0) {
        averageRating = ratingSum / allRatings.length;
      }

      res.send({ averageRating });
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
