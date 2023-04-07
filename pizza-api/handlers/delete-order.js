const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();
const rp = require('minimal-request-promise');

function deleteOrder(pizzaId, userData) {

    return documentClient.get({
        TableName: 'pizza-orders',
        Key: {
            orderId: pizzaId
        }
    }).promise()
        .then(result => result.Item)
        .then(item => {
            if (item.cognitoUsername !== userData['congiito:username']) {
                throw new Error('You are not authorized to delete this order');
            }

            if (item.orderStatus !== 'pending') {
                throw new Error('You can only delete pending orders');
            }

            return rp.delete(`https://fake-delivery-api.effortlessserverless.com/delivery/${orderId}`, {
                headers: {
                    Authorisation: 'aunt-marias-pizzeria-1234567890',
                    'Content-Type': 'application/json'
                }
            })
        }).then(() => {
            return documentClient.delete({
                TableName: 'pizza-orders',
                Key: {
                    orderId: pizzaId
                }
            }).promise();
        })

}

module.exports = deleteOrder;