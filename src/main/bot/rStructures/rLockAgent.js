/**
 * Allows users to "lock" or "unlock" listening sessions
 */
class LockAgent {
	/**
	 * Create a new LockAgent
	 * @param {boolean} isLocked - current lock status.
	 */
	constructor(isLocked) {
		this.isLocked = isLocked;
		this.userID = null;
		this.allowedUsers = null;
	}

	/**
	 * Locks a session.
	 * @param {integer} userID 
	 * @param {Array} allowedArr 
	 * @returns {boolean}
	 */
	lock(userID, allowedArr) {
		if (this.isLocked) return false;
		this.isLocked = true;
		this.userID = userID;
		this.allowedUsers = allowedArr;
		return true;
	}

	/**
	 * Unocks a session.
	 * @param {integer} userID 
	 * @param {Array} allowedArr 
	 * @returns {boolean}
	 */
	unlock() {
		if (!this.isLocked || this.userID == null) return false;
		this.isLocked = false;
		this.userID = null;
		this.allowedUsers == null;
		return true;
	}
}

module.exports = LockAgent;