const dev = {
    mongo : {
        host :"127.0.0.1",
        port:27017,
        user:"admin",
        pass:"1234"
    },
}
const prod = {
    mongo : {
        host :"//mongodb....",
        port:27017,
        user:"",
        pass:""
    },

}


module.exports = {
    dev, prod
}