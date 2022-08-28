
const mongoist = require('mongoist');
//const db = mongoist('10.0.2.156:27017/chico')
const db = mongoist('mongodb+srv://Admin:Admin01@apinode.r5ibx.mongodb.net/dbPokemons?retryWrites=true&w=majority')

module.exports = db