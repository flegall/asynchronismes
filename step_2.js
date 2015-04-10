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
   var promises = _.map(result.works, getWork);
   return Promise.all(promises);
});