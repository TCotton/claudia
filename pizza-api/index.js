'use strict'

const App = require('claudia-api-builder')
const getPizzas = require('./handlers/get-pizzas')
const createOrder = require('./handlers/create-order')
const updateOrder = require('./handlers/update-order')
const deleteOrder = require('./handlers/delete-order')

const api = new App()

api.get('/pizzas', () => 'Hello from Pizza API')
api.get('/get-pizzas/{id}', (request) => getPizzas(request.pathParams.id), {
    error: 404
});
api.post('/orders', (request) => createOrder(request.body), {
    success: 201,
    error: 400
});
api.put('/orders/{id}', (request) => updateOrder(request.pathParams.id, request.body), {
    success: 200,
    error: 400
});
api.delete('/orders/{id}', (request) => deleteOrder(request.pathParams.id), {
    success: 200,
    error: 400
});

module.exports = api