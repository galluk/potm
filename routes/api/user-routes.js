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
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                teamAdmin: req.body.teamAdmin,
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
                    console.log('************************************************************');
                    console.log(response);
                    const payload = {
                        _id: response._id,
                        firstName: response.firstName,
                        lastName: response.lastName,
                        email: response.email,
                        teamAdmin: response.teamAdmin,
                        fullName: `${response.firstName} ${response.lastName}`,
                    };
                    console.log(payload);
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

// ************************** PLAYERS routes **************************
router.get('/api/players/:id', (req, res) => {
  
    db.Player.findById(mongoose.Types.ObjectId(`${req.params.id}`))
        // db.Player.findById(req.params.id)
        .then((response) => {
            console.log(response);
            res.json(response);
        })
        .catch((err) => {
            res.json(err);
        });
});

module.exports = router;