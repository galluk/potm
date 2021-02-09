const router = require('express').Router();
const teamController = require('../../controllers/teamController');

// Matches with "/api/team"
router.route('/')
    .post(teamController.create);

module.exports = router;