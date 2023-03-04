function createOrder(order) {
    const o = order;
    if( !o || !o.id || !o.address) {
        throw new Error('To order pizza, please provide pizza type and address where pizza should be delivered');
    }
    return {}
}
module.exports = createOrder;