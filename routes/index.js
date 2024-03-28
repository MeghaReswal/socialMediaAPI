const express = require("express")
const authRoutes = require("./auth.route.js")
const todoRoutes = require("./todos.route.js")
const filesRoutes = require("./files.route.js")

const { isAuthenticated } = require("../middleware/isAuthenticated.js")

const router = express.Router()

router.use("/auth", authRoutes)
router.use("/todos", isAuthenticated, todoRoutes)
router.use("/files", filesRoutes)


module.exports = router
