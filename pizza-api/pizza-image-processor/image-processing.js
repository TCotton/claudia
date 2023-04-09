'use strict';

const convert = require('./convert');

function handlerFunction(event, context, callback) {
    const eventRecord = event.Records && event.Records[0];

    if(eventRecord) {
        if(eventRecord.eventSource === 'aws:s3') {
            convert(eventRecord.s3.object.key, eventRecord.s3.bucket.name)
                .then(() => {
                    callback(null, 'Image converted successfully');
                })
                .catch((err) => {
                    console.log('Error while converting image', err);
                    callback(err);
                });
        }
    }
}