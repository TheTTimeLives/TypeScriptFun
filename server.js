const express = require('express');
const bp = require('body-parser');
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');


//Why do what I did below, it didn't fix anything. It looks like the body parser middleware isn't working with the post.
// npm install --save @types/body-parser

//why don't I have to say new here?
let app = express();

//explain static files
//I'm sure this means, parse any thing in the format of like an api request ala urlencoded and any json data that is sent, I should comment out the json so I can get familiar with what the json error looks like
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use(express.static(__dirname + '/app'));

let db = require('./models');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/app/page.html');
});

app.get('/todolist', function (req, res) {
    db.ToDo.find({})
        .then(function (dbArticle) {

            // If we were able to successfully find Articles, send them back to the client

            //No issues with the data on this side so I think we're passing the model
            console.log(dbArticle);
            console.log(dbArticle[0]);
            console.log(dbArticle[0].time);
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});



app.post('/postroute', function (req, res) {
    console.log('We got hit');
    console.log(req.body);

    db.ToDo.create(req.body)
        .then(function (dbArticle) {
            console.log(dbArticle);
        })
        .catch(function (err) {
            console.log(err.body);
        });
});

app.delete('/deletelisting/:id', function (req, res) {
    console.log('Delete got hit');
    console.log(req.params.id);

    // db.ToDo.create(req.body)
    //     .then(function (dbArticle) {
    //         console.log(dbArticle);
    //     })
    //     .catch(function (err) {
    //         console.log(err.body);
    //     });

    db.ToDo.remove({ _id: req.params.id }, function (err) {
        console.log('REQ.BODY BELOW');
        console.log(req.body);
        if (!err) {
            // message.type = 'notification!';
            console.log('The thing was removed');
        }
        else {
            // message.type = 'error';
            console.log(err);
        }
    });
});

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/todolist";

//What happens if I don't tell it to you use ES6 promises?
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.listen(PORT, function () {
    console.log('App listening');
})