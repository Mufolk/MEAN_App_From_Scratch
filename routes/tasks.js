//To bring express module
var express = require('express');
//To use the express router.
var router = express.Router();
//To Bring mongojs module
var mongojs = require("mongojs");
//To access the db and the collections
var db = mongojs('mongodb://mufolk:olivia1001@ds255265.mlab.com:55265/mytasklist-mufolk', ['tasks']);

//======================================
//			Get All Tasks
//======================================


//Set the router with a get request
router.get('/tasks', function(req,res,next){
	db.tasks.find(function(err, tasks){
		if(err){
			//to show the error
			res.send(err);
		}
		//to show the json
		res.json(tasks);
	});
});

//======================================
//			Get Single Task
//======================================
//to get an object trough an specifc ID
router.get('/task/:id', function(req,res,next){
	db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, task){
		if(err){
			//to show the error
			res.send(err);
		}
		//to show the json
		res.json(task);
	});
});

//======================================
//			Save Task
//======================================

router.post('/task',function(req,res,next){
	var task = req.body;
	//to check if the info is correct
	if(!task.title || (task.isDone + '')){
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
	} else {
		db.tasks.save(task, function(err, tasks){
			if(err){
				//to show the error
				res.send(err);
			}
			//to show the json
			res.json(task);
		});
	}
});


//======================================
//			Save Task
//======================================


router.delete('/task/:id', function(req,res,next){
	db.tasks.remove({_id: mongojs.ObjectId(req.params.id)},function(err, task){
		if(err){
			//to show the error
			res.send(err);
		}
		//to show the json
		res.json(task);
	});
});

//======================================
//			  Update Task
//======================================
//to update a data that already exists on
router.put('/task/:id', function(req,res,next){
	var task = req.body;
	var updTask = {};

	if(task.isDone){
		updTask.isDone = task.isDone;
	}

	if(task.title){
		updTask.title = task.title;
	}

	if(!updTask){
		res.status(400);
		res.json({
			"error":"Bad Data"
		});
	} else {
		db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updTask, {},function(err, task){
		if(err){
			//to show the error
			res.send(err);
		}
		//to show the json
		res.json(task);
	});
	}

	
});

//to export this to be accessible through
//other files
module.exports = router;