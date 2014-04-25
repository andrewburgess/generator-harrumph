'use strict';

var path = require('path');

var config = require('../config');
var views = require('./views');
var api = require('./api');

module.exports.index = function (req, res) {
    res.sendfile(path.join(config.views, 'index.html'));
};

module.exports.views = views;
module.exports.api = api;