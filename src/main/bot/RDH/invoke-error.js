/**
 * Invokes error.
 * @param {array} args 
 *  */
exports.run = (args) => {
	throw new Error('Horrible Error. Catastrophic Failure.');
};