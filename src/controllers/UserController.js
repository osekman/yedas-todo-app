const path = require("path");
const fs = require("fs");

module.exports = {
    account: async function (request, response) {
        
        response.sendFile(path.join(__dirname, '../../public', 'account.html'));
        // response.send({ status: 200, message: "login V1.0" });

    },
    login: async function (request, response) {


        response.send({ status: 200, message: "login V1.0" });

    },
}