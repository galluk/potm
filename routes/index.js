const path = require('path');
const router = require('express').Router();
const userRoutes = require('./api/user-routes');
const gameRoutes = require('./api/games');
const voteRoutes = require('./api/votes');
const playerRoutes = require('./api/players');

// API Routes
router.use(userRoutes);
// Games routes
router.use('/api/games', gameRoutes);
// Voting routes
router.use('/api/voting', voteRoutes);
// player routes
router.use('/api/player', playerRoutes);

// If no API routes are hit, send the React app
router.use(function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;
