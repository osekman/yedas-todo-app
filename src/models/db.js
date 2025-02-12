const { MongoClient } = require('mongodb');
const path = require("path");
const env = require('dotenv').config({path:path.join(__dirname)+'/.env'});

const config = require("../config");

let mongo, cnf;

if(process.env.MY_ENV == "dev"){
    cnf = config.dev; 
    console.log("Localdesin!!");
}else if(process.env.MY_ENV == "prod"){ 
    cnf = config.prod;
}

let mongoClient = new MongoClient( `mongodb://${cnf.mongo.user}:${cnf.mongo.pass}@${cnf.mongo.host}:${cnf.mongo.port}/?authSource=admin&readPreference=primary&ssl=false&directConnection=true`);

module.exports = {
    mongo : async function(){
        if(mongo !== undefined) return mongo;
        else {
            try {

                mongo = await mongoClient.connect().then(client=>client.db("todo")).catch(err=>console.log(err));

                return mongo;
            } catch (error) {
                console.log(error);

                return null;
            }
            
        }
    },
}