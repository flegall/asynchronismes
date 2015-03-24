var RestClient = require('./rest.js');
var Promise = require('Bluebird');
var _ = require('lodash');

var getWork = function (workName) {
    var workUrl = 'http://localhost:3000/painters/Magritte/works/' + workName;
    return RestClient.get(workUrl);
};

var printWorkTitle = function(work) {
    console.log(work.title);
};

var getWorkAndComments = function (workName) {
    var workUrl = 'http://localhost:3000/painters/Magritte/works/' + workName;
    return Promise.join(RestClient.get(workUrl), RestClient.get(workUrl + '/comments'));
};

var printTitleAndComments = function(results) {
    console.log(results[0].title, results[1]);
};

RestClient.get('http://localhost:3000/painters/Magritte').then(function(result) {
    return Promise.map(result.works, getWorkAndComments, {concurrency: 4});
}).each(printTitleAndComments);