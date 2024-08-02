const express = require("express");
const followerController = require("../controller/follower.controller");

const router = express.Router();

router.route("/:followUserId").post(followerController.addFollow);

module.exports = router;
