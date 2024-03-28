const jwt = require("jsonwebtoken")
const Todo = require("../modal/todo.js")
const bcrypt = require('bcrypt');


const createTodo = async (req, res) => {
    try {
        const { body } = req
        const todo = new Todo(body);

        await todo.save();

        res.status(201).send({
            success: true,
            message: "todo created successfully"
        })

    } catch (err) {
        res.status(401).send({
            success: false,
            message: "something went wrong"
        })
    }

}

const getAllTodo = async (req, res) => {

    try {
        const todos = await Todo.find()

        console.log("alltodoData", todos)

        if (!todos) {
            res.status(401).send({
                success: false,
                message: "todo data not found"
            })
        }

        res.status(200).send({
            success: true,
            data: {
                todos
            }
        })


    } catch (err) {
        res.status(401).send({
            success: false,
            message: "something went wrong"
        })
    }

}

const getTodo = async (req, res) => {
    try {
        const { id } = req?.params;

        console.log("id1", id)

        const todo = await Todo.findById(id)

        console.log("todo", todo)

        if (!todo) {
            res.status(401).send({
                success: false,
                message: "todo data not found"
            })
        }

        res.status(200).send({
            success: true,
            data: todo
        })


    } catch (err) {
        res.status(401).send({
            success: false,
            message: "something went wrong"
        })
    }

}

const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        console.log("id12", id, updates)

        const updateTodo = await Todo.findByIdAndUpdate(
            id,
            {
                $set: updates,
            },
            { new: true }
        );

        console.log("updatedTodo", updateTodo)

        if (!updateTodo) {
            res.status(401).send({
                success: false,
                message: "something went wrong"
            });
        }
        res.status(200).send({
            success: true,
            data: {
                updateTodo
            }
        })

    } catch (err) {
        res.status(401).send({
            success: false,
            message: "something went wrong"
        })
    }

}

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;


        const deleteTodo = await Todo.deleteOne({ _id: id });

        if (deleteTodo.deletedCount === 0) {
            return res.status(404).send({
                success: false,
                message: "Todo not found"
            });
        }

        res.status(200).send({
            success: true,
            message: "Todo deleted successfully"
        });

    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Something went wrong"
        });
    }
}




module.exports = { createTodo, getAllTodo, getTodo, updateTodo, deleteTodo }
