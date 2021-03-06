const Discord = require('discord.js');
const { rllManager } = require('../bot.js');
const { uniqeInQueue, findNonUniqeInQueue } = require('../rUtilities/rUtilities.js');
const axios = require('axios').default;
// eslint-disable-next-line
const urlValidityCheckExpression = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
const defaultEmbedColor = require('../config.json').defaultEmbedColor;
const msToHMS = require('../rUtilities/rUtilities.js').millisecondsToHMSString;
const { rTimeKeeper } = require('../rTimeKeeper/index.js');
const EventEmitter = require('events');

/**
 * Queue class
 */
class Queue {

	/**
	 * 
	 * @param {integer} guildID - ID of the guild to which the queue is attached
	 * @param {integer} channelID - ID of the channel to which the queue is attached
	 * @param {TextChannel} textChannel - Channel to which the bot posts updates from the queue
	 */
	constructor (guildID, channelID, textChannel) {
		this.guildID = guildID;
		this.channelID = channelID;
		this.textChannel = textChannel;
		this.queue = [];
		this.player = null;
		this.currentlyPlaying = null;
		this.timer = new rTimeKeeper();
		this.events = new EventEmitter();
		this.loop = false;
	}

	/**
	 * Searches YouTube.
	 * @param {string} searchTerm - Term to search for (uses LavaLink)
	 * @returns {array}
	 */
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

	/**
	 * Plays song/adds to queue is another is already playing.
	 * @param {Object} track 
	 * @returns {boolean}
	 */
	async play(track) {
		this.queue.push(track);
		if (!this.currentlyPlaying) {
			this._playNext();
			return false;
		} else {
			this.events.emit('update');
			return true;
		}
	}

	/**
	 * Plays next song.
	 */
	async _playNext() {
		if (this.loop) {
			await this.player.play(this.currentlyPlaying.track);
			this.timer.reset();
			this.timer.resume();
			return;
		}

		const nextSong = this.queue.shift();
		this.currentlyPlaying = nextSong;

		if (nextSong) {
			const currentlyPlayingEmbed = new Discord.MessageEmbed()
				.setColor(defaultEmbedColor)
				.setTitle('Now Playing')
				.setImage(`https://img.youtube.com/vi/${this.currentlyPlaying.info.identifier}/hqdefault.jpg`)
				.setDescription(this.currentlyPlaying.info.title + ` - \`${this.currentlyPlaying.info.isStream ? 'Live Stream' : msToHMS(this.currentlyPlaying.info.length)}\``);
			this.textChannel.send({ embeds: [currentlyPlayingEmbed] });
		} else {
			this.currentlyPlaying = null;
			this.textChannel.send({ content: 'No more songs in queue. Use the `queue` or `play` command to add more songs to the queue.' });
			return;
		}

		if(!this.player) {
			await rllManager.join({
				guild: this.guildID,
				channel: this.channelID,
				node: rllManager.idealNodes[0].id
			}, { selfdeaf: true });
			this.player = rllManager.players.get(this.guildID);
			this.player.on('end', data => {
				if(data.reason === 'REPLACED' || data.reason === 'STOPPED') return;
				this._playNext();
			});
		}

		await this.player.play(nextSong.track);
		this.timer.reset();
		this.timer.resume();

		//this.events.emit('update');
	}

	/**
	 * Adds the bot to a Voice Channel.
	 * @returns {boolean}
	 */
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

	async switch(channelID) {
		if (this.player) {
			this.channelID = channelID;
			await this.player.switchChannel(channelID, { selfdeaf: true });
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Removes the bot from a Voice Channel it is in.
	 * @returns {boolean}
	 */
	async exit() {
		if (rllManager.players.get(this.guildID)) {
			this.events.emit('update');
			this.player = null;
			this.currentlyPlaying = null;
			rllManager.leave(this.guildID);
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Pauses stream.
	 * @returns {boolean}
	 */
	async pause() {
		if (!this.player) return;
		if (!this.player.paused) await this.player.pause(true);
		this.timer.pause();
	}
  
	/**
	 * Resumes stream.
	 * @returns {boolean}
	 */
	async resume() {
		if (!this.player) return;
		if (this.player.paused) await this.player.pause(false);
		this.timer.resume();
	}

	/**
	 * Removes track n from the queue. WARNING: n IS THE ACTUAL INDEX IN THE ARRAY!
	 * @param {Number} n 
	 * @returns 
	 */
	async remove(n) {
		this.queue.splice(n,1);
		this.events.emit('update');
		return;
	}

	async seek(t) {
		if (!this.player) return;
		this.player.seek(t);
		this.timer.seek(t);
		return true;
	}

	async clearQueue() {
		if (!this.player) return;
		this.events.emit('update');
		this.queue = [];
		return true;
	}

	async findDuplicateTracks() {
		if (!this.player || this.queue == null || this.queue == []) return false;
		return findNonUniqeInQueue(this.queue);
	}

	async removeDuplicateTracks() {
		if (!this.player || this.queue == null || this.queue == []) return;
		this.events.emit('update');
		this.queue = uniqeInQueue(this.queue);
		return true;
	}

	async addPlaylistToQueue(a) {
		this.events.emit('update');
		this.queue = this.queue.concat(a);
		if (!this.currentlyPlaying) {
			this._playNext();
			return false;
		} else {
			return true;
		}
	}
}

module.exports = Queue;