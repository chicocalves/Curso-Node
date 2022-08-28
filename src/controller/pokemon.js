const repository = require('../repository/pokemon')

const controller = {
/** @types {import('fastify').RouterHandlerMethod} */

    async list(req, res) {
        const query = req.query

        try {
            // jeiro errdo um depois o outro
            //const itens = await repository.list(query)
            //const total = await repository.count(query)

            //Chama em paralelo e retona junto
            const [itens, total] = await Promise.all([
                repository.list(query),
                repository.count(query)
            ])
            res.send({
                total,
                itens
            })
        } catch (error) {
            throw new Error("Deu ruim")
        }           
    },
    byId(req, res) {
        const id = req.params.id
        return repository.byId(id)
            .then(result => {
                res.send(result)
            })
    },
    create(req, res) {
        return repository.create(req.body)
            .then(result => {
                res.status(201)
                res.send(result)
            })
    },
    update(req, res) {
        const id = req.params.id
        const body = req.body

        return repository.update(id, body)
            .then(result => res.send(result))
    },
    delete(req, res) {
        const id = req.params.id

        return repository.delete(id)
        //igual ao de cima, no update a varial result não é utilizada, nesse caso pode substituir por _
            .then((_) => {
                res.status(204)
                res.send('')
            })
    }
}

module.exports = controller