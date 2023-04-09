const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const mime = require('mime');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

function convert(bucket, filePath) {
    const fileName = path.basename(filePath);

    return s3.getObject({
        Bucket: bucket,
        Key: filePath
    }).promise()
        .then((response) => {
            return new Promise((resolve, reject) => {
                if (!fs.existsSync('/tmp/images')) {
                    fs.mkdirSync('/tmp/images');
                }
                if (!fs.existsSync('/tmp/thumbnails')) {
                    fs.mkdirSync('/tmp/thumbnails');
                }

                const localFilePath = path.join('/tmp/images', fileName);

                fs.writeFile(localFilePath, response.Body, (err) => {
                    if (err) {
                        return reject(err);
                    } else {
                        resolve(localFilePath);
                    }
                });
            })
        }).then((localFilePath) => {
            const thumbnailFilePath = path.join('/tmp/thumbnails', localFilePath);
            return s3.putObject({
                Bucket: bucket,
                Key: `thumbnails/${fileName}`,
                Body: fs.readFileSync(thumbnailFilePath),
                ContentType: mime.getType(thumbnailFilePath),
                ACL: 'public-read'
            }).promise()
        })
}

module.exports = convert;