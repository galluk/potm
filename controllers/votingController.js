const db = require('../models');
const mongoose = require('mongoose');

// Defining methods for the votingController
module.exports = {
    addPlayerVotes: function (req, res) {
        // db.GameVote.insertMany(req.body)
        //     .then((dbGameVotes) => {
        //         dbGameVotes.forEach(function (vote) {
        //             console.log(vote);
        //             // db.Game.findOneAndUpdate({ _id: mongoose.Types.ObjectId(`${req.params.id}`) }, { votes: vote._id }, { new: true });
                    db.Game.findOneAndUpdate(
                        { _id: mongoose.Types.ObjectId(`${req.params.id}`) },
                        { $push: { 'votes': req.body } }
                    ).then(game => {
                        console.log('update result: ' + JSON.stringify(game));
                        res.json(game) 
                    })
                // });
                // res.json(dbGameVotes)
            // })
            .catch((err) => res.status(422).json(err));
    },
    getGameVotesByTeam: function (req, res) {
        console.log('getting votes ' + req.params.id);
        
        db.Game.find({ teamId: mongoose.Types.ObjectId(`${req.params.id}`) })
            .then((dbGames) => {
                // get the games belonging to this team
                let votes = [];
                dbGames.forEach((game) => {
                    if (game.votes.length > 0) {
                        votes = votes.concat(game.votes);
                    }
                })
                res.json(votes);

                console.log(votes);
            })
            //     // get the game votes associated with the returned game_ids
            //     db.GameVote.find({ gameId: { '$in': voteIds } })
            //         .then((dbGameVotes) => {
            //             // have the teams associated with this user, now get the games they can vote on
            //             console.log(dbGameVotes);
            //             res.json(dbGameVotes);
            //         })
            //         .catch((err) => res.status(422).json(err));
            // })
            .catch((err) => res.status(422).json(err));
    },
};
