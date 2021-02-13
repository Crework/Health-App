const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require("morgan");
require("dotenv").config();

const db = require("./config/database");
const journalRoutes = require("./routes/journalRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use('/image',express.static('./word cloud'));
db(); 

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Accept, Content-Type");
    if(req.method === 'OPTIONS'){
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
        return res.status(200).json({});
    }
    next();
});

app.use("/api/journals", journalRoutes);
app.use("/api/users", userRoutes);


const PORT = process.env.port || 3000;

app.listen(PORT, () => {
    console.log(`Server Running On ${PORT} with DB connected!`);
});

// 60254d5f3f086ffd4ae57b79 userid
// 60254de63f086ffd4ae57b7a" journalid
