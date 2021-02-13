const router = require('express').Router();
const votesController = require('../../controllers/votingController');

// All routes match with "/api/voting" plus whatever is shown here
router.route('/gamevotes/:id')
    .get(votesController.getGameVotesByTeam);

// Matches with "/api/voting/playervotes"
router.route('/playervotes/:id')
    .post(votesController.addPlayerVotes);

module.exports = router;