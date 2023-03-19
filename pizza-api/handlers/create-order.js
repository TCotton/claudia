const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const rp = require('minimal-request-promise');

function createOrder(order) {
    const o = order;
    console.log('Save an order', o);
    if (!o || !o.pizza || !o.address) {
        throw new Error('To order pizza, please provide pizza type and address where pizza should be delivered');
    }

    return rp.post('https://some-like-it-hot-api.effortless-serverless.com/delivery', {
        headers: {
            "Authorisation": "aunt-marias-pizzeria-1234567890",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            pickupTime: '15.30pm',
            pickupAddress: 'The Shire',
            deliveryAddress: o.address,
            webhookUrl: 'https://t5xvknar88.execute-api.us-east-1.amazonaws.com/latest/orders/'
        })
    }).then(rawResponse => JSON.parse(rawResponse.body))
        .then(response => {
            return dynamoDb.put({
                TableName: 'pizza-orders',
                Item: {
                    orderId: response.deliveryId,
                    pizza: o.pizza,
                    address: o.address,
                    orderStatus: 'pending'
                }
            }).promise()
                .then((res) => {
                        console.log('Order created successfully', res);
                        return res;
                    }
                ).catch((err) => {
                    console.log('Error while creating order', err);
                    throw err;
                });
        });
}

module.exports = createOrder;