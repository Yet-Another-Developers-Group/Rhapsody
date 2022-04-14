const collectedDataModel = require('../rCollectedDataModel/model.js');

class rDataCollectionManager {
     static checkIfIdentifierIsValid(identifier) {
          const identifiers = require('../../bot/rHelpManager/helpDocs.json').docs.map(i => i.id);
          if (identifiers.indexOf(identifier) < 0) return false;
          return true;
     }

     static async addDataAndIdentifierArrayToDatabase(d, id) {
          let newData = new collectedDataModel({
               commandIdentifier: id,
               data: d,
          });
          await newData.save();
          return true;
     }
}

module.exports = rDataCollectionManager;