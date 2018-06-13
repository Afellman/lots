const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const astroidScheme = new Schema({
  name: String,
  size: 
    {
      min: Number,
      max: Number
    },
  distance: String,
  speed: String
});

const Astroid = mongoose.model("Astroid", astroidScheme);

module.exports = Astroid;
