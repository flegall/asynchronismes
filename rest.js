var Promise = require('bluebird');
var needle = require('needle');
Promise.promisifyAll(needle);

var RestClient = {
    get: function(url) {
        return needle.getAsync(url).then(function(reponseAndBody) {
            return reponseAndBody[0];
        });
    }
};

module.exports = RestClient;
