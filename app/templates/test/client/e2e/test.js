'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('Add E2E Tests', function () {
    beforeEach(function () {
        browser.get('/');
    });

    it('should navigate home', function () {

    });
});