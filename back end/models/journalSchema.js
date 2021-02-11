const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const journalSchema = new Schema({
    createdBy: {
        type : Schema.Types.ObjectId,
        res : "User"
    },
    content : {
        type : String,
        required: true
    },
    moodQuotient : {
        happy : Number,
        sad :Number,
        overAll : Number
    }

}, {Timestamp : true})

module.exports = mongoose.model("Journal", journalSchema);
