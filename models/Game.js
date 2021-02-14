const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameVoteSchema = new Schema({
    playerId: {
        type: Schema.Types.ObjectId,
        ref: 'Player',
    },
    votedPlayerId: {
        type: Schema.Types.ObjectId,
        ref: 'Player',
    },
    points: Number,
});

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
    venue: {
        type: String,
        trim: true,
    },
    votingOpen: { 
        type: Boolean,
        default: false,
    },
    votes: [GameVoteSchema],
    // votes: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'GameVote',
    //     },
    // ],
});

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;
