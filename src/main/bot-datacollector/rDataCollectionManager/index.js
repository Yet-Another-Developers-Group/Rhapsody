const collectedDataModel = require('../rCollectedDataModel/model.js');

class rDataCollectionManager {
     static async addDataAndIdentifierArrayToDatabase(d, id, uname) {
          const identifiers = require('../../bot/rHelpManager/helpDocs.json').docs.map(i => i.id);
          if (identifiers.indexOf(id) < 0) {
               process.send(`HelpDoc not found!:\n User: ${uname}\nTrying to access: ${id}\n`)
               return false;
          };
          
          let newData = new collectedDataModel({
               commandIdentifier: id,
               data: d,
          });
          await newData.save();
          return true;
     }
}

module.exports = rDataCollectionManager;