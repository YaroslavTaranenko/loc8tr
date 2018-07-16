var mongoose = require('mongoose');
var loc = mongoose.model('Location');
var ObjectID = require('mongodb').ObjectID;

var sendResp = function(res, status, content){
    res.status(200);
    res.json(content);
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
    sendResp(res, 200, {"status": "success"});
};
module.exports.reviewsDeleteOne = function(req, res){
    sendResp(res, 200, {"status": "success"});
};
