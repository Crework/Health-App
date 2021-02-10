const mongodb = require('mongodb');
const mongoUrl = require('../mongoConfig')

const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    MongoClient.connect(mongoUrl.mongoURL)
        .then(client => {
            console.log('connected to mongoDB');
            callback(client)
        })
        .catch( err => {
            console.log(err);
        })
}

module.exports = mongoConnect;