const pizzas = require('../data/pizzas.json');

function getPizzas(pizzaId) {
    if(!pizzaId) {
        return pizzas;
    }

    const pizza = pizzas.find(pizza => Number(pizza.id) === Number(pizzaId));
    if(pizza) {
        return pizza;
    }
    throw new Error(`Pizza with id ${pizzaId} not found`);
}

module.exports = getPizzas;