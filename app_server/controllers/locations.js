module.exports.homelist = function(req, res){
	res.render('locations-list', {
		title: 'Loc8tr - find a place to work with wifi',
		pageHeader:{
			title: 'Loc8tr',
			strapline: 'find a place to work with wifi near you!'
		},
        sidebar: "Loc8tr helps you to find places to work when out and about.",
		locations: [{
			name: "Starcups",
            address: "125 High Street, Reading, rg-7, 1PS",
            rating: 0,
            facilities: ["Hot drinks", "Food", "Premium WIFI"],
            distance: "100m"
		},{
            name: "Coffe hero",
            address: "125 High Street, Reading, rg-7, 1PS",
            rating: 3,
            facilities: ["Hot drinks", "Food", "Premium WIFI"],
            distance: "200m"
		},{
            name: "Burger quin",
            address: "125 High Street, Reading, rg-7, 1PS",
            rating: 5,
            facilities: ["Hot drinks", "Food", "Premium WIFI"],
            distance: "450m"
		}]

	});
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