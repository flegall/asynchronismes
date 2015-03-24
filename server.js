var express = require('express');
var app = express();

var works = require('./works.js');


app.get('/', function(req, res) {
    res.send('hello world');
});

app.get('/painters', function(req, res) {
    res.send(['Magritte']);
});

app.get('/painters/Magritte', function(req, res){
    res.send({
        name: 'René Magritte',
        born: '1898-11-21T00:00:00.000',
        died: '1968-08-15T00:00:00.000',
        description: 'René François Ghislain Magritte (French: [magʁit]; ' +
            '21 November 1898 – 15 August 1967) was a Belgian surrealist artist. ' +
            'He became well known for a number of witty and thought-provoking images ' +
            'that fall under the umbrella of surrealism. His work is known for ' +
            'challenging observer\'s preconditioned perceptions of reality.'
    });
});

app.get('/painters/Magritte/works', function(req, res) {
    res.send(['le_fils_de_lhomme', 'golconde', 'la_reproduction_interdite',
        'la_trahison_des_images', 'la_condition_humaine', 'les_amants',
        'le_faux_miroir', 'la_chambre_decoute']);
});

app.get('/painters/Magritte/works/:work', function(req, res) {
    res.send(works[req.params.work]);
});

app.get('/painters/Magritte/works/:work/file.jpg', function(req, res) {
    var options = {
        root: __dirname + '/files/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    var fileName = req.params.work + '.jpg';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        }
        else {
            console.log('Sent:', fileName);
        }
    });
});

app.listen(3000);