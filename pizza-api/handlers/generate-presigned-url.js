'use strict';

const uuidv4 = require('uuidv4');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

function generatePresignedUrl() {
    const s3Params = {
        Bucket: 'aunt-marias-pizzeria-testing-this-bucket',
        Key: uuidv4(),
        Expires: 120,
        ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', s3Params).promise()
        .then((url) => {
            return {
                url: url
            }
        })
}

module.exports = generatePresignedUrl;