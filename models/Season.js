const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SeasonSchema = new Schema({
  name: String,
  description: String,
});

const Season = mongoose.model("Season", SeasonSchema);

module.exports = Season;