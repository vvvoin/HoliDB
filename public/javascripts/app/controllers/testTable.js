angular.module('inDayApp').controller('mainCtrl', function ($scope, DayService) {
	DayService.get().success(function(data) {
		$scope.days = data;
	});

});