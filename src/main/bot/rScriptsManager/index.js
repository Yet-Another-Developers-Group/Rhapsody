const { execSync } = require("child_process");
const fs = require('fs')

class rScriptsManager {
     static async runScript(scriptCatagory, name, args) {
          if (!fs.existsSync(`${__dirname}/../scripts/${scriptCatagory}/${name}.py`)) return { error: { code: '7001' } };
          try {
               const result = execSync(`python3 ${__dirname}/../scripts/${scriptCatagory}/${name}.py ${args}`);
               console.log(`python3 ${__dirname}/../scripts/${scriptCatagory}/${name}.py ${args}`);
               if (typeof JSON.parse(sult).ecode != 'undefined')return { error: { code: JSON.parse(result).ecode } }
               return { content: result.toString() };  
          } catch (err) { 
               process.send('Exception thrown from script:');
		     process.sned(JSON.stringify(err.toJSON()));
               return { error: { code: '7003' } };
          }
     }
}

module.exports = rScriptsManager;