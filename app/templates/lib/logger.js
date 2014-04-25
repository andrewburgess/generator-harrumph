'use strict';

require('colors');
var winston = require('winston');
var _ = require('lodash');

var configured = false;

var logger = new (winston.Logger)({
    levels: {
        debug: 0,
        info: 1,
        warn: 2,
        error: 3,
        fatal: 4
    }
});

winston.addColors({
    debug: 'green',
    info: 'cyan',
    warn: 'yellow',
    error: 'red',
    fatal: ['bold', 'red']
});

module.exports = logger;
module.exports.configure = function (config) {
    if (configured) {
        return;
    }

    if (!config) {
        config = {};
    }

    if (!config.logging) {
        config.logging = {};
    }

    if (!config.logging.transports) {
        config.logging.transports = [];
    }

    _.each(config.logging.transports, function (val, key) {
        var options = _.defaults({}, config.logging.transports[key], { level: config.logging.level });
        logger.add(winston.transports[key], options);
    });

    configured = true;
};
