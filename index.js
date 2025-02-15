
const http = require("http");
const compression = require("compression")
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const { mongo } = require("./src/models/db");

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

const routes = require('./src/routes');
const db = require("./src/models/db");
app.use("/", routes);

let tempusers = [{
    "username": "user1",
    "password": "$2b$10$rUvZ4tT13Y6rcfADnOV...28S69WSXRyXt2OGJ0tbnM4caTG.bb32",
    "isAdmin": false,
    "created_at": new Date()
},
{
    "username": "admin",
    "password": "$2b$10$rUvZ4tT13Y6rcfADnOV...28S69WSXRyXt2OGJ0tbnM4caTG.bb32",
    "isAdmin": true,
    "created_at": new Date()
}]

let temptags = [
    {
        "name": "front",
        "create_date": "2025-02-14T21:00:51.789Z",
        "tag_desc": "fronta işlem kategorisi"
    }
]

let temptasks = [
    {
        "name": "Database Client3",
        "priority": "0",
        "tags": [
            "backend",
            "panel"
        ],
        "create_date": "2025-02-14T19:55:15.265Z",
        "status": "2"
    },
    {
        "name": "Front Buton Ekleme",
        "priority": "9",
        "tags": [
            "front",
            "panel"
        ],
        "create_date": "2025-02-14T20:52:40.593Z",
        "status": 0
    }
]

let dbAvailable = false;
async function addTempData(){

    try {
        
        let conn = await mongo();

        let r2 = await conn.collection("users").find({}).toArray();
        if(r2.length == 0){
            let rr2 = await conn.collection("users").insertMany(tempusers);
            if(rr2.insertedCount > 0){
                console.log("Temp users eklendi");

                dbAvailable = true;
            }
        }else{
            console.log("Temp users mevcut..");

            dbAvailable = true;
        } 
        
        let r3 = await conn.collection("tags").find({}).toArray();
        if(r3.length == 0){
            let rr3 = await conn.collection("tags").insertMany(temptags);
            console.log("Temp tags eklendi..");
        }else{
            console.log("Temp data mevcut..");
        }

        let r4 = await conn.collection("tasks").find({}).toArray();
        if(r4.length == 0){
            let rr4 = await conn.collection("tasks").insertMany(temptasks);
            console.log("Temp tasks eklendi..");
        }else{
            console.log("Temp tasks mevcut..");
        }
        
    } catch (error) {
        throw error;
    }

    

}

addTempData().then(() => {

    if(dbAvailable){
        http.createServer(app).listen(PORT, function () {
            console.log(">>>> Port dinleniyor ::"+PORT);
        });
    }else{
        console.log("DB bağlantısı sağlanamadı..");
    }

}).catch((err) => console.log("DB bağlantısı sağlanamadı..", err) );










