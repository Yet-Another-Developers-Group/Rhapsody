var express = require('express');
var app = express();
const chalk = require('chalk');
const getServerInfo = require('./server-modules/aboutServer.js');
const getRhapsodyInfo = require('./server-modules/aboutThisRhapsody.js');
const announce = require('./server-modules/announce.js');

app.all('*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	next();
});

app.get('/aboutServer', function (req, res) {
	getServerInfo().then(value => res.end(JSON.stringify(value)));
});

app.get('/aboutThisRhapsody', function (req, res) {
	getRhapsodyInfo().then(value => res.end(JSON.stringify(value)));
});

app.get('/announce', function (req, res) {
	announce((req.query.title || 'Announcement'), (req.query.description || '*Oops, something went wrong with the announcement script. Sorry!*')).then(value => res.end(JSON.stringify(value)));
});

function start(port) {
	return new Promise ((resolve, reject) => {
		app.listen(port, function () {
			console.log(chalk.green.bold('[RhapsodyDashboard API Server Activated]') + ` Activated RhapsodyDashboard API Server on port ${port}`);
			resolve();
		});
	});
}

module.exports = {start};   