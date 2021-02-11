const db = require('../models');
const mongoose = require('mongoose');

// Defining methods for the gamesController
module.exports = {
    create: function (req, res) {
        // set ids
        let player = {userId: mongoose.Types.ObjectId(`${req.body.userId}`), 
                      teamId: mongoose.Types.ObjectId(`${req.body.teamId}`)}
        console.log(player);
        db.Player
            .create(player)
            .then((dbPlayer) => res.json(dbPlayer))
            .catch((err) => res.status(422).json(err));
    },
    getPlayersInTeam: function (req, res) {
        console.log('getting players in hte team');

        db.Player
            .find({ teamId: mongoose.Types.ObjectId(`${req.params.id}`) })
            .then((dbPlayers) => {
                console.log('got players in hte team');
                
                // get the userIds for players in the team
                let userIds = dbPlayers.map(function (player) {
                    return mongoose.Types.ObjectId(player.userId);
                    // return player.userId
                });
                console.log(userIds);
                // get the users associated with the returned players
                // db.Game.find({ teamId: { '$in': team_ids }, votingOpen: true })
                db.User.find({ _id: { '$in': userIds } })
                    .then((dbUsers) => {
                       res.json(dbUsers);
                    })
                    .catch((err) => res.status(422).json(err));
            })
            .catch((err) => res.status(422).json(err));
    },
 
};