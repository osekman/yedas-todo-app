const { ObjectId } = require("mongodb");
const { mongo } = require("../models/db");

module.exports = {
    
    create: async function (request, response) {

        let { name, tag_desc } = request.body;

        try {
            let conn = await mongo();
            let r = await conn.collection("tags").insertOne({ name, create_date: new Date() , tag_desc });
            if(r.insertedId == null) 
                response.send({ status: 500, message: "Kayıt eklenemedi", r});
            else
                response.send({ status: 200, message: "OK. Eklendi", r });

        } catch (error) {
            response.send({ status: 500, message: "Hata oluştu" });
            
        }
       

    },

    read : async function (request, response) {

        try {
             let conn = await mongo();

            let data = await conn.collection("tags").find({}).toArray();
            if(data == null) response.send({ status: 500, message: "Kayıt bulunamadı" });
            else response.send({ status: 200, data  });

        } catch (error) {
            response.send({ status: 500, message: "Hata oluştu" });
            
        }

    },

    update: async function (request, response) {

        let { id, name, tag_desc } = request.body;

        console.log("id", id);

        try {

            let oid = ObjectId.createFromHexString(id);

            const filter = { "_id": oid };

            let updateObj = {};

            if(name) updateObj.name = name;
            if(tag_desc) updateObj.tag_desc = tag_desc;


            let conn = await mongo();

            if(!id) response.send({ status: 500, message: "id is required" });

            if(updateObj != {}){

                let r = await conn.collection("tags").updateOne(filter, { $set: { ...updateObj } });

                response.send({ status: 200, message: "OK. Güncellendi", r});
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
    
                let r = await conn.collection("tags").deleteOne({_id: oid });

                response.send({ status: 200, message: "OK. Silindi" });
            } 
            
        } catch (error) {
            response.send({ status: 500, message: "Hata oluştu" });
            
        }

       
        
    },
}