const app = require('../src/app')

it('GET / should return pong', async () => {
    const response = await app.inject({
        method: 'GET',
        url: '/'
    })

    expect(response.statusCode).toBe(200)
    expect(response.body).toBe('pong')
})

it('GET /non-existent should return 404', async() => {
    const response = await app.inject({
        method: 'GET',
        url: '/non-existent'
    })

    expect(response.statusCode).toBe(404)
    expect(response.body).toBe('Not Found')
})