const mongoose = require('mongoose');

const dbURL = process.env.MONGODB_URI;

module.exports = () => {

    mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true});

    mongoose.connection.once('connected', () => {
        console.log("Mongoose database connected on", dbURL);
    });

    mongoose.connection.on('error', err => {
        console.log("Mongoose default connection has ocurred "+ err +" error");
    });

    mongoose.connection.on('disconnected', () => {
        console.log("Mongoose database disconnected");
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log("Mongoose default connection is disconnected due to application termination");
            process.exit(0);
        });
    });
}