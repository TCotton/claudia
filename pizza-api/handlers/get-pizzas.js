const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

function getPizzas(pizzaId) {
    if (typeof pizzaId === 'undefined') {
        return documentClient.scan({
            TableName: 'pizza-orders'
        }).promise()
            .then((res) => {
                console.log('Scan successful', res);
                return res.Items;
            }).catch((err) => {
                console.log('Error while scanning', err);
                throw err;
            });
    }
    return documentClient.get({
        TableName: 'pizza-orders',
        Key: {
            orderId: pizzaId
        }
    }).promise().then((res) => {
        console.log('Get successful', res);
        return res.Item;
    }).catch((err) => {
        console.log('Error while getting', err);
        throw err;
    });
}

module.exports = getPizzas;