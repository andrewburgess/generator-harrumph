// Protractor configuration
// Based off of the reference configuration

var path = require('path');

var phantomjsPath = path.join('node_modules', 'phantomjs', 'bin', 'phantomjs');
if (process.platform === 'win32') {
    phantomjsPath = path.join('node_modules', 'phantomjs', 'lib', 'phantom', 'phantomjs.exe');
}

exports.config = {
    seleniumServerJar: 'tools/selenium-server-standalone-2.41.0.jar',
    seleniumArgs: [],
    capabilities: {
        browserName: 'phantomjs',
        version: '',
        platform: 'ANY',
        'phantomjs.binary.path': phantomjsPath
    },
    specs: ['test/client/e2e/**/*.js'],
    baseUrl: 'http://localhost:9500',
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        reporter: 'mocha-jenkins-reporter'
    },
    onPrepare: function () {
        var promise = browser.getCapabilities();
        promise.then(function (caps) {
            var browserName = caps.caps_.browserName.toUpperCase();
            var browserVersion = caps.caps_.version;
            var filename = 'client-e2e-' + browserName + '-' + browserVersion + '.xml';
            process.env.JUNIT_REPORT_PATH = path.join('test', 'reports', 'client', filename);
        });
    }
};