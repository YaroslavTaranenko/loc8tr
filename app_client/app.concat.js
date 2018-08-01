
angular.module('loc8trApp', ['ngRoute']);

function config($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: "home/home.view.html",
			controller: 'homeCtrl',
			controllerAs: 'vm'
		})
		.otherwise({redirectTo: '/'});
};


angular
	.module('loc8trApp')
	.config(['$routeProvider', config]);var ratingStars = function(){
	return {
		restrict: "EA",
		scope: {
			thisRating: '=rating'
		},
		templateUrl: "/common/directives/ratingStars/rating-stars.template.html"

	};
};

angular
	.module('loc8trApp')
	.directive('ratingStars', ratingStars);var formatDistance = function(){
	return function(distance){

		distance = parseInt(distance);
		if (distance >= 1000){
			distance = (distance / 1000).toFixed(2);
			distance = distance + ' km';
		}else{
			distance = distance + ' m';
		}
		return distance;
	};
};

angular
	.module('loc8trApp')
	.filter('formatDistance', formatDistance);
function geolocation (){
	var getPosition = function(cbSuccess, cbError, cbNoGeo){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
		}else{
			cbNoGeo();
		}
	};
	return {
		getPosition: getPosition
	};
};
angular
	.module('loc8trApp')
	.service('geolocation', geolocation);
function loc8trData ($http){
	var locationByCoords = function(lng, lat){
		return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=20');
	};
	return {
		locationByCoords: locationByCoords
	};
};

angular
	.module('loc8trApp')
	.service('loc8trData', loc8trData);function homeCtrl ($scope, loc8trData, geolocation){
	var vm = this;
	vm.pageHeader = {
		title: 'Loc8tr',
		strapline: 'Find places to work with wifi near you!'
	};
	vm.sidebar = {
		content: "Looking for wifi and a seat? Loc8tr helps you find places to work when out and about. Perhaps with coffee, cake or pint? Let Loc8tr help you find the place you're looking for."
	};
	vm.message = "Looking for nearby location.";
	loc8trData.locationByCoords(0, 0)
		.then(function(response){
			vm.message = response.data.length > 0 ? "" : "No location found nearby.";
			vm.data = {locations: response.data};

		}, function(err){
			vm.message = "Something's gone wrong (" + err.statusText + ").";
		});
	/*vm.message = "Checking your location";
	vm.getData = function(position){
		var lat = position.coords.latitude;
		var lng = position.coords.longitude;
		vm.message = "Looking for nearby location.";

		loc8trData.locationByCoords(lat, lng)
			.then(function(response){
				vm.message = response.data.length > 0 ? "" : "No location found nearby.";
				vm.data = {locations: response.data};

			}, function(err){
				vm.message = "Something's gone wrong (" + err.statusText + ").";
			});
	};
	vm.showError = function(error){
		$scope.$apply(function(){
			vm.message = error.message;
		});
	};
	vm.noGeo = function(){
		$scope.$apply(function(){
			vm.message = "Geolocation is not supported by this browser.";
		});
	};
	geolocation.getPosition(vm.getData, vm.showError, vm.noGeo);*/
};


angular
	.module('loc8trApp')
	.controller('homeCtrl', homeCtrl);

