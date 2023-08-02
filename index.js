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

const FCM = require("fcm-node");
var serverKey = "AAAA35WKSbM:APA91bHrVepH1-K1jGHZl19QktCVMxlZkm2cfUiGOsWW90fZPN_pWZzyiwjuDE0u6x1l6MWIm1PxfYNkGpel4yYzT8nJRLu66XNH5gbfxOk6266ZMQEMl5JvjEmQLlKDsSbD2qQle7Y5"; //put your server key here
var fcm = new FCM(serverKey);

let randCollKey = Math.random();

var message = {
  //this may vary according to the message type (single recipient, multicast, topic, et cetera)
  to: "eS811YQUTdCbXdC1Yopymo:APA91bFw7ZJbn7n8ZMekxZ6C4xTJWNjN88vGoftGpKwgsnnpM0MT1HJEBLxeBrMZNc1c4NK5R1zjk5c5MM4YZLloTeu1XMI5F5RVk2GxGzsjYMixQa27eWNjIs3ei-bfcTrq5uLrcQvK",

  android: {
    collapse_key: "key",
  },

  collapse_key: "key",
  notification: {
    body: "Body of your push notification",
    id: "lbu",
    collapse_key: "key",
    tag: "tag4",
    image: "https://avatars.githubusercontent.com/u/93477615?s=400&u=e97c61f6666640ff095937470007d60c5e625fc7&v=4",
  },

  data: {
    //you can send only notification or only data(or include both)
    my_key: "my value",
    my_another_key: "my another value",
  },
};

for (x = 0; x < 1; x++) {
  fcm.send(message, function (err, response) {
    if (err) {
      console.log("Something has gone wrong!");
    } else {
      console.log("Successfully sent with response: ", response);
    }
  });
}

//mongoose.connect(process.env.MONGO_URL, () => console.log(msgConstants.mongoStarted));
server.listen(PORT, (err) => (!err ? console.log(`✔ Node Listening to http://localhost:${PORT}`) : console.log("There was some error ", err.message)));
