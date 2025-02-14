const { ObjectId } = require("mongodb");
const { mongo } = require("../models/db");

const bcrypt = require('bcrypt');


module.exports = {
    account: async function (request, response) {

        response.send({ status: 200, data : request.body.decode.user_data });

    },

    create: async function (request, response) {

        let { username, isAdmin, password } = request.body;

        try {

            const saltRounds = 10;

            bcrypt.hash(password, saltRounds, async function(err, hash) {
                let conn = await mongo();
                // Store hash in your password DB.
                let r = await conn.collection("users").insertOne({ username, password: hash, isAdmin, create_date: new Date() });

                if(r.insertedId == null) 
                    response.send({ status: 500, message: "Kayıt eklenemedi", r});
                else
                    response.send({ status: 200, message: "OK. Eklendi", r });
    
            });


        } catch (error) {
            response.send({ status: 500, message: "Hata oluştu" });
            
        }
       

    },

    read : async function (request, response) {

        try {
             let conn = await mongo();

            let data = await conn.collection("users").find({}).toArray();
            if(data == null) response.send({ status: 500, message: "Kayıt bulunamadı" });
            else response.send({ status: 200, data  });

        } catch (error) {
            response.send({ status: 500, message: "Hata oluştu" });
            
        }

    },

    update: async function (request, response) {

        let { id, username, password1, password2, isAdmin} = request.body;

        try {

            if(password1 && password1 !== password2){

                response.send({ status: 400, message: "Şifreler aynı olmalı!" });

                return;
            }

            let oid = ObjectId.createFromHexString(id);

            const filter = { "_id": oid };

            let updateObj = {};

            if(username) updateObj.username = username;
            if(isAdmin !== undefined || isAdmin !== null ) updateObj.isAdmin = isAdmin;

            let conn = await mongo();

            if(!id) response.send({ status: 500, message: "id is required" });

            if(updateObj != {}){

                const saltRounds = 10;

                if(password1){
                    bcrypt.hash(password1, saltRounds, async function(err, hash) {
                        let conn = await mongo();
                        
                        updateObj.password = hash;

                        let r = await conn.collection("users").updateOne(filter, { $set: {...updateObj } });

                        response.send({ status: 200, message: "OK. Güncellendi", r });
            
                    });
                }else{
                    let r = await conn.collection("users").updateOne(filter, { $set: {...updateObj } });

                    response.send({ status: 200, message: "OK. Güncellendi", r });

                }
               
            }else{
                response.send({ status: 300, message: "Güncellenecek alan belirtmediniz" });
            }
            
        } catch (error) {
            console.log("error", error);
            response.send({ status: 500, message: "Hata oluştu" });
        }

    },

    delete: async function (request, response) {

        let { id } = request.body;


        let oid = ObjectId.createFromHexString(id);

        try {

            let conn = await mongo();
        
            if(!id) response.send({ status: 500, message: "id is required" });
            else {
    
                let r = await conn.collection("users").deleteOne({_id: oid });

                response.send({ status: 200, message: "OK. Silindi" });
            } 
            
        } catch (error) {
            response.send({ status: 500, message: "Hata oluştu" });
            
        }

       
        
    },
    
}