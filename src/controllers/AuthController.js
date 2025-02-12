const { mongo } = require("../models/db");

module.exports = {
    login: async function (request, response) {

        // console.log("login");

        let conn = await mongo();

        conn.collection("users").insertOne({ name: "test", age: 23});

        response.send({ status: 200, message: "login V1.0" });

    },
}