'use strict';

module.exports = {
    env: 'development',
    server: {
        hostname: 'localhost',
        port: 9500,
        views: require('path').join(__dirname, '/../', 'app', 'views')
    },
    logging: {
        level: 'debug',
        transports: {
            Console: {
                colorize: true,
                timestamp: true
            }
        }
    }
};
