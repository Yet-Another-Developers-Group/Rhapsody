const { rllManager } = require('..');
const axios = require('axios').default;
const urlValidityCheckExpression = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);

module.exports = class Queue {
	constructor (guildID, channelID, textChannel) {
		this.guildID = guildID;
		this.channelID = channelID;
		this.textChannel = textChannel;
		this.queue = [];
		this.player = null;
		this.currentlyPlaying = null;
	}

	async search(searchTerm) {
		const node = rllManager.idealNodes[0];
		const params = new URLSearchParams();
		params.append('identifier', urlValidityCheckExpression.test(searchTerm) ? searchTerm : `ytsearch:${searchTerm}`);
		const data = await axios(`http://${node.host}:${node.port}/loadtracks?${params}`, {
			headers: {
				Authorization: node.password
			}
		});
		return data.data || [];
	}

	async play(track) {
		this.queue.push(track);
		if (!this.currentlyPlaying) {
			this._playNext();
			return false;
		} else {
			return true;
		}
	}

	async _playNext() {
		const nextSong = this.queue.shift();
		this.currentlyPlaying = nextSong;
		if (!nextSong) {
			this.player = null;
			this.currentlyPlaying = null;
			this.textChannel.send('No more songs in queue. Use the `queue` or `play` command to add more songs to the queue.');
			return;
		}

		if(!this.player) {
			await rllManager.join({
				guild: this.guildID,
				channel: this.channelID,
				node: rllManager.idealNodes[0].id
			}, { selfdeaf: true });
			this.player = rllManager.players.get(this.guildID);
			this.player.once('end', data => {
				if(data.reason === 'REPLACED' || data.reason === 'STOPPED') return;
				
			});
		}
		await this.player.play(nextSong.track);
	}

	async join() {
		if (!this.player) {
			await rllManager.join({
				guild: this.guildID,
				channel: this.channelID,
				node: rllManager.idealNodes[0].id
			}, { selfdeaf: true });
			return true;
		} else {
			return false;
		}
	}

	async exit() {
		if (rllManager.players.get(this.guildID)) {
			this.player = null;
			this.currentlyPlaying = null;
			rllManager.leave(this.guildID);
			return true;
		} else {
			return false;
		}
	}

	async pause() {
		if (!this.player) return;
		if (!this.player.paused) await this.player.pause(true);
	}
  
	async resume() {
		if (!this.player) return;
		if (this.player.paused) await this.player.pause(false);
	}

};