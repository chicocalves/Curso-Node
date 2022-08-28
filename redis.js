const Redis = require('ioredis')
const { run } = require('jest')
const redis = new Redis()

const rum = async () => {

    const json = {
        id: 1,
        name: 'Pikachu',
        power: 'eletricidade'
    }

    await redis.set('pokemon1', JSON.stringify(json))

    await redis.get('pokemon1').then(r => console.log(r))

}

run()