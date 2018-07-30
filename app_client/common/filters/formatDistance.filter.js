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

angular
	.module('loc8trApp')
	.filter('formatDistance', formatDistance);