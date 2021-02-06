const db = require('../models');
const mongoose = require('mongoose');

// Defining methods for the gamesController
module.exports = {
    create: function (req, res) {
        db.Player
            .create(req.body)
            .then((dbGame) => res.json(dbGame))
            .catch((err) => res.status(422).json(err));
    },
};