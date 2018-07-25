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
    loc.create({
        name: req.body.name,
        address: req.body.address,
        facilities: req.body.facilities.split(','),
        coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
        openingTimes: [{
            days: req.body.days1,
            opening: req.body.opening1,
            closing: req.body.closing1,
            closed: req.body.closed1
        },{
            days: req.body.days2,
            opening: req.body.opening2,
            closing: req.body.closing2,
            closed: req.body.closed2
        }]
    }, function(err, location){
        if(err){
            sendResp(res, 500, err);
        }else{
            sendResp(res, 200, location);
        }
    });
};
module.exports.locationsListByDistance = function(req, res){
    loc.find().sort({'name': 1}).exec(function(err, result){
        if(err){
            sendResp(res, 500, err);
            return;
        }else{
            if(!result){
                sendResp(res, 404, "Locations not found");
                return;
            }else{
                sendResp(res, 200, result);
            }
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
                sendResp(res, 404, err);
                return
            }
            sendResp(res, 200, location);
        });
    }else{
        sendResp(res, 404, {"message": "Locationid not defined"});
    };


};
module.exports.locationsUpdateOne = function(req, res){
    if(!req.params.locationid){
        sendResp(res, 404, {"message": 'Not found, locationid is required.'});
        return;
    }
    loc.findById(req.params.locationid).select("-reviews -rating").exec(function(err, result){
        if(!result){
            sendResp(res, 404, "Location not found.");
            return;
        }else if(err){
            sendResp(res, 400, err);
            return;
        }
        result.name = req.body.name;
        result.address = req.body.address;
        result.facilities = req.body.facilities.split(",");
        result.coords = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
        result.openingTimes = [{
            days: req.body.days1,
            opening: req.body.opening1,
            closing: req.body.closing1,
            closed: req.body.closed1
        },{
            days: req.body.days2,
            opening: req.body.opening2,
            closing: req.body.closing2,
            closed: req.body.closed2
        }];
        result.save(function(err, location){
            if(err){
                sendResp(res, 400, err);
            }else{
                sendResp(res, 200, location);
            }
        });
    });
};
module.exports.locationsDeleteOne = function(req, res){
    var locationId = req.params.locationid;
    if(locationId){
        loc.findByIdAndRemove(locationId).exec(function(err, location){
            if(err){
                sendResp(res, 400, err);
            }else{
                sendResp(res, 204, null);
            }
        });
    }else{
        sendResp(res, 404, {"message": "No location id"});
    }
};
