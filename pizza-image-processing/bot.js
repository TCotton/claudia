'use strict';

const botBuilder = require('claudia-bot-builder');

const api = botBuilder(() => {
    return 'hello from pizza bot';
})

module.exports = api;