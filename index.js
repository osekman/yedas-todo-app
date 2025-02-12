
const http = require("http");
const compression = require("compression")
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const env = require("dotenv").config({path:path.join(__dirname)+"/.env"});
const jwt = require("jsonwebtoken");
//////////// SERVERLAR //////////////////

const PORT     = process.env.PORT ;

//-------- HTTP -----
var app = express();
app.use(cors());

app.use(compression());

app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());
app.use((req, res, next) => {
    bodyParser.json()(req, res, (err) => {
        if (err) {
            console.log(err);
            res.sendStatus(400);
            return;
        }
        next();
    });
});

app.use(express.static(path.join(__dirname, 'public')));


http.createServer(app).listen(PORT, function () {
    console.log(">>>> Port dinleniyor ::"+PORT);
    
});

const routes = require('./src/routes')
app.use("/", routes)
