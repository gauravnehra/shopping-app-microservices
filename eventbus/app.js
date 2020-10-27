const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(require("cors")());

app.use("/", require("./routes/route"));

const server = app.listen(process.env.PORT || 4444, () => {
  console.log("Eventbus Server started...", server.address().port);
});
