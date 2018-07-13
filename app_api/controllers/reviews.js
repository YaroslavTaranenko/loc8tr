var mongoose = require('mongoose');
var loc = mongoose.model('Location');

var sendResp = function(res, status, content){
    res.status(200);
    res.json(content);
};

module.exports.reviewsCreate = function(req, res){
    sendResp(res, 200, {"status": "success"});
};
module.exports.reviewsReadOne = function(req, res){
    sendResp(res, 200, {"status": "success"});
};
module.exports.reviewsUpdateOne = function(req, res){
    sendResp(res, 200, {"status": "success"});
};
module.exports.reviewsDeleteOne = function(req, res){
    sendResp(res, 200, {"status": "success"});
};
