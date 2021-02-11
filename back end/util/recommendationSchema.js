const mongoose = require('mongoose');

const Schema = mongoose.Schema

const recommendationSchema = new Schema({
    articles: [{
        type : String,
        required : true
    }],
    videos: [{
        type : String,
        required : true
    }]
})

module.exports = mongoose.model('Reccomendation', recommendationSchema);