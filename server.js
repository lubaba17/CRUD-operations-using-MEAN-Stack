/** 
 *Including all the module dependencies
 */
var express= require('express');
var app= express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');

//requires mongojs module
//First arg is the name of the mongodb database
//Secong arg is the name of the collection we are going to use 
var db = mongojs('organization', ['organization']);

//The server will look for static files like html, css, images and javascript files.
//These files will be placed in a folder called public
app.use(express.static(__dirname + "/public"));

//Parse the body of the input that the server receives
app.use(bodyParser.json());

//'/organization'- route to get our data from
//app.get tells the server to listen for the GET request for our created organization route.
app.get('/organization', function(req, res){
	console.log("I received a get request");
	//connecting to mongodb database
	db.organization.find(function(err, docs){
		console.log(docs);

		/** Its going to respond with the GET request by sending back the data in a json format
		 * which the controller can then use
		 */
		res.json(docs);
	});

});

//Below code inserts the new data into the database as well as sense the new data from the database back to the controller
//app.post listens for the POST request from the controller
app.post('/organization', function(req, res){
	console.log(req.body);

	//req.body- we are requesting the data from the body of the parsed input data.
	//docs- item that we parsed and received
	//Inserting the details into the mongodb database
	db.organization.insert(req.body, function(err, docs){
		//send back the data to our controller
		res.json(docs);
	});
});


//Function to delete the employee details
app.delete('/organization/:id', function(req, res){
	//id contains the value if the id from the url
	var id = req.params.id;
	console.log(id); 

	// Remove the details from the mongodb database
	db.organization.remove({_id: mongojs.ObjectId(id)}, function(err, docs){
		res.json(docs);
	});
});

//Respond to the GET request that was just sent from the controller
//It will send back all the data for the details we requested to the controller
app.get('/organization/:id', function(req, res){
	var id = req.params.id;
	console.log(id); 
	//findOne(..)- code to find one specific employee details from the database
	db.organization.findOne({_id: mongojs.ObjectId(id)}, function(err, docs){
		res.json(docs);
	});
});

//PUT request to send the new data
app.put('/organization/:id', function(req, res){
	var id = req.params.id;
	//Print to the console to print the name
	console.log(req.body.name);
	//Update and modify the contact in the mongodb database
	//query: {_id: mongojs.ObjectId(id)- selects the contact that we want to modify
	db.organization.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, designation: req.body.designation, manager: req.body.manager}},
		new: true}, function(err, doc){
			res.json(doc);
		});

	
});

//Invoking the app.listen() method
//Listens for connections on the port 3000
app.listen(3000);
console.log("Server running on port 3000");






