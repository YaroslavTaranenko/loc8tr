var ratingStars = function(){
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
	.directive('ratingStars', ratingStars);