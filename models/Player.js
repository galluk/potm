const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    teamId: {
          type: Schema.Types.ObjectId,
          ref: "Team"
    },
    userId: {
          type: Schema.Types.ObjectId,
          ref: "User"
    }
});

const Player = mongoose.model("Player", PlayerSchema);

module.exports = Player;