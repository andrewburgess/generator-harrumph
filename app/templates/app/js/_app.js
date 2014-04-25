'use strict';

angular.module('<%= moduleName %>', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngAnimate'
])
.config(function ($locationProvider, $routeProvider) {
    $routeProvider
    .otherwise({
        redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
});
