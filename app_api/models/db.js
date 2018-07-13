var mongoose = require('mongoose');

var dbUri = 'mongodb://localhost/loc8tr';

mongoose.connect(dbUri);

var gracefullShutdown = function(msg, callback){
    mongoose.connection.close(function(){
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

mongoose.connection.on('connected', function(){
    console.log("Mongoose connected to " + dbUri);
});

mongoose.connection.on('error', function(err){
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function(){
    console.log('Mongoose disconnected');
});

process.once("SIGUSR2", function(){
    gracefullShutdown('nodemon restart', function(){
        process.kill(process.pid, 'SIGUSR2');
    });
});

process.on('SIGINT', function(){
    gracefullShutdown('app termination', function(){
        process.exit(0);
    });
});

process.on('SIGTERM', function(){
    gracefullShutdown('heroku termination', function(){
        process.exit(0);
    });
});

require('./locations');