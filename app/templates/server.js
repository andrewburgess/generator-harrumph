'use strict';

var path = require('path');
var express = require('express');

var config = require('./config');
var logger = require('./lib/logger');
var routes = require('./routes');

var server = express();

// Set up the configuration values for the server
server.set('port', config.server.port);
server.set('hostname', config.server.hostname);

logger.configure(config);

if (config.env === 'development') {
    try {
        server.use(require('connect-livereload')());
    } catch (err) {
        logger.warn('failed to load module: connect-livereload');
    }

    // Disable caching of scripts for easier testing
    server.use(function noCache(req, res, next) {
        if (req.url.indexOf('/scripts/') === 0) {
            res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.header('Pragma', 'no-cache');
            res.header('Expires', 0);
        }
        next();
    });

    server.use(express.static(path.join(config.root, '.tmp')));
    server.use(express.static(path.join(config.root, 'app')));
    server.set('views', path.join(config.root, 'app', 'views'));

    config.views = path.join(config.root, 'app', 'views');
}

if (config.env === 'test') {
    server.use(express.static(path.join(config.root, '.tmp')));
    server.use(express.static(path.join(config.root, 'app')));
    server.use(express.errorHandler());
    server.set('views', path.join(config.root, 'app', 'views'));

    config.views = path.join(config.root, 'app', 'views');
}

if (config.env === 'production') {
    server.use(express.compress());
    server.use(express.favicon(path.join(config.root, 'public', 'favicon.ico')));
    server.use(express.static(path.join(config.root, 'public')));
    server.set('views', path.join(config.root, 'views'));

    config.views = path.join(config.root, 'views');
}

server.engine('jade', require('jade').__express);
server.set('view engine', 'jade');

server.use(require('./lib/middleware/logger')());

server.use(server.router);

server.get('/views/:view?*', routes.views);
server.all('/api/:request?*', routes.api);
server.get('*', routes.index);

module.exports = server;
