'use strict';

module.exports = {
    env: 'production',
    server: {
        hostname: 'localhost',
        port: 9500,
        views: require('path').join(__dirname, '/../', 'views')
    },
    logging: {
        level: 'info',
        transports: {
            Console: {
                colorize: true,
                timestamp: true
            }
        }
    }
};
