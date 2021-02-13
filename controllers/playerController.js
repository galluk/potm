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
        db.Player
            .find({ teamId: mongoose.Types.ObjectId(`${req.params.id}`) })
            .then((dbPlayers) => {
                // get the userIds for players in the team
                let userIds = dbPlayers.map(function (player) {
                    return mongoose.Types.ObjectId(player.userId);
                });
                // get the users associated with the returned players
                db.User.find({ _id: { '$in': userIds } })
                    .then((dbUsers) => {
                        let playerData = dbUsers.map((user) => {
                            // find the user id within the players
                            let thisPlayer = dbPlayers.find((player) => player.userId.toString() === user._id.toString());
                            if (thisPlayer) {
                                return { userId: user._id, firstName: user.firstName, lastName: user.lastName, playerId: thisPlayer._id };
                            }
                            else {
                                return { userId: user._id, firstName: user.firstName, lastName: user.lastName };
                            }
                        })
                       res.json(playerData);
                    })
                    .catch((err) => res.status(422).json(err));
            })
            .catch((err) => res.status(422).json(err));
    },
 
};