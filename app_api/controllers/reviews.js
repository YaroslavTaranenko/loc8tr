var mongoose = require('mongoose');
var loc = mongoose.model('Location');
var ObjectID = require('mongodb').ObjectID;

var sendResp = function(res, status, content){
    res.status(200);
    res.json(content);
};

module.exports.reviewsCreate = function(req, res){
    sendResp(res, 200, {"status": "success"});
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
