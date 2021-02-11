const router = require('express').Router();
const playerController = require('../../controllers/playerController');

// Matches with "/api/player"
router.route('/')
    .post(playerController.create);

router.route('/inteam/:id')
    .get(playerController.getPlayersInTeam);

module.exports = router;