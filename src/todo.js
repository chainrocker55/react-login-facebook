var express = require('express');
var router = express.Router();

const f = require('util').format;

const user = encodeURIComponent('chain'); // 
const password = encodeURIComponent('chain555'); //
var dbName = "mobileprogramming" // 

var MongoClient = require('mongodb').MongoClient;
// moogose 
const dbUrl = f("mongodb://%s:%s@ds215563.mlab.com:15563/%s", user, password, dbName);

var ObjectID = require('mongodb').ObjectID;

router.get('/', function (req, res) {
    MongoClient.connect(dbUrl, function(err, client) {
		const db = client.db(dbName).collection('member').find({}).toArray(function (err, result) {
			client.close();
			if (err) res.send(err);
			res.status(200);
			res.send(result);
		});
	});
});

router.post('/', function (req, res) {
	MongoClient.connect(dbUrl, function(err, client) {
		const db = client.db(dbName).collection('member').insertOne(req.body,function (err, result) {
			client.close();
			if (err) res.send(err);
			res.status(200);
			res.send("Insert Success!");
		});
	});
})

router.delete('/', function (req, res) {
		
})

router.put('/', function (req, res) {
	MongoClient.connect(dbUrl, function(err, client) {
		const db = client.db(dbName).collection('member').insertOne(req.body,function (err, result) {
			client.close();
			if (err) res.send(err);
			res.status(200);
			res.send(Insert);
		});
	});
})

module.exports = router;