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

const GameVote = mongoose.model('GameVote', GameVoteSchema);

module.exports = GameVote;
