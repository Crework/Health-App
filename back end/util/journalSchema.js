const mongoose = require('mongoose');

const Schema = mongoose.Schema

const journalSchema = new Schema({
    createdBy: {
        type : Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type : String,
        required : true
    },
    moodQuotient : {
        happy : {
            type : Number,
            required : true
        },
        sad : {
            type : Number,
            required : true
        },
        overall : {
            type : Number,
            required : true
        }
    }
    
},{
    timestamps: true
})

module.exports = mongoose.model('Journal', journalSchema);