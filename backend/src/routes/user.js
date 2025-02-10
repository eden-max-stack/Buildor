const express = require("express");
const userController = require("../../controllers/userController.js");
const tokenController = require("../../controllers/getInstallationTokenController.js");
const router = express.Router();

router.get('/', tokenController.getToken);
router.get('/repos', userController.getUserRepos); // getting all repos belonging to user
router.get("/repos/:owner/:repo/languages", userController.getRepoLanguages); // getting user languages / tech stack
router.get("/repos/:owner/:repo/commits", userController.getCommitHistory); // getting commit history
router.get("/starred", userController.getStarredRepos); // getting starred repos

module.exports = router;
