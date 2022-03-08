const chalk = require("chalk");

function printStartupBanner() {
     const startupBanner = `
╭──────────────────────────────────────────────────╮
│                                                  │
│                     `+chalk.white.bold('Rhapsody')+`                     │
│                                                  │
│ `+chalk.cyan.bold('https://github.com/Yet-Another-Developers-Group/')+` │
│                    `+chalk.cyan.bold('Rhapsody')+`                      │
│                                                  │
│    `+chalk.yellow('Made by Sumukh Prasad and Anubhav Shyjesh,')+`    │
│                       `+chalk.yellow('YADG')+`                       │
│                                                  │
╰──────────────────────────────────────────────────╯
`;
     console.log(startupBanner);
}

module.exports = {printStartupBanner};