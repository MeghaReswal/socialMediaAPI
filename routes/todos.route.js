const express = require("express")
const { createTodo, getAllTodo, getTodo, updateTodo, deleteTodo } = require("../controller/todo.js")

const router = express.Router()

router.post("/todo", createTodo)
router.get("/todos", getAllTodo)
router.get("/todos/:id", getTodo)
router.put("/todos/:id", updateTodo)
router.delete("/todos/:id", deleteTodo)

module.exports = router