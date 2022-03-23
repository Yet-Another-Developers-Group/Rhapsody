const { mongoose, Schema } = require('mongoose');
const prefixSchema =    new Schema({
	guildID: Number,
	setterUserID: String,
	setDate: String,
	content: String,
});

module.exports = mongoose.model('PrefixModel', prefixSchema, 'rhapsodyPrefixesCollection');