const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    teamAdmin: {
        type: Boolean,
        default: false,
    },
});

const User = mongoose.model('users', UserSchema);

module.exports = User;

// module.exports = User = mongoose.model("users", UserSchema);
