const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');

const excToken = [
   "/",
   "/api/auth/login",
   "/api/auth/test",
];

module.exports = {

   tokenValidation: async function (req, res, next) {
      try {

         if (!excToken.includes(req.path)) {
            let token = req.get("Token");
            if (!token) {
               console.log(req.path);
               res.status(401);
               res.send({ status: 401, message: "Lütfen giriş yapınız!" });
            } else {

                  jwt.verify(token, "my_secret_keyword_yedas", (error, decoded) => {
                     if (error) {
                        res.status(401);
                        res.send({ status: 401, message: "HATA OLUŞTU! ERR: " + error });
                     } else {

                        req.body.decode = decoded;
                        req.body.token = token;

                        next();
                     }
                  });
               }
           
         } else {
            next();
         }
      } catch (error) {
         res.send({ status: 500, message: error });
      }
   },

   requestId: function (req, res, next) {
      
      // Request ID oluştur
      const requestId = uuidv4();
      
      // Request'e ekle
      req.requestId = requestId;
      
      // Response'a ekle
      res.setHeader('X-Request-ID', requestId);
                  
      next()
   },

   test: function (req, res, next) {
      // console.log("test from middle");
      next()
   }

}
