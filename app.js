var myApp = angular.module('myApp', ['ngRoute', 'ngResource']);


myApp.service('$nameService', function(){
	var self = this;
	this.name = 'David Castillo';
	this.nameLength = function(){
		return self.name.length;	
	}
});

myApp.service('$cityService', function(){
	this.city = "Allentown, PA";
});


myApp.controller('mainController', ['$scope', '$log','$nameService','$cityService','$location', function($scope, $log, $nameService, $cityService, $location){

	$scope.name = $nameService.name;
	$scope.city = $cityService.city;
	$scope.$watch('city', function(){
		$cityService.city = $scope.city;
	});

	$scope.submit = function() {
        $location.path("/forecast/2");
    };
    
}]);

myApp.controller('forecastController', ['$scope', '$log','$cityService','$resource', '$routeParams', function($scope, $log, $cityService, $resource, $routeParams ) {

	$scope.city = $cityService.city;

	$scope.days = $routeParams.days || 2;

	const API_KEY = "f106f0d8c2d501841c6ec78958fdb9af";

	$scope.weatherAPI = 

		$resource(`http://api.openweathermap.org/data/2.5/forecast?q=${ $scope.city },appid=${ API_KEY }`, {
			callback: 'JSON_CALLBACK'}, { get: { method: 'JSONP'}});

	$scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days, appid: API_KEY });

	console.log($scope.weatherResult);

	$scope.convertToFahrenheit = function(degK){
			return Math.round((1.8 * (degK - 273)) + 32 );
	}

	$scope.convertToDate = function(dt){
			return new Date(dt * 1000);
	}

}]);