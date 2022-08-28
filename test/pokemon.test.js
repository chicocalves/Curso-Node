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
        url: '/pokemons'
    })
})

it('POST /pokemons', async() =>{
    const response = await app.inject({
        method: 'GET',
        url: '/pokemons'
    })
})

it('PUT /pokemons', () =>{
    app.inject({
        method: 'GET',
        url: '/pokemons'
    })
})

it('DELETE /pokemons', () =>{
    app.inject({
        method: 'GET',
        url: '/pokemons'
    })
})