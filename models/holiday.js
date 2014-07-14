var mongoose = require('../libs/mongoose');
var Schema = mongoose.Schema;

var holidaySchema = new Schema({
	name: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: true
	}, 
	description: {
		type: String,
		required: true
	},
	img: [{
		name: String,
		contentType: String,
		data: Buffer
	}]
})

holidaySchema.statics.addHoliday = function (holiday, res, callback) {

	// Check input
	if (typeof holiday !== 'undefined' && typeof holiday !== 'null' && holiday instanceof Object  &&  holiday.date instanceof Date) {
			var newHoliday = new this({
				date: holiday.date,
				name: holiday.name,
				description: holiday.description,
				img: holiday.img
			});
			newHoliday.save(function (err) {
			  if (err) {
			  	console.log(err.name + ': ' +  err.errors.name.message);
			  } else {
			  	console.log('Svaing sucsess');
			  	res.send(200);
			  	return true
			  	
			  	// if callback exist run it
			  	if (typeof callback !== 'undefined' ) {
			  		callback();
			  	}
			  }
			});
	} else 
		if (typeof holiday == 'undefined' || typeof holiday == 'null' || !(holiday instanceof Object)) {
			console.log('InvalidArguments: Missing object or argument is not an object.');
			return false
		} else {
			console.log('InvalidArguments: Incorrect date.');
			return false
			}
};

holidaySchema.statics.removeHolidays =	function (holidaysMass, res, callback) {

	// Check input
	if (typeof holidaysMass !== 'undefined' && holidaysMass !== 'null') {

		// check if argument not an array, else wrap it to array
		if (!(holidaysMass instanceof Array)) {
			holidaysMass = [holidaysMass]; 
		}

		// remove array of documents from collection
		for (var i = 0; i < holidaysMass.length; i++) {
			this.remove(
	            {_id: holidaysMass[i]._id},
		            function(err, docs) {
			            if (!err){ 

			            	// Show how much documents are affected
			               console.log('Affected ' + docs + ' documents.');
			               res.send(200);
			               return true

							// if callback exist run it
						  	if (typeof callback !== 'undefined' ) {
						  		callback();
						  	}
			            }
			            else { throw err;}
			            }
    );
		}
	} else {
		console.log('InvalidArguments: Missing argument or array is empty.')
	}
};

holidaySchema.statics.updateHoliday = function (condition, update, callback) {
	if (typeof condition !== 'undefined' && condition !== 'null' && condition instanceof Object) {
		this.update(
			{ name: condition.name },
			{ date: update.date, name: update.name, description: update.description },
			{multi: true}, 
			function (err, docs) {
				if (!err) { 
					// Show how much documents are affected
					console.log('Affected ' + docs + ' documents.');
					return true
					// if callback exist run it
					if (typeof callback !== 'undefined' ) {
						callback();
					}
				}
				else { 
					throw err; 
					return false
				}
		});
	} else {
		console.log('InvalidArguments: Object is empty or not exist.');
		return false
	}
};

holidaySchema.statics.getHolidays = function (condition, selection, callback) {
	if (typeof selection == 'function') {
		callback = selection;
		selection = '';
	} else if (typeof selection == 'undefined') {
		selection = '';
	}
	if (typeof condition !== 'undefined' && condition !== 'null' && condition instanceof Object) {
		this.find(condition).select(selection).exec( function (err, docs) {
			if (!err) { 
				callback(docs);
			}
			else { 
				throw err; 
				return false
			}
		});
	}
}; 

holidaySchema.statics.findAll = function (res, callback) {
	this.find( {}, function(err, docs) {
		res.send(200, docs);
	});
} 

exports.Holiday = mongoose.model('Holiday', holidaySchema);