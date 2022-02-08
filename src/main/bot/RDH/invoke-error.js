/**
 * Invokes error.
 * @param {array} args 
 *  */
exports.run = (args) => {
	throw new Error('Invoked error.');
};