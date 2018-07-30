var locationListCtrl = function($http, $scope, loc8trData){
	/*$http.get('/api/locations', (resp)=>{
		let data = '';
		resp.on('data', (chunk) => {
		    data += chunk;
	  	});
	  	resp.on('end', () => {
	  		$scope.data = {locations: data};
	  		console.log("data: " + data);
	  	});
	  	resp.on('error', (err) => {
	  		console.log(err);
	  	})
	});*/
	$scope.message = "Searching for nearby places..."
	loc8trData
		.then(
			function(data){
				$scope.message = "";
				console.log(data);
				$scope.data = {locations: data.data};
			}, function(e){
				$scope.message = e.statusText;
				console.log(e);
		});
	//$scope.data = {locations: loc8trData};
};

var formatDistance = function(){
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
var ratingStar = function(){
	return {
		scope: {
			thisRating: '=rating'
		},
		templateUrl: "/js/rating-stars.html"

	}
};
var loc8trData = function($http){
	return $http.get('/api/locations');
	/*return [{
			name: "Starcups",
		    address: "125 High Street, Reading, rg-7, 1PS",
		    rating: 3,
		    facilities: ["Hot drinks", "Food", "Premium WIFI"],
		    distance: "100m"
		},{
			name: "Coffe Hero",
		    address: "125 High Street, Reading, rg-7, 1PS",
		    rating: 5,
		    facilities: ["Hot drinks", "Food", "Premium WIFI"],
		    distance: "2500",
		}];*/
};
angular
	.module('loc8trApp', [])
	.controller('locationListCtrl', locationListCtrl)
	.filter('formatDistance', formatDistance)
	.directive('ratingStar', ratingStar)
	.service('loc8trData', loc8trData);






