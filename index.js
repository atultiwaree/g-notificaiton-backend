const express = require("express");
const app = express();
const http = require("http");
const morgan = require("morgan");
const server = http.createServer(app);
//const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
require("dotenv").config();

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.status(200).json({ status: "Working fine!" }));

const admin = require("firebase-admin");

var serviceAccount = require("./services.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const notifiPayload = {
  channel: "message",
  content: {
    name: "atul",
    roomId: "123",
    title: "Simran sent you messge",
    body: "Hi! Atul What's up ?",
  },
};

/**
 * @Refered_to_this_issue
 * https://github.com/firebase/quickstart-android/issues/1007#issue-530932763
 */

const message = {
  token: "daPlw4LESOS13uz1qcL7Ud:APA91bF47E7pX5F3EA6NLNTrqklurvyFoD1dmmx0iAo5BPyEBVkbu4ufftRy9MyD6DRsZwU4rPDBVazADf1EXMsPgFF6KzSifQsJ7-sL3TwbKLHT_O6fLFyjYSXFdFhvB60BQGaz4j4e",
  android: {
    priority: "high",
    ttl: 2419200,
    restrictedPackageName: "com.newnot",
    data: {
      payload: JSON.stringify(notifiPayload),
    },
  },
};

admin
  .messaging()
  .send(message)
  .then((response) => {
    console.log("Successfully sent message:", response);
  })
  .catch((error) => {
    console.log("Error sending message:", error);
  });

//mongoose.connect(process.env.MONGO_URL, () => console.log(msgConstants.mongoStarted));
server.listen(PORT, (err) => (!err ? console.log(`✔ Node Listening to http://localhost:${PORT}`) : console.log("There was some error ", err.message)));
