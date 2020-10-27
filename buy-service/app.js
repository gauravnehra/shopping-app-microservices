const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(require("cors")());

app.use("/", require("./routes/route"));

const server = app.listen(process.env.PORT || 3333, () => {
  console.log("Buying Server started...", server.address().port);
  connectToDatabase();
});

function connectToDatabase() {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to buying DB...");
    })
    .catch((err) => {
      console.log("Could not connect to buying DB...", err);
      process.exit();
    });
}
