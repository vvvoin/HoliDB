var mongoose = require('mongoose');
var config = require('../config/config'); // get config for DB connection

mongoose.connect(config.mongoose.uri, config.mongoose.options);

module.exports = mongoose;
