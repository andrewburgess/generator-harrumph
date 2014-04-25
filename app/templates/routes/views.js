'use strict';

var logger = require('../lib/logger');

module.exports = function (req, res) {
    var view = req.url.replace('/views/', '');
    res.render(view, function (err, html) {
        if (err) {
            logger.error('Error rendering partial "' + view + '"');
            logger.error(err);
            res.status(404);
            res.send(404);
        } else {
            res.send(html);
        }
    });
};