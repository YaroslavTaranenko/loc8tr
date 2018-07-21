var request = require('request');
var apiOptions = {
	server: "http://localhost:3000"
}
var renderHomePage = function(req, res){
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
		renderHomePage(req, res);
	});
};

module.exports.homelist = function(req, res){
	renderHomePage(req, res);
};

module.exports.locationInfo = function(req, res){
	res.render('location-info', {
	    title: 'Loc8tr - starcups',
        sidebar: "Simon's caffe is on loc8tr because it has accessible wifi and space to sit down with you laptop and get some work done.",
        sidebarSmall: "If you have been and you like it - or if you don't - please leave the review to help other people just like you",
        location: {
	        name: "Starcups",
            address: "125 High Street, Reading, rg-7, 1PS",
            rating: 0,
            workTimes: ["Monday - Friday: 7:00am - 7:00pm", "Saturday: 8:00am - 5:00pm", "Sunday: closed"],
            facilities: ["Hot drinks", "Food", "Premium WIFI"],
            distance: "100m",
            map: "http://maps.googleapis.com/maps/api/staticmap?center=51.455041,-0.9690884&zoom=17&size=400x350&sensor=false&markers=51.455041,-0.9690884&scale=2",

            reviews: [{
	            rating: 5,
                author: "Simon Holmes",
                date: "16 July 2013",
                review: "What a great place. I can't say enough good things about it"
            },{
                rating: 3,
                author: "Simon Holmes",
                date: "17 July 2013",
                review: "It was ok. Coffe wasn't great, but the wifi was fast."
            }]
        }
	});
};

module.exports.addReview = function(req, res){
	res.render('location-review-form', {title: 'Add review'});
};