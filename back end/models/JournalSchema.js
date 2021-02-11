const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const journalSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    moodResult: {
        happy: {
            type: Number
        },
        sad: {
            type: Number
        },
        overall: {
            type: Number
        }
    }
}, {timestamps: true});

module.exports = mongoose.model("Journal", journalSchema);