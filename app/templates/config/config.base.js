'use strict';

var path = require('path');

module.exports = {
    env: 'production',
    root: path.normalize(path.join(__dirname, '/..')),
    <% if (api)  { %>
    api: {
        url: '<%= api %>'
    },
    <% } %>
    server: {
        hostname: 'localhost',
        port: 9500,
        views: path.join(__dirname, '/../', 'views')
    }
};
