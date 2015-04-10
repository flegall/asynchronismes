var RestClient = require('./rest.js');
var Promise = require('Bluebird');
var _ = require('lodash');

var printWorkTitle = function(work) {
    console.log(work.title + ' painted in ' + work.paintedIn);
    return work;
};

var getWork = function (workName) {
    var workUrl = 'http://localhost:3000/painters/Magritte/works/' + workName;
    return RestClient.get(workUrl).then(printWorkTitle);
};

RestClient.get('http://localhost:3000/painters/Magritte').then(function(result) {
    var promisesFunctions = _.map(result.works, function(workName) {
        return function() {
            return getWork(workName);
        };
    });

    return _.reduce(promisesFunctions, function(previous, current) {
        return previous.then(current);
    }, Promise.resolve());
});