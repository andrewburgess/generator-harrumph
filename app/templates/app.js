'use strict';

var server = require('./server');
var config = require('./config');
var logger = require('./lib/logger');

logger.configure(config);

server.listen(config.server.port, function () {
    console.log('server listening on port ' + config.server.port);

    server.connected = true;
});

module.exports = server;
