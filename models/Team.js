const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  seasonId: 
    {
      type: Schema.Types.ObjectId,
      ref: "Season"
    },
  name: {
    type: String,
    trim: true,
    unique: true,
    required: "Team name is required"
  },
  showVotes: {
    type: Boolean,
    default: false
  },
  players: [
    {
        type: Schema.Types.ObjectId,
        ref: "Player"
    }
  ]
});

const Team = mongoose.model("Team", TeamSchema);

module.exports = Team;