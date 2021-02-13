const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recommendationSchema = new Schema({
    articles: [{
        type: String
    }],
    videos: [{
        type: String
    }]
});

module.exports = mongoose.model("Recommendation", recommendationSchema);