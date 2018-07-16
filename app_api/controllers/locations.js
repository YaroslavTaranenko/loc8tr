var mongoose = require('mongoose');
var loc = mongoose.model('Location');

var theEarth = (function(){
    var earthRadius = 6371;

    var getDistanceFromRads = function(rads){
        return parseFloat(rads * earthRadius);
    };

    var getRadsFromDistance = function(distance){
        return parseFloat(distance / earthRadius);
    }

    return {
        getRadsFromDistance: getRadsFromDistance,
        getDistanceFromRads: getDistanceFromRads
    };
})();

var sendResp = function(res, status, content){
    res.status(200);
    res.json(content);
};


module.exports.locationsCreate = function(req, res){
    var test = req.body.test;
    sendResp(res, 200, {"status": req.body});
};
module.exports.locationsListByDistance = function(req, res){
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);
    var point = {
        type: "Point",
        coordinates: [lng, lat]
    };
    var geoOptions = {
        spherical: true,
        maxDistance: theEarth.getRadsFromDistance(20),
        num: 10
    };
    loc.geoNear(point, geoOptions, function(err, results, stats){
        var locations = [];
        if(err){
            sendResp(res, 404, err);
        }else{
            results.foreach(function(doc){
                locations.push({
                    distance: theEarth.getDistanceFromRads(doc.dist),
                    name: doc.obj.name,
                    address: doc.obj.address,
                    rating: doc.obj.rating,
                    facilities: doc.obj.facilities,
                    _id: doc.obj._id
                });
            });
            sendResp(res, 200, locations);
        }
        
    });
};
module.exports.locationsReadOne = function(req, res){
    if(req.params && req.params.locationid){
        loc.findById(req.params.locationid).exec(function(err, location){
            if(!location){
                sendResp(res, 404, {"message": "Location not found"});
                return;
            }else if(err){
                sendResp(res, 200, err);
                return
            }
            sendResp(res, 200, location);
        });
    }else{
        sendResp(res, 404, {"message": "Locationid not defined"});
    };


};
module.exports.locationsUpdateOne = function(req, res){
    sendResp(res, 200, {"status": "success"});
};
module.exports.locationsDeleteOne = function(req, res){
    sendResp(res, 200, {"status": "success"});
};
