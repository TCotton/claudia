const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

function updateDeliveryStatus(request) {
    const { deliveryId, status } = request;
    if (!deliveryId || !status) {
        throw new Error('To update delivery status, please provide delivery id and status');
    }
    return dynamoDb.update({
        TableName: 'pizza-orders',
        Key: {
            orderId: deliveryId,
        },
        AttributeUpdates: {
            deliveryStatus: {
                Action: 'PUT',
                Value: status
            }
        }
    }).promise().then((res) => {
        console.log('Update successful', res);
        return res;
    }).catch((err) => {
        console.log('Error while updating', err);
        throw err;
    });
}

module.exports = updateDeliveryStatus;