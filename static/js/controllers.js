var rayApp = angular.module('rayApp', []);

rayApp.controller('PhoneListCtrl', function ($scope, $http) {
	
	$http.get('/articles/553978dca3275bc1ddcc1ceb').success(function(data) {
	    $scope.article = data.data;
	});
  
	$scope.age = monthDiff(new Date(2014, 11, 24), new Date());
	
	function monthDiff(d1, d2) {
	    var months;
	    months = (d2.getFullYear() - d1.getFullYear()) * 12;
	    months -= d1.getMonth() + 1;
	    months += d2.getMonth();
	    return months <= 0 ? 0 : months;
	}
});