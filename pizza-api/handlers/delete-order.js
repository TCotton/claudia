function deleteOrder(pizzaId) {
    if( !pizzaId ) {
        throw new Error('To delete pizza details, please provide pizza type and address where pizza should be delivered');
    }
    return {}
}
module.exports = deleteOrder;