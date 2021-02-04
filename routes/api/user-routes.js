const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load db models
// const User = require('../../models/User');
const db = require('../../models');
router.use(cors());

router.post('/api/register', (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    db.User.findOne({
        email: req.body.email,
    }).then((response) => {
        if (response) {
            res.status(400).json({ email: 'Email already exists' });
            return res.send('Email already exists');
        } else {
            const today = new Date();
            const userData = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: req.body.password,
                created: today,
            };
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) throw err;
                userData.password = hash;
                db.User.create(userData)
                    .then((user) => {
                        res.json(user);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            });
        }
    });
});

router.post('/api/login', (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    db.User.findOne({
        email: req.body.email,
    })
        .then((response) => {
            if (response) {
                if (bcrypt.compareSync(req.body.password, response.password)) {
                    const payload = {
                        _id: response._id,
                        first_name: response.first_name,
                        last_name: response.last_name,
                        email: response.email,
                        teamAdmin: response.teamAdmin,
                    };
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        // 1 year in seconds
                        expiresIn: 31556926,
                    });
                    res.send(token);
                } else {
                    res.status(400).json({ error: 'User does not exist' });
                }
            } else {
                res.status(400).json({ error: 'User does not exist' });
            }
        })
        .catch((err) => {
            res.send('error: ' + err);
        });
});

router.get('/api/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
    db.User.findOne({
        _id: decoded._id,
    })
        .then((response) => {
            if (response) {
                res.json(response);
            } else {
                res.status(400).json({ error: 'User does not exist' });
            }
        })
        .catch((err) => {
            res.send('error: ' + err);
        });
});

router.get('/api/displayusers', (req, res) => {
    db.User.find()
        .then((response) => {
            if (response) {
                res.json(response);
            } else {
                res.status(400).json({ error: 'Users do not exist' });
            }
        })
        .catch((err) => {
            res.send('error: ' + err);
        });
});

// ************************** GAME routes **************************
router.get('/api/games', (req, res) => {
    db.Game.find({})
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            res.json(err);
        });
});

router.get('/api/gamevotes/:id', (req, res) => {
    db.GameVote.find({})
        .then((dbGameVotes) => {
            res.json(dbGameVotes);
        })
        .catch((err) => {
            res.json(err);
        });
});

// ************************** PLAYERS routes **************************
router.get('/api/players/:id', (req, res) => {
    db.Player.findById(mongoose.Types.ObjectId(`${req.params.id}`))
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            res.json(err);
        });
});

router.get('/api/usergames/:id', (req, res) => {
    console.log(req.params.id);
    //db.Player.findById(mongoose.Types.ObjectId(`${req.params.id}`))
    db.Player.find({ userId: mongoose.Types.ObjectId(`${req.params.id}`) })
        .then((dbPlayers) => {
            let team_ids = dbPlayers.map(function (player) {
                return mongoose.Types.ObjectId(player.teamId);
            });
            console.log(team_ids);
            db.Game.find({ teamId: { '$in': team_ids }, votingOpen: true }).
                then((dbGames) => {
                    // have the teams associated with this user, now get the games they can vote on
                    console.log(dbGames);
                    // db.Game.find({ teamId: mongoose.Types.ObjectId(`${dbTeam._id}`), votingOpen: true }).then((dbGames) => {
                    //     console.log(dbGames);
                    // });
                    res.json(dbGames);
                })
                .catch((err) => {
                    res.json(err);
                });
        .catch((err) => {
            res.json(err);
        });
    });
});

module.exports = router;
