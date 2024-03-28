const mongoose = require("mongoose")

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    },
}
)

const Todo = mongoose.model("Todo", TodoSchema)

module.exports = Todo