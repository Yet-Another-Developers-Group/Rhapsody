module.exports = class LockAgent {
	constructor (isLocked) {
		this.isLocked = isLocked;
		this.userID = null;
		this.allowedUsers = null;
	}

	lock(userID, allowedArr) {
		if (this.isLocked) return false;
		this.isLocked = true;
		this.userID = userID;
		this.allowedUsers = allowedArr;
		return true;
	}

	unlock() {
		if (!this.isLocked || this.userID == null) return false;
		this.isLocked = false;
		this.userID = null;
		this.allowedUsers == null;
		return true;
	}
};