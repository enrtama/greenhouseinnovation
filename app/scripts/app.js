'use strict';

/**
 * @ngdoc overview
 * @name greenhouseinnovationApp
 * @description
 * # greenhouseinnovationApp
 *
 * Main module of the application.
 */
angular
  .module('greenhouseinnovationApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'toasty'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
