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

app.use("/",(req,res,next)=>{
    res.json({status : "ok Application Working"});
});

app.use("*",(req,res,next)=>{
    res.status(404).send("Page Not Found With A Cat");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Running On ${PORT} with DB connected!`);
});
