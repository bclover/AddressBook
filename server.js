var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/addressbook');
var Address = require('./models/addressModel');
var app = express();
var port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

addressRouter = require('./routes/addressRoutes')(Address);

app.get('/', function (req, res) {
    res.send('Welcome to my API!');
});

//Log when server is running
app.listen(port, function () {
    console.log('AddressBook was started on port number ' + port);
});

app.use(express.static('/Users/bryanclover/WebstormProjects/AddressBook'));
app.use('/api/addresses', addressRouter);