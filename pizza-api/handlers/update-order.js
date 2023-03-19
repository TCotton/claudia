const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

function updateOrder(orderId, order) {
    const { pizzaId, address } = order;
    console.log('Update an order', order);
    if( !order || !pizzaId || !address) {
        throw new Error(`To update pizza details, please provide pizza type and address where pizza should be delivered ${pizzaId} ${address} ${orderId} ${order}`);
    }
    return documentClient.update({
        TableName: 'pizza-orders',
        Key: {
            orderId,
        },
        UpdateExpression: 'set pizzaId = :p, address = :a',
        ExpressionAttributeValues: {
            ':p': pizzaId,
            ':a': address
        },
        ReturnValues: 'ALL_NEW'
    }).promise().then((res) => {
        console.log('Update successful', res);
        return res;
    }).catch((err) => {
        console.log('Error while updating', err);
        throw err;
    });
}
module.exports = updateOrder;