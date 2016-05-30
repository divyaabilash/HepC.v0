var express = require('express');
var app  = express();
var mongojs = require('mongojs');
var adminDB = mongojs('adminReg',['adminReg']);
var patientDB = mongojs('patientReg',['patientReg']);
var doctorDB = mongojs('doctorReg',['doctorReg']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/adminReg/:fName',function(req, res){
	console.log("I recieved a GET request");
	var name = req.params.fName;
	console.log(name);
	adminDB.adminReg.find({fName: name},function(err,doc){
		console.log(doc);
		if(doc.length){
			console.log("User exists");	
			res.json(doc);
		}else{
			console.log("User doesn't exist");	
			res.json(doc);
		}
	});
});

app.post('/adminReg', function(req, res){
	console.log("Inserted");
	console.log(req.body);	
	adminDB.adminReg.insert(req.body,function(err,docs){
		console.log("in server "+docs);
		res.json(docs);
	});
});


app.post('/patientReg',function(req,res){
	console.log("Inserted Patient");
	console.log(req.body);
	patientDB.patientReg.insert(req.body, function(err,docs){
		console.log("Inserting in DB "+docs);
		res.json(docs);
	});
});

app.put('/updatePatient/:id', function(req,res){
	console.log("I received PUT request from patient.");
	var id = req.params.id;
	patientDB.patientReg.findAndModify({query:{_id: mongojs.ObjectId(id)}, 
			update: {$set: {genderVal: req.body.genderVal, selRace: req.body.selRace, insr: req.body.insr, isHomls: req.body.isHomls}}, new: "true"}, 
			function(err,doc){
				console.log(doc);
				res.json(doc);
			});
});

app.get('/checkPatient/:fName',function(req, res){
	console.log("I received get request from Patient.");
	var name = req.params.fName;
	patientDB.patientReg.find({fName:name},function(err, doc){
		console.log(doc);
		var dataLen = doc.length;
		console.log("dataLen: "+dataLen);
		if(dataLen>0){
			$scope.message = "Patient already exists;"
		}else{
			
		}
	});
});

app.post('/doctorReg',function(req,res){
	console.log("Inside Doctor registration at Server");
	console.log(req.body);
	doctorDB.doctorReg.insert(req.body,function(err,doc){
		console.log("Inserting in DB "+doc)
		res.json(doc);
	});
});

app.get('/doctorDetails/:fName', function(req,res){
	console.log("I received a GET request");
	var name = req.params.fName;
	console.log("Name: "+name);
	doctorDB.doctorReg.find({fName:name},function(err,doc){
		res.json(doc);
	});
});

app.get('/adminView',function(req,res){
	console.log("I received a GET request.");
	adminDB.adminReg.find(function(err,doc){
		res.json(doc);
	});
});

app.get('/patientView', function(req, res){
	console.log("Received patient get requrest.");
	patientDB.patientReg.find(function(err,docs){
		console.log("res from server"+docs);
		res.json(docs);
	});
});

app.get('/viewDoctor', function(req,res){
	console.log("Recieved get request for Doctors");
	doctorDB.doctorReg.find(function(err,doc){
		res.json(doc);
	});
});

app.delete('/deleteAdmin/:fName', function(req, res){
	console.log("I recieved a delete request.");
	var name = req.params.fName;
	adminDB.adminReg.remove({fName:name}, function(err, doc){
		res.json(doc);
	});
});

app.delete('/deletePatient/:fName', function(req, res){
	console.log("I received a request to delete.");
	var name = req.params.fName;
	console.log("name: "+name);
	patientDB.patientReg.remove({fName:name},function(err,doc){
		res.json(doc);
	});
});

app.delete('/deleteDoctor/:fName',function(req,res){
	console.log("I received a request to delete a doctor.");
	var name = req.params.fName;
	console.log("name: "+name);
	doctorDB.doctorReg.remove({fName:name}, function(err,doc){
		res.json(doc);
	});
});


app.listen(8006);
console.log("server started..")