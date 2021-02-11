const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type : String,
        required : true
    },
    name: {
        type : String,
        required : true
    },
    profileURL: String,
    dateOfBirth: {
        date : String,
        month : String,
        year : String
    },
    journals: [{
        type: Schema.Types.ObjectId,
        ref: "Journals"
    }]
})

module.exports = mongoose.model('User', userSchema);