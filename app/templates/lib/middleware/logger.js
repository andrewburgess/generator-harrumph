'use strict';

var bytes = require('bytes');
var chalk = require('chalk');
var logger = require('../logger');

module.exports = function log(options) {
    options = options || {};
    return function (req, res, next) {
        req._startTime = new Date();

        function logRequest() {
            res.removeListener('finish', logRequest);
            res.removeListener('close', logRequest);

            var status = res.statusCode;
            if (status >= 200 && status <= 299) {
                status = chalk.bgGreen('[' + res.statusCode + ']');
            } else if (status >= 300 && status <= 399) {
                status = chalk.bgYellow.black('[' + res.statusCode + ']');
            } else if (status >= 400 && status <= 499) {
                status = chalk.bgBlue.cyan('[' + res.statusCode + ']');
            } else {
                status = chalk.bgRed.bold('[' + res.statusCode + ']');
            }

            var len = parseInt(res.getHeader('Content-Length'), 10);
            len = isNaN(len) ? '' : (' - ' + bytes(len));

            var time = (new Date() - req._startTime);
            if (time > 2000) {
                time = chalk.red(time + 'ms');
            } else if (time > 1000) {
                time = chalk.yellow(time + 'ms');
            } else if (time > 600) {
                time = chalk.blue(time + 'ms');
            } else {
                time = chalk.green(time + 'ms');
            }

            logger.debug(chalk.green.bold(req.method) + ' ' +
                         chalk.gray((req.originalUrl || req.url)) + ' ' +
                         status + ' ' +
                         '(' + time + len + ')');
        }

        res.on('finish', logRequest);
        res.on('close', logRequest);

        next();
    };
};