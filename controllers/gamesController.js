const db = require('../models');
const mongoose = require('mongoose');

// Defining methods for the gamesController
module.exports = {
    create: function (req, res) {
        db.Game
            .create(req.body)
            .then((dbGame) => res.json(dbGame))
            .catch((err) => res.status(422).json(err));
    },
    findById: function (req, res) {
        db.Game
            .findById(mongoose.Types.ObjectId(`${req.params.id}`))
            .then((dbGame) => res.json(dbGame))
            .catch((err) => res.status(422).json(err));
    },
    findByTeamId: function (req, res) {
        db.Game
            .find({ teamId: mongoose.Types.ObjectId(`${req.params.id}`) })
            .then((dbGames) => res.json(dbGames))
            .catch((err) => res.status(422).json(err));
    },
    findOpenForVotingByUserId: function (req, res) {
        // get all games for the player with the given user id
        db.Player.find({ userId: mongoose.Types.ObjectId(`${req.params.id}`) })
            .then((dbPlayers) => {
                // get the teamIds that this player is in
                let team_ids = dbPlayers.map(function (player) {
                    return mongoose.Types.ObjectId(player.teamId);
                });
                // get the games that are open for voting for the given team_ids
                db.Game.find({ teamId: { '$in': team_ids }, votingOpen: true })
                    .then((dbGames) => {
                        res.json(dbGames);
                    })
                    .catch((err) => res.status(422).json(err));
            })
            .catch((err) => res.status(422).json(err));
    },
    update: function(req, res) {
        db.Game
          .findOneAndUpdate({ _id: mongoose.Types.ObjectId(`${req.body._id}`)}, { $set: req.body })
          .then(dbGame => res.json(dbGame))
          .catch(err => res.status(422).json(err));
      },
    remove: function(req, res) {
        console.log('deleting: ' + req.params.id);
        db.Game
            .findByIdAndDelete(mongoose.Types.ObjectId(`${req.params.id}`))
            // .then(dbGame => res.json(dbGame))
            .catch(err => res.status(422).json(err));
    },
};
