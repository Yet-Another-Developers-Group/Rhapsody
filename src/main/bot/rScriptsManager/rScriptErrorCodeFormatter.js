const Discord = require("discord.js");
const codes = require("./errorCodes.json");

class rScriptErrorCodeFormatter {
     static formatError(e) {
          if (!codes[e.code]) return { content: "Horrible error occurred. I'm extremely sorry about this. Reach out on [GitHub](https://github.com/Yet-Another-Developers-Group/Rhapsody/issues), and and the developers will get this fixed as soon as possible." }

          return codes[e.code].type = "systemGenerated" ? { embeds: [new Discord.MessageEmbed()
               .setColor("#ff0000")
               .setTitle('An error occured.')
               .setDescription(`${codes[e.code].userreadablereason} I'm extremely sorry about this. Reach out on [GitHub](https://github.com/Yet-Another-Developers-Group/Rhapsody/issues), and and the developers will get this fixed as soon as possible.`)] } : { content: codes[e.code].userreadablereason };
     }
}

module.exports = { rScriptErrorCodeFormatter }

