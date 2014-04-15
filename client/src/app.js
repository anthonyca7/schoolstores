'use strict';

angular.module('schoolstore', [
	'ngCookies',
	'ngResource', 
	'ngRoute', 
])
	.config([
		'$routeProvider', 
		'$locationProvider', 
		function($routeProvider, $locationProvider) {
			$routeProvider
			.when('/',{
				templateUrl: 'partials/main'
			})
			.when('/signup',{
				templateUrl: 'partials/signup',
				controller: 'SignupController'
			})
			.when('/login', {
				templateUrl: 'partials/login',
				controller: 'LoginController'
			})
			.otherwise({
		    	redirectTo: '/'
		    });

			$locationProvider.html5Mode(true);
	}])
	.run([
		'$rootScope',
		'$location', 
		'Auth',
		function ($rootScope, $location, Auth) {
		    $rootScope.$on('$routeChangeStart', function (event, next) {
		      if (next.authenticate && !Auth.isLoggedIn()) {
		        $location.path('/login');
		      }
		    });
  	}]);
