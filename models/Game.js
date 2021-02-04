const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    teamId: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
    },
    round: Number,
    gameDate: Date,
    opposition: {
        type: String,
        trim: true,
        required: 'Team opposition is required',
    },
    votingOpen: Boolean,
    votes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'GameVote',
        },
    ],
});

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;
