var mongoose = require('mongoose');



var reviewSchema = new mongoose.Schema({
    author: {type: String, required: true},
    rating: {type: Number, required: true, min: 0, max: 5},
    reviewText: {type: String, required: true},
    createdOn: { type: Date, default: Date.now }
});

var openingTimeSchema = new mongoose.Schema({
    days: {type: String, required: true},
    opening: String,
    closing: String,
    closed: {type: Boolean, required: true}
});

var locationSchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: String,
    rating: {type: Number, "default": 0, min: 0, max: 5},
    facilities: [String],
    coords: {type: [Number], index: '2dsphere'},
    openingTimes: [openingTimeSchema],
    reviews: [reviewSchema]
});

mongoose.model('Location', locationSchema, 'locations');
/*
db.locations.save({
    name: "Starcups",
    address: "125 High Street, Reading, rg-7, 1PS",
    rating: 0,
    facilities: ["Hot drinks", "Food", "Premium WIFI"],
    distance: "100m",
    coords: ['-0.9690884', '51.455041'],
    openingTimes: [{
        days: 'Monday - Friday',
        opening: '7:00am',
        closing: '7:00pm',
        closed: false
    },{
        days: 'Saturday',
        opening: '8:00am',
        closing: '5:00pm',
        closed: false
    },{
        days: 'Sunday',
        closed: true
    }]
});
db.locations.update({name: "Starcups"}, {
    $push:{
        reviews:{
            rating: 5,
            _id: ObjectId(),
            author: "Simon Holmes",
            createdOn: Date("Jul 16, 2013"),
            reviewText: "What a great place. I can't say enough good things about it"
        }
    }
});
db.locations.update({name: "Starcups"}, {
    $push:{
        reviews:{
            rating: 3,
            _id: ObjectId(),
            author: "Simon Holmes",
            createdOn: Date("Jul 17, 2013"),
            reviewText: "It was ok. Coffe wasn't great, but the wifi was fast."
        }
    }
});
db.locations.save({
    name: "Coffe Hero",
    address: "125 High Street, Reading, rg-7, 1PS",
    rating: 0,
    facilities: ["Hot drinks", "Food", "Premium WIFI"],
    distance: "200m",
    coords: ['-0.9690884', '51.455041'],
    openingTimes: [{
        days: 'Monday - Friday',
        opening: '7:00am',
        closing: '7:00pm',
        closed: false
    },{
        days: 'Saturday',
        opening: '8:00am',
        closing: '5:00pm',
        closed: false
    },{
        days: 'Sunday',
        closed: true
    }]
});
db.locations.save({
    name: "Burger quin",
    address: "125 High Street, Reading, rg-7, 1PS",
    rating: 0,
    facilities: ["Hot drinks", "Food", "Premium WIFI"],
    distance: "350m",
    coords: ['-0.9690884', '51.455041'],
    openingTimes: [{
        days: 'Monday - Friday',
        opening: '7:00am',
        closing: '7:00pm',
        closed: false
    },{
        days: 'Saturday',
        opening: '8:00am',
        closing: '5:00pm',
        closed: false
    },{
        days: 'Sunday',
        closed: true
    }]
});
* */