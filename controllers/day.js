var Holiday = require('../models/holiday').Holiday;
var fs = require("fs");

// Find holiday by ID
exports.findById = function (req, res) {
	var con = {
		_id: req.params.id
	};
	Holiday.getHolidays(con, function (docs) {
		console.log(docs);
		res.send(docs);
	});
}

// Find holiday by date
exports.findByDate = function (req, res) {
	var start = new Date(req.params.yy, req.params.mm - 1, req.params.dd);
	var end = new Date(req.params.yy, req.params.mm - 1, req.params.dd, 23, 59, 59, 59);
	var con = {
		date: { $gt: start, $lt: end}
	}
	Holiday.getHolidays(con, function (docs) {
		console.log(docs);
		res.send(docs);
	});
}

// Find current holiday(& near 2)
exports.findCurrent = function (req, res) {
	var current = new Date();
	// current.setMonth(current.getMonth() - 1);
	var yesterday = new Date(current.getFullYear(), current.getMonth(), current.getDate() - 1);
	var tomorrow = new Date(current.getFullYear(), current.getMonth(), current.getDate() +1, 23, 59, 59, 59);
	var q = {
		date: {$gt: yesterday, $lt: tomorrow}
	}
	Holiday.getHolidays(q, function (docs) {
		res.send(docs);
	});
}

exports.findAll = function (req, res) {
	Holiday.findAll(res);
}

// Dynamic search
exports.search = function (req, res) {
	var q = req.body;
	var s = 'name';
	Holiday.getHolidays(q, s, function (docs) {
		console.log(docs);
		res.send(docs);
	});
}

// delete
exports.delete = function (req, res) {
	var q = req.body;
	Holiday.removeHolidays(q, res);
}

// add holiday
exports.add = function (req, res) {
	var q = req.body;
	// var f = req.files;
	q.date = new Date(q.8878date);
	// console.log(req.headers);
	// console.log(f);
	// console.log(q);
	Holiday.addHoliday(q, res);
}
