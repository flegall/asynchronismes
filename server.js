var express = require('express');
var app = express();

var _ = require('lodash');

var works = require('./works.js');

function replySlowly(res, message) {
    setTimeout(function(){
        res.send(message);
    }, 500);
}

app.get('/', function(req, res) {
    replySlowly(res, 'hello world');
});

app.get('/painters', function(req, res) {
    replySlowly(res, ['Magritte']);
});

app.get('/painters/Magritte', function(req, res) {
    replySlowly(res, {
        name: 'René Magritte',
        born: '1898-11-21T00:00:00.000',
        died: '1968-08-15T00:00:00.000',
        description: 'René François Ghislain Magritte (French: [magʁit]; ' +
            '21 November 1898 – 15 August 1967) was a Belgian surrealist artist. ' +
            'He became well known for a number of witty and thought-provoking images ' +
            'that fall under the umbrella of surrealism. His work is known for ' +
            'challenging observer\'s preconditioned perceptions of reality.',
        works: _.keys(works)
    });
});

function someComment(index) {
    return ['Great', 'Marvellous', 'Fun', 'I don\'t like it', 'It\'s fun', 'I love it', 'I hate it'][index%7];
}

function makeComments(req) {
    var number = works[req.params.work].paintedIn % 7;
    var comments = [];
    for (var i = 0; i < number; i++) {
        comments.push(someComment(works[req.params.work].paintedIn + i));
    }
    return comments;
}
app.get('/painters/Magritte/works', function(req, res) {
    res.send(_.keys(works));
});

app.get('/painters/Magritte/works/:work', function(req, res) {
    replySlowly(res, works[req.params.work]);
});

app.get('/painters/Magritte/works/:work/comments', function(req, res) {
    replySlowly(res, makeComments(req));
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