const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

function updateOrder(order) {
    if( !order || !order.pizzaId || !order.address) {
        throw new Error('To update pizza details, please provide pizza type and address where pizza should be delivered');
    }
    return documentClient.update({
        TableName: 'pizza-orders',
        Key: {
            orderId: order.pizzaId,
            address: order.address
        }
    }).promise().then((res) => {
        console.log('Update successful', res);
        return res;
    }).catch((err) => {
        console.log('Error while updating', err);
        throw err;
    });
}
module.exports = updateOrder;