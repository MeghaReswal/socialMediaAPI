const mongoose = require("mongoose")

const dbConnection = async () => {
    try {
        mongoose
          .connect("mongodb://127.0.0.1:27017/socialmedia")
          .then(console.log("db connected"))
          .catch("db connection error");
    } catch (error) {
        console.log("connection error", error)
    }
}

module.exports = dbConnection