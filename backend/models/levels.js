const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const levelSchema = new Schema({
	a_level: Number,
	b_level: Number,
	c_level: Number,
	studentId: String

});

module.exports = mongoose.model('Level', levelSchema);