function updateOrder(order) {
    const o = order;
    if( !o || !o.id || !o.address) {
        throw new Error('To update pizza details, please provide pizza type and address where pizza should be delivered');
    }
    return {}
}
module.exports = updateOrder;