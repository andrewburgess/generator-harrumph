'use strict';

require('colors');

var _ = require('lodash');
var base = require('./config.base');
var env = process.env.NODE_ENV || 'development';
var envConfig;

try {
    envConfig = require('./config.' + env);

    if (env !== 'test') {
        console.log(('config.' + env + '.js').bold.green + ' loaded');
    }
} catch (err) {
    if (env !== 'test') {
        console.warn('no configuration specified for env: ' + env);
    }
    envConfig = {};
}

var config = _.defaults({}, envConfig, base);

module.exports = config;
