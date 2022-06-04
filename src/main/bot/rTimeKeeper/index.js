const moment = require('moment');

class rTimeKeeper {
	constructor() {
		this.isRunning = false;
		this.startTime = 0;
		this.overallTime = 0;
	}

	_getElapsedTimeSincePreviousStart() {
		if (!this.startTime) {
			return 0;
		}
		return moment().valueOf() - this.startTime;
	}

	resume() {
		if (this.isRunning) {
			return;
		}
		this.isRunning = true;
		this.startTime = moment().valueOf() - this.overallTime;
	}

	pause() {
		if (!this.isRunning) {
			return;
		}
		this.isRunning = false;
		this.overallTime = this.overallTime + this._getElapsedTimeSincePreviousStart();
	}

	reset() {
		this.isRunning = false;
		this.overallTime = 0;
		if (this.isRunning) {
			this.startTime = moment().valueOf();
			return;
		}
		this.startTime = 0;
	}

	seek(t) {
		if (!this.isRunning) {
			return;
		}
		this.startTime = moment().valueOf()-t;
	}

	getTime() {
		if (!this.startTime) {
			return 0;
		}
		if (this.isRunning) {
			return this._getElapsedTimeSincePreviousStart();
		}
		return this.overallTime;
	}
}

module.exports = { rTimeKeeper };