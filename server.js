var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('hw3db', ['hw3db']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/hw3db', function (req, res) {
    console.log('I received a GET request');

    db.hw3db.find(function (err, docs) {
        console.log(docs);
        res.json(docs);
    });
});

app.post('/hw3db', function (req, res) {
    console.log(req.body);
    db.hw3db.insert(req.body, function(err, doc) {
        res.json(doc);
    });
});

app.delete('/hw3db/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.hw3db.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    });
});

app.get('/hw3db/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.hw3db.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    });
});

app.put('/hw3db/:id', function (req, res) {
    var id = req.params.id;
    console.log(req.body.name);
    db.hw3db.findAndModify({
            query: {_id: mongojs.ObjectId(id)},
            update: {$set: {name: req.body.name, description: req.body.description, type: req.body.type}},
            new: true}, function (err, doc) {
            res.json(doc);
        }
    );
});

function getEducation()
{
    var array;
    db.hw3db.find({
        "type" : "edu"
    });

}


app.listen(8080);
console.log("Server running on port 8080");