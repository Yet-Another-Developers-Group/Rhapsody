async function getRhapsodyInfo() {
	var information = {
		config: {
			defaultEmbetColor: require('../../config.json').defaultEmbedColor,
			prefix: require('../../config.json').prefix,
			apiPort: require('../../config.json').port,
		},
		package: require('../../package.json'),
	};
	return information;
}

module.exports = getRhapsodyInfo;