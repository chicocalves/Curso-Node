const db = require('../config/mongo')
const mongoist = require('mongoist')

const repository = {
    list(query) {
        return db.collection('pokemons').find(query)
    },
    count(query) {
        return db.collection('pokemons').count(query)
    },
    async byId(id) {
        return db.collection('pokemons').findOne({ _id: mongoist.ObjectId(id)})
    },
    create(body) {
        return db.collection('pokemons').insert(body)
    },
    async update(id, body) {
        return db.collection('pokemons').update({_id: mongoist.ObjectId(id)}, { $set: body })
    },
    async delete(id) {
        return db.collection('pokemons').remove({_id: mongoist.ObjectId(id)})
    }
}

module.exports = repository