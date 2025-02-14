const { mongo } = require("../models/db");
const jwt = require("jsonwebtoken");

const bcrypt = require('bcrypt');

module.exports = {
    login: async function (request, response) {

        // console.log("login");

        // let conn = await mongo();

        // conn.collection("users").insertOne({ name: "test", age: 23});

        let username = request.body.username;
        let password = request.body.password;
        // let username = "my_new_hashed_user";
        // let password = "my_pass_hash_script";

        let conn = await mongo();
        const usersCollection = conn.collection("users"); // Koleksiyon adı

        const user = await usersCollection.findOne({ username });

         // Load hash from your password DB.
         bcrypt.compare(password, user.password, function(err, result) {
            // result == true
            if(err) console.log("eşleşmedi..",err);
            else console.log("eşleşti..", result);

        });

        let user_data = { ...user }
        delete user_data.password;

        const payLoad = { user_data: user_data };

        const token = jwt.sign(payLoad, "my_secret_keyword_yedas", { expiresIn: 1 * 60 * 60 }); // 1 saat geçerli


        response.send({ status: 200, message: "login V1.0", payLoad, token });

    },
    test: async function (request, response) {
 
        const saltRounds = 10;
        let  myPlaintextPassword =  "1234";

        bcrypt.hash(myPlaintextPassword, saltRounds, async function(err, hash) {
            let conn = await mongo();
            // Store hash in your password DB.
            conn.collection("users").insertOne({ username: "admin", password: hash});

        });

        // console.log("login");


        response.send({ status: 200, message: "login V1.0" });

    },

}