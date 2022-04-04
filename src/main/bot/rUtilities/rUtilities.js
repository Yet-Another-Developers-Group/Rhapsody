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

	static makeUniqueIdentifier(length) {
		var result           = '';
		var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for ( var i = 0; i < length; i++ ) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}

	static findNonUniqeInQueue(array) {
		const uniqueObjectArray = [];
		for (const trackObject of array) {
			if (uniqueObjectArray.filter(e => e.track === trackObject.track).length == 0) {
				uniqueObjectArray.push(trackObject);
			}
		}
		return array.filter(x => !uniqueObjectArray.includes(x));
	}

	static uniqeInQueue(array) {
		const uniqueObjectArray = [];
		for (const trackObject of array) {
			if (uniqueObjectArray.filter(e => e.track === trackObject.track).length == 0) {
				uniqueObjectArray.push(trackObject);
			}
		}
		return uniqueObjectArray;
	}
}

module.exports = rUtilities;