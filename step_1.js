var RestClient = require('./rest.js');
var Promise = require('Bluebird');
var _ = require('lodash');

RestClient.get('http://localhost:3000/painters/Magritte').then(function(result) {
   console.log(result);
});