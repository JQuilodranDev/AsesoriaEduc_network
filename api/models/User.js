const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name:{
            nickName: {
                type: String,
                require: true,
            },
            firstName: {
                type: String,
                require: true,
            },
            lastName: {
                type: String,
                require: true,
            },
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        }
    },
    { timestamps: true},
);

module.exports = mongoose.model('user', UserSchema);