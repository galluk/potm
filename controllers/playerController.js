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
    // getPlayersInTeam: function (req, res) {
    //     db.Player
    //         .find({ teamId: mongoose.Types.ObjectId(`${req.params.id}`) })
    //         .then((dbPlayers) => {
    //             // get the teamIds that this player is in
    //             let userIds = dbPlayers.map(function (player) {
    //                 return mongoose.Types.ObjectId(player.userId)
    //             });
    //             // get the users associated with the returned players
    //             db.User.find({ _id: { '$in': userIds } })
    //                 .then((dbUsers) => {
    //                     let players = dbUsers.map(function (user) {
    //                         return { firstName: user.firstName, lastName: user.lastName, }
    //                     })
    //                     console.log(dbGameVotes);
    //                     res.json(dbGameVotes);
    //                 })
    //                 .catch((err) => res.status(422).json(err));
    //         })
    //         .catch((err) => res.status(422).json(err));
    // },
 
};