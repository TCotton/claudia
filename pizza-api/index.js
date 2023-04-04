'use strict'

const App = require('claudia-api-builder')
const getPizzas = require('./handlers/get-pizzas')
const createOrder = require('./handlers/create-order')
const updateOrder = require('./handlers/update-order')
const deleteOrder = require('./handlers/delete-order')
const updateDeliveryStatus = require('./handlers/update-delivery-status')

const api = new App()

api.registerAuthorizer('userAuthentication', {
    providerARNs: ['arn:aws:cognito-idp:us-east-1:347216043440:userpool/us-east-1_3oMwgotgr']
});

api.get('/pizzas', () => 'Hello from Pizza API')
api.get('/orders/{id}', (request) => getPizzas(request.pathParams.id), {
    error: 404
});
api.post('/orders', (request) => createOrder(request.body), {
    success: 201,
    error: 400,
    cognitoAuthorizer: 'userAuthentication'
});
api.put('/orders/{id}', (request) => updateOrder(request.pathParams.id, request.body), {
    success: 200,
    error: 400,
    cognitoAuthorizer: 'userAuthentication'
});
api.delete('/orders/{id}', (request) => deleteOrder(request.pathParams.id), {
    success: 200,
    error: 400,
    cognitoAuthorizer: 'userAuthentication'
});
api.post('/delivery', (request) => updateDeliveryStatus(request.body), {
    success: 200,
    error: 400,
    cognitoAuthorizer: 'userAuthentication'
});

module.exports = api