const express = require("express");
const app = express();

const admin = require("firebase-admin");
const credentials = require("./firebase-admin-key.json");

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const db = admin.firestore();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next(); // Pass control to the next middleware
});

app.post("/", async (req, res) => {
  var data = {
    name: "kk",
    email: "john.doe@example.com",
    age: 30,
  };
  await db.collection("users").doc().set(data);
  res.send("done");
});

// Start the server
app.listen(4000, () => {
  console.log(`Server is running at http://localhost:4000`);
});
