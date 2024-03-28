const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: [8, 'Password must be at least 8 characters long'],

        },
        fullname: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
);



const User = mongoose.model("User", UserSchema)

module.exports = User