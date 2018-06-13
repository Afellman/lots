const express = require("express");
const bodyParser = require("body-parser");

const routes = require('./routes')

const app = express();

const PORT = process.env.PORT || 3001;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("client/build"));
app.use(routes);






app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
