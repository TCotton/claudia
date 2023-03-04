'use strict'

const App = require('claudia-api-builder')
const getPizzas = require('./handlers/get-pizzas')

const api = new App()

api.get('/pizzas', () => 'Hello from Pizza API')
api.get('/pizzas/{id}', (request) => getPizzas(request.pathParams.id), {
    error: 404
});

module.exports = api