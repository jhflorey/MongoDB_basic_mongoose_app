
module.exports = function Route(app){
	// root route to render the index.ejs view
	app.get('/', function(req, res) {
	 res.render("index");
	})
	// post route for adding a data from a mongoose
	app.post('/users', function(req, res) {
		submitted_info = {
			name: req.body.name,
			age: req.body.age
		};
	 	res.render("users",{user_data: submitted_info});
	})
};