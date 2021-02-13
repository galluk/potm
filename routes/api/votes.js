const router = require('express').Router();
const votesController = require('../../controllers/votingController');

// All routes match with "/api/voting/gamevotes/:id" 
router.route('/gamevotes/:id')
    .get(votesController.getGameVotesByTeam);

// Matches with "/api/voting/playervotes/:id"
router.route('/playervotes/:id')
    .post(votesController.addPlayerVotes);

module.exports = router;