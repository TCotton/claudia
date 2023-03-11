const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

function createOrder(order) {
    const o = order;
    if (!o || !o.pizza || !o.address) {
        throw new Error('To order pizza, please provide pizza type and address where pizza should be delivered');
    }
    return dynamoDb.put({
        TableName: 'pizza-orders',
        Item: {
            orderId: uuid.v1(),
            pizza: o.pizza,
            address: o.address,
            orderStatus: 'pending'
        }
    }).promise()
        .then((res) => {
            console.log('Order created successfully', res);
            return res;
        }).catch((err) => {
            console.log('Error while creating order', err);
            throw err;
        });
}

module.exports = createOrder;