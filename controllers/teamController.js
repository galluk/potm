const db = require('../models');
const mongoose = require('mongoose');

// Defining methods for the teamController
module.exports = {
    create: function (req, res) {
        // set ids
        console.log(req.body);
        let team = { ...req.body, seasonId: mongoose.Types.ObjectId(`${req.body.seasonId}`) };
        console.log(team);
        db.Team
            .create(team)
            .then((dbTeam) => res.json(dbTeam))
            .catch((err) => res.status(422).json(err));
    },
};