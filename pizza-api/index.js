'use strict'

const App = require('claudia-api-builder')
const api = new App()

api.get('/pizzas', () => {
    return [
        'Margarita',
        'Pepperoni',
        'Hawaiian',
        'Neapolitan',
    ]
})

module.exports = api