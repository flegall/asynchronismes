var RestClient = require('./rest.js');

RestClient.get('http://localhost:3000/painters/Magritte').then(function(response){
    console.log(response.body);
});
