const express = require("express");
const app = express();
const admin = require("firebase-admin");
require("dotenv").config();

const credentials = require("./config/firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(credentials),
});
const db = admin.firestore();

app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

app.post("/", async (req, res) => {
  var data = req.body;
  const users = db.collection("users").doc();
  await users.set(data);
  res.send(users.id);
});

app.listen(4000, () => {
  console.log(`Server is running at http://localhost:4000`);
});
