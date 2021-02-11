const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const logger = require("morgan");
require("dotenv").config();


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Accept, Content-Type");
    if(req.method === 'OPTIONS'){
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
        return res.status(200).json({});
    }
    next();
});

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGODB_URI, {useUnifiedTopology: true, useNewUrlParser: true}).then(
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}!`);
    })
).catch(error => {
    console.log(error.message);
});

