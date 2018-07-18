var mongoose = require('mongoose');
var loc = mongoose.model('Location');
var ObjectID = require('mongodb').ObjectID;

var sendResp = function(res, status, content){
    res.status(200);
    res.json(content);
};

var doSetAverageRating = function(location){
    var i, reviewCount, ratingAverage, ratingTotal;
    if(location.reviews && location.reviews.count > 0){
        reviewCount = location.reviews.length;
        ratingTotal = 0;
        for(i = 0; i < reviewCount; i++){
            ratingTotal = ratingTotal + location.reviews[i].rating;
        }
        ratingAverage = parseInt(ratingTotal/reviewCount, 10);
        location.rating = ratingAverage;
        location.save(function(err, result){
            if(err){
                console.log(err);
            }else{
                console.log('Average rating updated to ', ratingAverage);
            }
        });
    };
};

var updateAverageRating = function(locationId){
    loc.findById(locationId).exec(function(err, result){
        if(!err){
            doSetAverageRating(result);
        }
    });
};

module.exports.reviewsCreate = function(req, res){
    var locationId = req.params.locationid;
    if(locationId){
        loc.findById(locationId).select('reviews').exec(function(err, location){
            if(err){
                sendResp(res, 400, err);
            }else{
                location.reviews.push({
                    author: req.body.author,
                    rating: req.body.rating,
                    reviewText: req.body.reviewText
                });
                location.save(function(err, updatedLoc){
                    var newRev;
                    if(err){
                        sendResp(res, 400, err);
                    }else{
                        updateAverageRating(updatedLoc._id);
                        newRev = location.reviews[location.reviews.length - 1];
                        sendResp(res, 200, newRev);
                    }
                });
            }
        });

    }else{
        sendResp(res, 404, {"message": "Location not found."})
    }
};
module.exports.reviewsReadOne = function(req, res){
    if(req.params && req.params.locationid && req.params.reviewsid){
        loc.findById(req.params.locationid)
            .select('name reviews').exec(function(err, location){
                var response, review;
                if(!location){
                    sendResp(res, 404, {"message": "Location not found"});
                    return;
                }else if(err){
                    sendResp(res, 200, err);
                    return
                }
                //console.log('reviews: ' + location.reviews.length);
                if(location.reviews && location.reviews.length > 0){
                    review = location.reviews.id(ObjectID(req.params.reviewsid));
                    console.log(location.reviews);
                    if(!review){
                        sendResp(res, 404, {"message": "Review not found."});
                    }else{
                        response = {
                            location: {
                                name: location.name,
                                id: req.params.locationid

                            },
                            review: review
                        }
                        sendResp(res, 200, response);
                    }
                }else{
                    sendResp(res, 404, {"message": "No reviews found"});
                }

        });
    }else{
        sendResp(res, 404, {"message": "Not all ids defined"});
    };
};
module.exports.reviewsUpdateOne = function(req, res){
    if(!req.params.locationid || !req.params.reviewsid){
        sendResp(res, 404, {"message", 'Not found, locationid and reviewsid is required.'});
        return;
    }
    loc.findById(req.params.locationid).select("reviews").exec(function(err, result){
        var thisReview;
        if(!result){
            sendResp(res, 404, "Location not found.");
            return;
        }else if(err){
            sendResp(res, 400, err);
            return;
        }
        if(result.reviews && result.reviews.length > 0){
            thisReview = result.reviews.id(req.params.reviewsid);
            if(!thisReview){
                sendResp(res, 404, {"message":"Review not found."});
            }else{
                thisReview.author = req.body.author;
                thisReview.rating = req.body.rating;
                thisReview.reviewText = req.body.reviewText;

                result.save(function(err, location){
                    if(err){
                        sendResp(res, 400, err);
                    }else{
                        updateAverageRating(location._id);
                        sendResp(res, 200, location);
                    }
                });
            }
        }else{
            sendResp(res, 404, {"message": "No review to update"});
        }
        
    });
};
module.exports.reviewsDeleteOne = function(req, res){
    if(!req.params.locationid || !req.params.reviewsid){
        sendResp(res, 404, {"message", 'Not found, locationid and reviewsid is required.'});
        return;
    }
    loc.findById(req.params.locationid).select("reviews").exec(function(err, result){
        var thisReview;
        if(!result){
            sendResp(res, 404, "Location not found.");
            return;
        }else if(err){
            sendResp(res, 400, err);
            return;
        }
        if(result.reviews && result.reviews.length > 0){
            thisReview = result.reviews.id(req.params.reviewsid);
            if(!result.reviews.id(req.params.reviewsid)){
                sendResp(res, 404, {"message":"Review not found."});
            }else{
                result.reviews.id(req.params.reviewsid).remove();

                result.save(function(err, location){
                    if(err){
                        sendResp(res, 400, err);
                    }else{
                        updateAverageRating(location._id);
                        sendResp(res, 204, null);
                    }
                });
            }
        }else{
            sendResp(res, 404, {"message": "No review to delete"});
        }
        
    });
};
