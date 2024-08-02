const express = require("express");
const authRoutes = require("./auth.route.js");
const postRoutes = require("./post.route.js");

const followerRoute = require("./follower.route.js");

const { isAuthenticated } = require("../middleware/isAuthenticated.js");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/posts", isAuthenticated, postRoutes);
router.use("/followers", isAuthenticated, followerRoute);

module.exports = router;
