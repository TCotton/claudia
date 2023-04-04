const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const rp = require('minimal-request-promise');

function createOrder(request) {

    console.log('Save an order', request.body);

    const userData = request.context.authorizer.claims;
    console.log('User data', userData);

    let useraddress = request.body && request.body.address;
    if(!useraddress) {
        useraddress = JSON.parse(userData.address);
    }

    if (!request.body || !request.body.pizza || !request.body.address) {
        throw new Error('To order pizza, please provide pizza type and address where pizza should be delivered');
    }

    return rp.post('https://fake-delivery-api.effortlessserverless.com/delivery', {
        headers: {
            "Authorisation": "aunt-marias-pizzeria-1234567890",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            pickupTime: '15.30pm',
            pickupAddress: 'The Shire',
            deliveryAddress: useraddress,
            webhookUrl: 'https://t5xvknar88.execute-api.us-east-1.amazonaws.com/latest/orders/'
        })
    }).then(rawResponse => JSON.parse(rawResponse.body))
        .then(response => {
            return dynamoDb.put({
                TableName: 'pizza-orders',
                Item: {
                    orderId: response.deliveryId,
                    pizza: request.body.pizza,
                    address: useraddress,
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