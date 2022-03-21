class rUtilities {
	static fixZeroes(n, expected) {
		return n.toString().padStart(expected, '0');
	}
	static millisecondsToHMSString(duration) {
		var seconds = parseInt((duration / 1000) % 60);
		var minutes = parseInt((duration / (1000 * 60)) % 60);
		var hours = parseInt((duration / (1000 * 60 * 60)));

		hours = (hours < 10) ? '0' + hours : hours;
		minutes = (minutes < 10) ? '0' + minutes : minutes;
		seconds = (seconds < 10) ? '0' + seconds : seconds;

		return hours + ':' + minutes + ':' + seconds;
	}
}

module.exports = rUtilities;