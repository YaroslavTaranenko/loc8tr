
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
	.service('loc8trData', loc8trData);