const app = require('../src/app')

// mock do banco de dados 
jest.mock('../src/config/mongo', () => {
    return {
        collection() {
            return {
                async count(){
                    return 9
                },
                async find() {
                    return [{ name: 'mock'}]
                },
                async findOne() {
                    return { _id: '630a7d042c2ad025fcbacb4b', name: 'mock'}
                },
                async insert() {
                    return {_id: '000999'}
                },
                async update() {
                    return {_id: '000999'}
                }
            }
        }
    }
})

it('GET /pokemons', async() =>{
    const response = await app.inject({
        method: 'GET',
        url: '/pokemons'
    })

    const body = JSON.parse(response.body)
    expect(response.statusCode).toBe(200)
    expect(body.total).toBe(9)
})

it('GET /pokemons/:id', async() =>{
    const response = await app.inject({
        method: 'GET',
        url: '/pokemons/630a7d042c2ad025fcbacb4b'
    })
    const body = JSON.parse(response.body)
    expect(response.statusCode).toBe(200)
    expect(body.name).toBe('mock')
    //comparar objeto
    expect(body).toEqual({_id: '630a7d042c2ad025fcbacb4b', name:'mock'})
})

it('POST /pokemons', async() =>{
    const response = await app.inject({
        method: 'POST',
        url: '/pokemons',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({ name: 'JaneDone'})
    })
    const body = JSON.parse(response.body)
    expect(response.statusCode).toBe(201)
    expect(body._id).toBeDefined()
})

it('PUT /pokemons', async() =>{
    const response = await app.inject({
        method: 'PUT',
        url: '/pokemons',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({ name: 'NomeTeste'})
    })
    //const body = JSON.parse(response.body)
    //expect(response.statusCode).toBe(201)
    //expect(body._id).toBeDefined()
})

it('DELETE /pokemons', () =>{
    app.inject({
        method: 'GET',
        url: '/pokemons'
    })
})