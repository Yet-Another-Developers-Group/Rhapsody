var express = require('express');
var app = express();
const chalk = require('chalk');

app.get('/about', function (req, res) {
     res.end("")
})

function start(port) {
     return new Promise ((resolve, reject) => {
          app.listen(port, function () {
               console.log(chalk.green.bold('[RhapsodyDashboard API Server Activated]') + ` Activated RhapsodyDashboard API Server on port ${port}`);
               resolve();
          })
     })
}

module.exports = {start};   