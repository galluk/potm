const db = require('../models');
const mongoose = require('mongoose');

// Defining methods for the votingController
module.exports = {
    addPlayerVotes: function (req, res) {
        db.GameVote
            .insertMany(req.body)
            .then((dbGameVotes) => dbGameVotes.forEach(function(vote) {
                db.Game.findOneAndUpdate({ _id: req.params.id }, { votes: vote._id }, { new: true })
            }))
            //  res.json(dbGameVotes))
            .catch((err) => res.status(422).json(err));
    },
    getGameVotesByTeam: function (req, res) {
        db.Game.find({ teamId: mongoose.Types.ObjectId(`${req.params.id}`) })
            .then((dbGames) => {
                // get the teamIds that this player is in
                let game_ids = dbGames.map(function (game) {
                    return mongoose.Types.ObjectId(game._Id);
                });
                // get the game votes associated with the returned game_ids
                db.GameVote.find({ gameId: { '$in': game_ids } })
                    .then((dbGameVotes) => {
                        // have the teams associated with this user, now get the games they can vote on
                        console.log(dbGameVotes);
                        res.json(dbGameVotes);
                    })
                    .catch((err) => res.status(422).json(err));
            })
            .catch((err) => res.status(422).json(err));
    },
};