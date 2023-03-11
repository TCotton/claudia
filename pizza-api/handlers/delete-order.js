const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

function deleteOrder(pizzaId) {
    if( !pizzaId ) {
        throw new Error('To delete pizza details, please provide pizza type and address where pizza should be delivered');
    }
    return documentClient.delete({
        TableName: 'pizza-orders',
        Key: {
            orderId: pizzaId
        }
    }).promise().then((res) => {
        console.log('Delete successful', res);
        return res;
    }).catch((err) => {
        console.log('Error while deleting', err);
        throw err;
    });
}
module.exports = deleteOrder;