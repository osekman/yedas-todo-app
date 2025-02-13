const path = require("path");
const fs = require("fs");

module.exports = {
    
    create: async function (request, response) {

        let { name, priority, tags } = request.body;

        let conn = await mongo();
        conn.collection("tasks").insertOne({ name, priority, tags, create_date: new Date() , status:0 });


        response.send({ status: 200, message: "login V1.0" });

    },
    read : async function (request, response) {

        let conn = await mongo();

        conn.collection("tasks").find({}).toArray(function(err, result) {
            if (err) response.send({ status: 500, message: err });
            else response.send({ status: 200, data : result });
        });


        response.send({ status: 200, message: "login V1.0" });

    },
    update: async function (request, response) {

        let { id, name, priority, tags } = request.body;

        let updateObj = {};

        if(name) updateObj.name = name;
        if(priority) updateObj.priority = priority;
        if(tags) updateObj.tags = tags;

        let conn = await mongo();

        if(!id) response.send({ status: 500, message: "id is required" });

        if(updateObj != {}){
            conn.collection("tasks").updateOne({_id:ObjectID(id)},{ $set: updateObj });

            response.send({ status: 200, message: "OK. Güncellendi" });
        }else{
            response.send({ status: 300, message: "Güncellenecek alan belirtmediniz" });
        }


    },
    delete: async function (request, response) {

        let { id } = request.body;

        let conn = await mongo();
        
        if(!id) response.send({ status: 500, message: "id is required" });
        else{

            conn.collection("tasks").delete({_id:ObjectID(id)});
            response.send({ status: 200, message: "OK. Silindi" });
        } 

    },
}