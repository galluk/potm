const router = require('express').Router();
const playerController = require('../../controllers/playerController');

// Matches with "/api/player"
router.route('/')
    .post(playerController.create);

module.exports = router;