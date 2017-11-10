//Bring express module from node modules folder
var express = require('express'); 
//Bring path module too. It's a system module.
//Hel´ps file systems paths and other stuffs.
var path = require('path');
//Bring body parser module.
var bodyParser = require('body-parser');

//index refers to a index file, the homepage
//tasks refers to the tasks file api 
//to work with mongoDB
var index = require('./routes/index');
var tasks = require('./routes/tasks');

//To set a port
var port = 3000;

// main app variable
var app = express();

//==========================================
//				View Engine
//==========================================

// to let the system know what folder we want
//to use for our views
app.set('views', path.join(__dirname, 'views'));
//to specify the engine
app.set('view engine', 'ejs');
//to set the engine to be able to read certain
//kind of extensions
app.engine('html', require('ejs').renderFile);

//==========================================
//			Set Static Folder
//==========================================
//To set where the angular stuff will be
app.use(express.static(path.join(__dirname, 'client')));

//==========================================
//		Body Parser MiddleWare
//==========================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({etended: false}));
//Creating route to the homepage
app.use('/', index);
//Creating route to the tasks api
app.use('/api', tasks);

app.listen(port, function(){
	console.log('Server started on port ' + port);
});