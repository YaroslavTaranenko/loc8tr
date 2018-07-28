var request = require('request');
var apiOptions = {
	server: "http://localhost:3000"
}
var renderHomePage = function(req, res, responseBody){
	var message;
	if(!(responseBody instanceof Array)){
		message = "API lookup error.";
		responseBody = [];
	}else{
		if(!responseBody.length){
			message: "No places found near you.";
		}
	}
	res.status = 200;
	res.render('locations-list', {
		title: 'Loc8tr - find a place to work with WIFI.',
		pageHeader: {
			title: "Loc8tr",
			strapline: "Find places to work with WIFI near you"
		},
		sidebar: "Looking for wifi and a seat? Loc8tr helps you find places to work when out and about. Perhaps with coffee, cake or pint? Let Loc8tr help you find the place you're looking for.",
		locations: responseBody,
		message: message
	});
};
var renderDetailPage = function(req, res, responseBody){
	
	res.render('location-info', {
	    title: 'Loc8tr - starcups',
        sidebar: "Simon's caffe is on loc8tr because it has accessible wifi and space to sit down with you laptop and get some work done.",
        sidebarSmall: "If you have been and you like it - or if you don't - please leave the review to help other people just like you",
        location: responseBody,
        //message: message
	});
};
var renderReviewForm = function(req, res, responseBody){
	res.render('location-review-form', {
		title: 'Review ' + responseBody.name + ' on Loc8tr',
		pageHeader: {title: "Reviews " + responseBody.name},
		error: req.query.err
	});
};
var _showError = function(req, res, status){
	var title, content;
	if(status === 404){
		title = "404, page not found";
		content = "Oh dear. Looks like we can't find this page. Sorry.";
	}else{
		title = status + ", something's gone wrong.";
		content = "Something, somewere, has gone just a little bit wrong.";	
	}
	res.status = status;
	res.render('generic-text', {title: title, content: content});
};
var getLocationInfo = function(req, res, callback){
	var path = '/api/locations/' + req.params.locationid;
	var requestOptions = {
		url: apiOptions.server + path,
		method: "GET",
		json: {}
	};
	request(requestOptions, function(err, response, body){
		var data = body;
		//console.log('Status: ' + response.statusCode);
		if(response.statusCode === 200){
			callback(req, res, data);
		}else{
			_showError(req, res, response.statusCode);
		}
	});
};
module.exports.homelist = function(req, res){
	var path = "/api/locations";
	var requestOptions = {
		url: apiOptions.server + path,
		method: "GET",
		json: {},
		qs: {
			lng: -0.7992599,
			lat: 51.3780911,
			maxDistance: 20
		}
	};
	request(requestOptions, function(err, response, body){
		renderHomePage(req, res, body);
	});
};

module.exports.locationInfo = function(req, res){
	getLocationInfo(req, res, function(req, res, responseData){
		renderDetailPage(req, res,responseData);
	});
};

module.exports.addReview = function(req, res){
	getLocationInfo(req, res, function(req, res, responseData){
		renderReviewForm(req, res,responseData);
	});
};
module.exports.doAddReview = function(req, res){
	var locationid = req.params.locationid;
	var path = '/api/locations/' + locationid + '/reviews';
	var postData = {
		author: req.body.name,
		rating: parseInt(req.body.rating, 10),
		reviewText: req.body.review
	};
	var requestOptions = {
		url: apiOptions.server + path,
		method: "POST",
		json: postData
	};
	request(requestOptions, function(err, response, responseBody){
		//console.log(req.body);
		if(response.statusCode === 201){
			res.redirect('/location/' + locationid);
		}else if(response.statusCode === 400 && responseBody.name && responseBody.name === 'ValidationError'){
			res.redirect('/location/' + locationid + '/review/new?err=val');
		}else{
			_showError(req, res, response.statusCode);
		}
	});
};