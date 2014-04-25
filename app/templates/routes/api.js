'use strict';

var httpProxy = require('http-proxy');
var config = require('../config');
var logger = require('../lib/logger');

var proxy = new httpProxy.createProxyServer({ target: config.api.url });

module.exports = function (req, res) {
    req.url = req.url.replace(/^\/api/i, '');
    logger.debug('Proxying "' + req.url + '" to ' + config.api.url);
    proxy.web(req, res);
};