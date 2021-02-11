const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dateOfBirth: {
        date: {
            type: Number
        },
        month: {
            type: Number
        },
        year: {
            type: Number
        }
    },
    profilePicture: {
        type: String
    },
    journals: [{
        type: Schema.Types.ObjectId,
        ref: "Journal"
    }]
}, {timestamps: true});

module.exports = mongoose.model("User", userSchema);