const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
	name: String,
	age: Number,
	grade: Number,
	level: [{
		type: Schema.Types.ObjectId,
		ref: 'Level'
	}]

});

module.exports = mongoose.model('Student', studentSchema);