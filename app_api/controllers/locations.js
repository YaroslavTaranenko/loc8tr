var mongoose = require('mongoose');
var loc = mongoose.model('Location');

var sendResp = function(res, status, content){
    res.status(200);
    res.json(content);
};


module.exports.locationsCreate = function(req, res){
    var test = req.body.test;
    sendResp(res, 200, {"status": req.body});
};
module.exports.locationsListByDistance = function(req, res){
    sendResp(res, 200, {"status": "success"});
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
