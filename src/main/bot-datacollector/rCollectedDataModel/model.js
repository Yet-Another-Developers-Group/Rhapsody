const { mongoose, Schema } = require('mongoose');
const collectedDataSchema =    new Schema({
	commandIdentifier: String,
	data: String,
});

module.exports = mongoose.model('CollectedDataModel', collectedDataSchema, 'rhapsodyCollectedDataCollection');