

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/basic_mongoose');
var UserSchema = new mongoose.Schema({
	name: String,
	age: Number
});
mongoose.model('User', UserSchema);
var User = mongoose.model('User');
// static folder
app.use(express.static(path.join(__dirname, './static')));

// views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	User.find({}, function(err, users) {
		if(err) { console.log('something went wrong');} 
		res.render('index');
	});
	// res.render('users');
})

// routes folder
app.get('/index', function(req, res) {
	User.find({}, function(err, users) {
		if(err) { console.log('something went wrong');} 
		res.render('users');
	});
});


// add user request
app.post('/users', function(req, res) {
	console.log("POST DATA", req.body);
	// create a new User witht the name and age corresponding to those from req.body
	var user = new User({name: req.body.name, age: req.body.age});
	// try to save that new user to the database (this is the method that acttually inserts into the db)
	// and run a callback function with an error (if any) from the operation
	user.save(function(err) {
		//if there is an error console.log that something went wrong!
		if(err) { console.log('something went wrong');}
		res.redirect('/users');
	});
});


// setting our server to listen on Port 8000
app.listen(8000, function() {
	console.log("listening on port 8000");
})



















