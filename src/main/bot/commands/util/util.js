const prettyMilliseconds = require('pretty-ms');
module.exports = class RhapsodyUtilitiesModule {
	static durationToMillis(dur) {
		return dur.split(':').map(Number).reduce((acc, curr) => curr + acc * 60) * 1000;
	}

	static millisToDuration(ms) {
		return prettyMilliseconds(ms, { colonNotation: true, secondsDecimalDigits: 0 });
	}

	static chunk(arr, size) {
		const temp = [];
		for (let i = 0; i < arr.length; i += size) {
			temp.push(arr.slice(i, i + size));
		}
		return temp;
	}

	static isValidURL(url) {
		return /^https?:\/\/((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i
			.test(url);
	}
    
	static progress(current, total, size = 16) {
		const percent = current / total * size;
		const progbar = new Array(size).fill('▬');
		progbar[Math.round(percent)] = '🔘';
		return {
			bar: progbar.join(''),
			percent
		};
	}
};