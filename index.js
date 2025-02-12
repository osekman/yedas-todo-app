
const http = require("http");
const compression = require("compression")
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const PORT     = process.env.PORT || 3000;
const mw = require('./src/middlewares');

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

app.use(mw.tokenValidation); // giriş kontrol..


http.createServer(app).listen(PORT, function () {
    console.log(">>>> Port dinleniyor ::"+PORT);
});

const routes = require('./src/routes')
app.use("/", routes);


