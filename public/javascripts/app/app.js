var app = angular.module('inDayApp', ['ngRoute', 'ngTable', 'ui.bootstrap']);

app.config(function($locationProvider, $routeProvider) {

	$routeProvider
		.when('/', {
			templateUrl: '/javascripts/app/views/main.html',
			controller: 'mainController'
		})
		.when('/admin', {
			templateUrl: '/javascripts/app/views/admin.html',
			controller: 'adminController'	
		});
});



