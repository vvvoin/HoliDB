
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./config/config');	// config.json
var mongoose = require('./libs/mongoose'); 	// connect db

// connect controllers
var index = require('./controllers/index').index;
var day = require('./controllers/day');

var app = express();

// all environments
app.set('port', process.env.PORT || config.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.configure('development', function () { app.locals.pretty = true; });

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// controllers
app.get('/', index);
app.get('/update', day.findCurrent);
app.get('/day/:id', day.findById);
app.get('/day/:yy/:mm/:dd', day.findByDate);
app.post('/search', day.search);
app.post('/delete', day.delete);
app.post('/add', day.add);
app.get('/findAll', day.findAll);

app.use('/static', function (req, res) {
	console.log('yay!');
	res.end();
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
