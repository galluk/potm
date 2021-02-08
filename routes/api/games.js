const router = require('express').Router();
const gamesController = require('../../controllers/gamesController');

// Matches with '/api/games'
router.route('/')
    // .get(gamesController.findAll)
    .post(gamesController.create)
    .put(gamesController.update);

// Matches with '/api/games/:id'
router.route('/:id')
    .get(gamesController.findById)
    .delete(gamesController.remove);

// Matches with '/api/games/team/:id'
router.route('/team/:id')
    .get(gamesController.findByTeamId);

// Matches with '/api/games/votingopen/:id'
router.route('/votingopen/:id')
    .get(gamesController.findOpenForVotingByUserId);

module.exports = router;

// 601367a7f8efe351e0cb8081