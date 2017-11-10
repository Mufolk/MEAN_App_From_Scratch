//To bring express module
var express = require('express');
//To use the express router.
var router = express.Router();

//Set the router with a get request
router.get('/', function(req,res,next){
	res.render('index.html');
});

//to export this to be accessible through
//other files
module.exports = router;